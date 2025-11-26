import feedparser
import json
import os
from datetime import datetime, timedelta
from openai import OpenAI  # <--- Nouvelle importation obligatoire

# --- CONFIGURATION ---
RSS_FEEDS = [
    "https://react.dev/feed.xml",
    "https://dev.to/feed",
    "https://medium.com/feed/tag/artificial-intelligence",
    "https://angular.io/feeds/rss",
    "https://hnrss.org/newest",
]

# --- 1. SETUP CLIENT OPENAI (NOUVELLE SYNTAXE) ---
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("ERREUR CRITIQUE : La variable d'environnement OPENAI_API_KEY est vide.")
    print("Vérifie tes 'Secrets' GitHub et ton fichier YAML.")
    exit(1)

try:
    client = OpenAI(api_key=api_key)
except Exception as e:
    print(f"Erreur lors de l'initialisation du client OpenAI : {e}")
    exit(1)

# --- 2. Récupération des articles ---
def get_week_articles():
    print("Récupération des flux RSS...")
    one_week_ago = datetime.now() - timedelta(days=7)
    articles = []

    for feed in RSS_FEEDS:
        try:
            print(f"Lecture de : {feed}")
            f = feedparser.parse(feed)
            # On vérifie si le flux est valide
            if f.bozo: 
                print(f"⚠️ Attention, flux potentiellement invalide ou bloqué : {feed}")
            
            for entry in f.entries[:3]: # Limité à 3 par flux pour tester vite
                try:
                    # Gestion souple des dates (certains flux n'ont pas published_parsed)
                    if hasattr(entry, 'published_parsed'):
                        published = datetime(*entry.published_parsed[:6])
                    else:
                        published = datetime.now() # Fallback si pas de date

                    if published >= one_week_ago:
                        articles.append({
                            "title": entry.title,
                            "link": entry.link,
                            "date": published.strftime("%d/%m/%Y"),
                            "content": entry.get("summary", "")[:1500]
                        })
                except Exception as e:
                    print(f"Erreur sur un article : {e}")
                    continue
        except Exception as e:
            print(f"Erreur de lecture du flux {feed}: {e}")

    print(f"Total articles trouvés : {len(articles)}")
    return articles

# --- 3. Résumé IA ---
def summarize(article):
    prompt = f"""
    Résume l'article suivant en 5-6 lignes max pour une veille techno (BTS SIO).
    Format de réponse STRICT (3 lignes) :
    Titre : [Titre reformulé]
    Résumé : [Ton résumé ici]
    Catégorie : [IA / Dev / Sécurité / Cloud]

    Article : {article["content"]}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Erreur OpenAI sur l'article {article['title']} : {e}")
        return None

# --- 4. Sauvegarde ---
def save_historique(items):
    file_path = "historique.json"
    try:
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                historique = json.load(f)
        else:
            historique = []
    except:
        historique = []

    # Ajout des nouveaux items au début
    historique.extend(items)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(historique, f, indent=4, ensure_ascii=False)
    print("Sauvegarde JSON effectuée.")

# --- EXÉCUTION ---
if __name__ == "__main__":
    print("Démarrage du script de veille...")
    try:
        articles = get_week_articles()
        
        if not articles:
            print("Aucun article récent trouvé. Fin du script.")
            exit(0)

        final_items = []
        # On traite seulement les 3 premiers articles pour éviter de vider ton crédit OpenAI lors des tests
        for a in articles[:3]: 
            print(f"Traitement IA de : {a['title']}...")
            ai_output = summarize(a)
            
            if ai_output:
                lines = [l for l in ai_output.split("\n") if l.strip()]
                # Parsing robuste
                title = "Article sans titre"
                summary = "Pas de résumé"
                category = "Veille"

                for line in lines:
                    if "Titre :" in line: title = line.replace("Titre :", "").replace("**", "").strip()
                    if "Résumé :" in line: summary = line.replace("Résumé :", "").strip()
                    if "Catégorie :" in line: category = line.replace("Catégorie :", "").strip()

                final_items.append({
                    "title": title,
                    "summary": summary,
                    "category": category,
                    "date": a["date"],
                    "link": a["link"]
                })

        if final_items:
            save_historique(final_items)
            print("Veille générée avec succès ✔")
        else:
            print("Aucun résumé n'a pu être généré.")
            
    except Exception as e:
        print(f"ERREUR FATALE DANS LE MAIN : {e}")
        exit(1)
