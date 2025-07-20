import os
import fitz  # PyMuPDF
import pandas as pd
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import google.generativeai as genai
import json

# ✅ Chargement des variables d’environnement
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# ✅ Configuration de l'API Gemini
genai.configure(api_key=GOOGLE_API_KEY)
modele = genai.GenerativeModel("gemini-2.0-flash-001")

# ✅ Fonction d'extraction de texte depuis un fichier PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

# ✅ Chargement de la fiche de poste
job_description = extract_text_from_pdf("Description du poste.pdf")

# ✅ Initialisation du modèle BERT pour la similarité sémantique
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
job_vector = model.encode([job_description])

# ✅ Analyse des CV dans le dossier
cv_folder = "cv_files"
cv_scores = []

for cv_file in os.listdir(cv_folder):
    if cv_file.endswith(".pdf"):
        cv_path = os.path.join(cv_folder, cv_file)
        cv_text = extract_text_from_pdf(cv_path)
        cv_vector = model.encode([cv_text])
        score = cosine_similarity(job_vector, cv_vector)[0][0]
        cv_scores.append((cv_file, round(score * 100, 2), cv_text))  # On garde le texte pour l’explication

# ✅ Tri des résultats par pertinence
cv_scores = sorted(cv_scores, key=lambda x: x[1], reverse=True)
df = pd.DataFrame([(cv[0], cv[1]) for cv in cv_scores], columns=["CV", "Score (%)"])

# ✅ Affichage des résultats
print("\n📊 Résultat du matching avec la fiche de poste :\n")
print(df.to_string(index=False))

# ✅ Fonction d'explication du score avec Gemini
def expliquer_score(cv_text, fiche_poste, score):
    prompt = f"""Tu es un assistant RH intelligent.
    
Fiche de poste :
{fiche_poste}

Extrait du CV :
{cv_text[:500]}

Tu as attribué un score de {score:.2f}%. Donne une explication claire, structurée, professionnelle et objective du score donné. N’invente rien et base-toi uniquement sur les éléments fournis."""
    
    response = modele.generate_content(prompt)
    return response.text

# ✅ Génération d'explications pour les 3 meilleurs CV
print("\n📌 Explications pour les meilleurs profils :\n")
results = []
for cv_file, score, cv_text in cv_scores[:3]:
    explication = expliquer_score(cv_text, job_description, score)
    results.append({
        "cv_file": cv_file,
        "score": score,
        "explication": explication
    })

# Affichage JSON
print(json.dumps(results, ensure_ascii=False, indent=2))
