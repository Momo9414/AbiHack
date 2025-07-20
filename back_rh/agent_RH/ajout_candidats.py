import os
import psycopg2

# 🔧 Connexion à PostgreSQL
conn = psycopg2.connect(
    dbname="rcandidat",
    user="postgres",
    password="1234",  # remplace par ton vrai mot de passe
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# 📂 Dossier contenant les CV
cv_folder = "cv_files/"

# 📁 Lister les fichiers PDF
for filename in os.listdir(cv_folder):
    if filename.endswith(".pdf"):
        nom_fichier = filename.replace(".pdf", "")
        chemin_cv = os.path.join(cv_folder, filename)

        # Extraire un nom approximatif du fichier
        nom_candidat = nom_fichier.replace("CV_", "").replace("_", " ").replace("-", " ")

        # Vérifie si déjà présent
        cur.execute("SELECT id FROM candidats WHERE cv_url = %s", (chemin_cv,))
        if cur.fetchone():
            print(f"[⏩ Déjà présent] {filename}")
            continue

        # 🔄 Insérer le candidat
        cur.execute("""
            INSERT INTO candidats (nom, cv_url)
            VALUES (%s, %s)
        """, (nom_candidat, chemin_cv))
        print(f"[✅ Ajouté] {nom_candidat} - {filename}")

# ✅ Commit et fermeture
conn.commit()
cur.close()
conn.close()
