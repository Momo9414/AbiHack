
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import fitz
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
from typing import Optional
from config_local import DB_HOST, DB_NAME, DB_USER, DB_PASS
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
import requests
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Form
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
import pdfplumber
import psycopg2
from datetime import date, datetime
from typing import Optional
import google.generativeai as genai
from PIL import Image
import io
import re
import shutil
import json
import secrets
from pathlib import Path
from fastapi import HTTPException





@asynccontextmanager
async def lifespan(app: FastAPI):
    """Traitement automatique au démarrage"""
    print("\n=== Initialisation de l'Assistant RH ===")
    process_new_cvs()
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
text_model = genai.GenerativeModel(
    'gemini-2.0-flash',  # Modèle spécifié
    generation_config={
        "temperature": 0.7,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 2048,
    },
    safety_settings={
        "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
        "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
        "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
        "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE"
    }
)

# ✅ Chargement des variables d'environnement
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# 🔧 Configuration CORRIGÉE des chemins (sans duplication)
BASE_DIR = os.path.join("agent_RH")  # Chemin relatif direct
JOB_DESCRIPTION_DIR = os.path.join(BASE_DIR, "fiche_poste")
CV_DIR = os.path.join(BASE_DIR, "cv_files")

# Paramètres par défaut (inchangés)
DEFAULT_JOB_DESCRIPTION = "FICHE DE POSTE -Stagiaire Système - LIGHT.pdf"
DEFAULT_TOP_N = 5

class JobMatchRequest(BaseModel):
    job_description_filename: str = DEFAULT_JOB_DESCRIPTION
    top_n: int = DEFAULT_TOP_N


def get_db_connection():
    """Établit une connexion à la base PostgreSQL"""
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extrait le texte d'un fichier PDF"""
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()


def extraire_infos_cv(file_path: str) -> dict:
    """Extrait le nom et la photo du CV"""
    resultat = {
        'nom': 'Non détecté',
        'genre': 'non spécifié',
        'photo_bytes': None
    }
    
    try:
        with pdfplumber.open(file_path) as pdf:
            premiere_page = pdf.pages[0]
            texte = premiere_page.extract_text() or ""
            
            if texte:
                for line in texte.split('\n'):
                    stripped = line.strip()
                    if stripped and len(stripped.split()) >= 2:
                        resultat['nom'] = stripped[:100]
                        break
            
            for image in premiere_page.images:
                if image['width'] > 100 and image['height'] > 100:
                    resultat['photo_bytes'] = image['stream'].get_data()
                    break
                    
    except Exception as e:
        print(f"Erreur lecture PDF {file_path}: {str(e)}")
    
    return resultat


# Routes API
@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    try:
        # Créer le dossier uploads s'il n'existe pas
        if not os.path.exists(CV_DIR):
            os.makedirs(CV_DIR)
        
        # Sauvegarder le fichier
        file_path = os.path.join(CV_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Traiter le CV
        donnees = extraire_infos_cv(file_path)
        
        # Enregistrer en base
        # Version corrigée
        cv_url = f"/cv_files/{file.filename}"  # Correspond au dossier réel
        candidate_id = insert_candidate(
            nom=donnees['nom'],
            cv_url=cv_url
         
        )
        
        return {
            "filename": file.filename,
            "nom": donnees['nom'],
            "candidate_id": candidate_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
  

def insert_candidate(nom: str, cv_url: str, genre: str) -> Optional[int]:
    """Insertion basique dans la table candidats"""
    conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS)
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT id FROM candidats WHERE cv_url = %s", (cv_url,))
        if cur.fetchone():
            return None
        
        cur.execute(
            """INSERT INTO candidats (nom, cv_url, genre, date_depot) 
               VALUES (%s, %s, %s, %s) RETURNING id""",
            (nom, cv_url, genre, date.today())
        )
        candidate_id = cur.fetchone()[0]
        conn.commit()
        return candidate_id
    finally:
        cur.close()
        conn.close()


def process_new_cvs():
    """Traite les nouveaux CV avec analyse d'image"""
    if not os.path.exists(CV_DIR):
        os.makedirs(CV_DIR)
        return
    
    for filename in os.listdir(CV_DIR):
        if not filename.lower().endswith('.pdf'):
            continue
            
        file_path = os.path.join(CV_DIR, filename)
        cv_url = f"/candidatures/{filename}"
        
        try:
            donnees = extraire_infos_cv(file_path)
            
            if insert_candidate(
                nom=donnees['nom'],
                cv_url=cv_url,
                genre=donnees['genre']
            ):
                print(f"Ajouté: {filename} (Genre: {donnees['genre']})")
                
        except Exception as e:
            print(f"Erreur avec {filename}: {str(e)}")

@app.get("/process-cvs")
async def manual_process():
    """Déclenchement manuel du traitement"""
    process_new_cvs()
    return {"status": "Traitement terminé"}



@app.get("/total-candidats")
async def get_total_candidats():
    """
    Retourne le nombre total de candidats dans la base de données
    Format de réponse: {"total": nombre}
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Requête simple pour compter les candidats
        cur.execute("SELECT COUNT(*) FROM candidats")
        total = cur.fetchone()[0]
        
        return {"total": total}
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur de base de données: {str(e)}"
        )
    finally:
        if conn:
            conn.close()
@app.post("/evaluations")
async def evaluate_and_store_cvs(request: JobMatchRequest):
    # 1. Vérifications initiales (identique)
    if not os.path.exists(JOB_DESCRIPTION_DIR):
        raise HTTPException(
            status_code=400,
            detail=f"Dossier 'fiche_poste' introuvable. Placez-le dans: {os.path.abspath(BASE_DIR)}"
        )
    if not os.path.exists(CV_DIR):
        raise HTTPException(
            status_code=400,
            detail=f"Dossier 'cv_files' introuvable. Placez-le dans: {os.path.abspath(BASE_DIR)}"
        )

    job_path = os.path.join(JOB_DESCRIPTION_DIR, request.job_description_filename)
    if not os.path.exists(job_path):
        available_files = os.listdir(JOB_DESCRIPTION_DIR)
        raise HTTPException(
            status_code=404,
            detail=f"Fiche de poste non trouvée. Fichiers disponibles: {', '.join(available_files)}"
        )

    # 2. Préparation des modèles
    job_text = extract_text_from_pdf(job_path)
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    job_vector = model.encode([job_text])
    genai.configure(api_key=GOOGLE_API_KEY)
    modele = genai.GenerativeModel("gemini-2.0-flash-001")

    def generate_structured_analysis(cv_text: str, job_desc: str, score: float) -> dict:
        """Génère une analyse structurée avec Gemini"""
        prompt = f"""Analyse RH - Correspondance CV/Poste (retourne STRICTEMENT du JSON valide):

### Contexte:
POSTE: {job_desc[:1000]}

CV ANALYSÉ:
{cv_text[:500]}

SCORE: {score:.2f}%

### Instructions:
Génère un objet JSON VALIDE avec cette structure exacte:
{{
  "analyse_generale": "Résumé global en 1-2 phrases",
  "correspondances": [
    {{"point": "Correspondance 1", "explication": "détail"}},
    {{"point": "Correspondance 2", "explication": "détail"}},
    {{"point": "Correspondance 3", "explication": "détail"}}
  ],
  "ecarts": [
    {{"point": "Écart 1", "explication": "détail"}},
    {{"point": "Écart 2", "explication": "détail"}},
    {{"point": "Écart 3", "explication": "détail"}}
  ],
  "recommandation": {{
    "note": 1-2,
    "explication": "Explication détaillée",
  }}
}}"""

        try:
            response = modele.generate_content(prompt)
            json_str = response.text.strip()
            json_str = json_str.replace("```json", "").replace("```", "").strip()
            return json.loads(json_str)
        except Exception as e:
            print(f"Erreur génération analyse: {str(e)}")
            return {
                "analyse_generale": "Erreur lors de la génération de l'analyse",
                "correspondances": [],
                "ecarts": [],
                "recommandation": {
                    "note": 0,
                    "explication": "Erreur d'analyse",
                    "decision": "À étudier"
                }
            }

    # 3. Analyse de tous les CVs
    cv_results = []
    for cv_file in os.listdir(CV_DIR):
        if not cv_file.endswith(".pdf"):
            continue

        try:
            cv_path = os.path.join(CV_DIR, cv_file)
            cv_text = extract_text_from_pdf(cv_path)
            cv_vector = model.encode([cv_text])
            score = float(cosine_similarity(job_vector, cv_vector)[0][0])
            rounded_score = round(score * 100, 2)
            
            cv_results.append({
                "cv_file": cv_file,
                "score": rounded_score,
                "cv_text": cv_text
            })

        except Exception as e:
            print(f"⚠️ Erreur avec {cv_file}: {str(e)}")
            continue

    # Tri par score décroissant
    cv_results.sort(key=lambda x: x["score"], reverse=True)
    top_cvs = cv_results[:request.top_n]

    # 4. Stockage des top_n CVs en base
    stored_evaluations = []
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        for cv in top_cvs:
            try:
                # Vérifier si l'évaluation existe déjà
                cur.execute("""
                    SELECT e.id
                    FROM evaluations e
                    JOIN candidats c ON e.candidat_id = c.id
                    WHERE c.cv_url LIKE %s
                    AND e.score_final = %s
                    LIMIT 1
                """, (f"%{cv['cv_file']}", cv["score"]))
                
                if cur.fetchone() is not None:
                    print(f"Évaluation existante pour {cv['cv_file']} avec score {cv['score']} - skip")
                    continue
                
                # Génération de l'analyse structurée
                analysis = generate_structured_analysis(cv["cv_text"], job_text, cv["score"])
                analysis_json = json.dumps(analysis, ensure_ascii=False)

                # Insertion en base
                cur.execute("""
                    INSERT INTO evaluations (
                        candidat_id, 
                        score_final, 
                        justificatifs, 
                        date_evaluation
                    )
                    SELECT 
                        id, %s, %s, NOW()
                    FROM 
                        candidats
                    WHERE 
                        cv_url LIKE %s
                    AND NOT EXISTS (
                        SELECT 1 FROM evaluations
                        WHERE candidat_id = candidats.id
                        AND score_final = %s
                    )
                    RETURNING id
                """, (cv["score"], analysis_json, f"%{cv['cv_file']}", cv["score"]))
                
                if cur.rowcount == 0:
                    print(f"Aucune insertion pour {cv['cv_file']} (peut-être déjà évalué)")
                    continue
                
                evaluation_id = cur.fetchone()[0]
                conn.commit()

                # Récupération des données stockées
                cur.execute("""
                    SELECT 
                        c.nom,
                        e.score_final,
                        e.justificatifs,
                        e.date_evaluation,
                        c.cv_url
                    FROM 
                        evaluations e
                    JOIN 
                        candidats c ON e.candidat_id = c.id
                    WHERE 
                        e.id = %s
                """, (evaluation_id,))
                
                column_names = [desc[0] for desc in cur.description]
                row = cur.fetchone()
                evaluation_data = dict(zip(column_names, row))
                
                # Conversion du JSON stocké en dict Python
                if 'justificatifs' in evaluation_data:
                    try:
                        evaluation_data['justificatifs'] = json.loads(evaluation_data['justificatifs'])
                    except (TypeError, json.JSONDecodeError):
                        evaluation_data['justificatifs'] = {
                            "erreur": "Format d'analyse invalide"
                        }
                
                if 'date_evaluation' in evaluation_data:
                    evaluation_data['date_evaluation'] = str(evaluation_data['date_evaluation'])
                
                stored_evaluations.append(evaluation_data)

            except Exception as e:
                conn.rollback()
                print(f"Erreur lors du traitement de {cv['cv_file']}: {str(e)}")
                continue

        return {
            "metadata": {
                "fiche_post": request.job_description_filename,
                "total_cvs_analysés": len(cv_results),
                "cvs_stockés": len(stored_evaluations),
                "seuil_score": f"{request.top_n} meilleurs CVs"
            },
            "evaluations": stored_evaluations
        }

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors du stockage en base: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

def get_candidates_context() -> str:
    """Récupère les données des candidats pour le contexte Gemini"""
    conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS)
    cur = conn.cursor()
    
    try:
        # Récupérer les stats globales
        cur.execute("""
            SELECT 
                COUNT(*) as total_candidates,
                COUNT(e.id) as evaluated_candidates,
                AVG(e.score_final) as avg_score,
                MAX(e.score_final) as max_score,
                MIN(e.score_final) as min_score,
                COUNT(CASE WHEN c.genre = 'homme' THEN 1 END) as hommes,
                COUNT(CASE WHEN c.genre = 'femme' THEN 1 END) as femmes
            FROM candidats c
            LEFT JOIN evaluations e ON c.id = e.candidat_id
        """)
        stats = cur.fetchone()
        
        # Récupérer les candidats récents
        cur.execute("""
            SELECT c.nom, c.genre, e.score_final, c.date_depot
            FROM candidats c
            LEFT JOIN evaluations e ON c.id = e.candidat_id
            ORDER BY c.date_depot DESC
            LIMIT 5
        """)
        recent_candidates = cur.fetchall()
        
        # Construire le contexte
        context = """
        Informations sur le recrutement :
        
        Statistiques globales :
        - Nombre total de candidats : {total}
        - Candidats évalués : {evaluated}
        - Score moyen : {avg_score}
        - Score maximum : {max_score}
        - Score minimum : {min_score}
        - Répartition par genre : {hommes} hommes, {femmes} femmes
        
        Derniers candidats ajoutés :
        """.format(
            total=stats[0],
            evaluated=stats[1],
            avg_score=stats[2] or 'N/A',
            max_score=stats[3] or 'N/A',
            min_score=stats[4] or 'N/A',
            hommes=stats[5],
            femmes=stats[6]
        )
        
        for nom, genre, score, date_depot in recent_candidates:
            context += f"\n- {nom} ({genre or 'Non spécifié'})"
            if score:
                context += f", Score: {score}/10"
            context += f", Postulé le: {date_depot.strftime('%d/%m/%Y')}"
        
        return context
    finally:
        cur.close()
        conn.close()

def generate_rh_response(prompt: str, context: str = "") -> str:
    """Génère une réponse concise et professionnelle avec Gemini 2.0 Flash"""
    try:
        # Détection des salutations simples
        prompt_lower = prompt.lower().strip()
        if prompt_lower in {'bonjour', 'salut', 'hello', 'hi', 'bonsoir'}:
            return "Bonjour ! Comment puis-je vous aider ?"
        
        if prompt_lower in {'merci', 'merci beaucoup', 'thanks'}:
            return "Je vous en prie."

        # Structure du prompt optimisée
        full_prompt = [
            "Tu es un assistant RH expert. Réponds en maximum 1 phrase.",
            "Sois direct et factuel. Ne fais pas de commentaires inutiles.",
            f"Contexte: {context}" if context else "",
            f"Question: {prompt}",
            "Réponse courte:"
        ]
        
        # Appel au modèle avec timeout
        response = text_model.generate_content(
            "\n".join([p for p in full_prompt if p]),  # Supprime les lignes vides
            generation_config={"max_output_tokens": 100}  # Limite la longueur
        )
        
        if not response.text:
            return "Veuillez reformuler votre question."

        # Nettoyage strict de la réponse
        cleaned = re.sub(r'\*+|["\']', '', response.text).strip()
        
        # On ne garde que la première phrase
        first_sentence = cleaned.split('.')[0].split('?')[0].split('!')[0]
        return first_sentence[:150].strip()  # Limite de caractères
        
    except Exception as e:
        print(f"Erreur Gemini: {str(e)}")
        return "Service temporairement indisponible."
    

@app.post("/api/chat")
async def chat_with_ai(request: Request):
    """Endpoint pour le chat intelligent avec Gemini 2.0 Flash"""
    try:
        data = await request.json()
        message = data.get("message", "").strip()
        
        if not message:
            return JSONResponse(
                {"response": "Veuillez poser une question valide."},
                status_code=400
            )
        
        # Contexte optimisé pour Flash
        context = get_candidates_context()
        
        # Journalisation de débogage
        print(f"Prompt envoyé à Gemini Flash:\n{message[:200]}...")
        print(f"Contexte:\n{context[:200]}...")
        
        # Génération de la réponse
        start_time = datetime.now()
        response = generate_rh_response(message, context)
        processing_time = (datetime.now() - start_time).total_seconds()
        
        print(f"Réponse générée en {processing_time:.2f}s")
        return JSONResponse({"response": response})
        
    except Exception as e:
        print(f"Erreur du serveur: {str(e)}")
        return JSONResponse(
            {"response": "Une erreur technique est survenue. Notre équipe a été notifiée."},
            status_code=500
        )
    
@app.get("/liste_evaluations")
async def get_all_evaluations():
    """
    Récupère toutes les évaluations avec les informations des candidats associés
    Retourne une liste de dictionnaires contenant les données brutes
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Requête SQL pour joindre les tables evaluations et candidats
        cur.execute("""
            SELECT 
                c.nom,
                e.score_final,
                e.justificatifs,
                e.date_evaluation,
                c.cv_url
            FROM 
                evaluations e
            JOIN 
                candidats c ON e.candidat_id = c.id
            ORDER BY 
                e.date_evaluation DESC
        """)
        
        # Récupération des noms de colonnes
        column_names = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        
        if not results:
            raise HTTPException(
                status_code=404,
                detail="Aucune évaluation trouvée dans la base de données"
            )
        
        # Conversion des résultats en liste de dictionnaires
        evaluations = []
        for row in results:
            evaluation = dict(zip(column_names, row))
            # Conversion des types spéciaux comme datetime si nécessaire
            if 'date_evaluation' in evaluation:
                evaluation['date_evaluation'] = str(evaluation['date_evaluation'])
            evaluations.append(evaluation)
            
        return evaluations
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération des évaluations: {str(e)}"
        )
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)