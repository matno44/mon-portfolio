import feedparser
import json
import os
from datetime import datetime, timedelta
from urllib.parse import urlparse # Pour extraire la source proprement
from openai import OpenAI

# --- CONFIGURATION ---
# Pour simuler l'outil utilisé dans le tableau
NOM_OUTIL = "Agrégateur RSS / Script" 

RSS_FEEDS = [
    "https://react.dev/feed.xml",
    "https://dev.to/feed",
    "https://medium.com/feed/tag/artificial-intelligence",
    "https://blog.openai.com/rss/",
    "http://www.lemondeinformatique.fr/flux-rss/rss.xml"
    "https://angular.io/feeds/rss",
    "https://hnrss.org/newest",
    "http://www.zdnet.com/news/rss.xml",
    "https://cprss.s3.amazonaws.com/javascriptweekly.com.xml"
]

# --- 1. SETUP CLIENT OPENAI ---
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    # Fallback pour test local si besoin, sinon exit
    print("ERREUR : Pas de clé API.")
    exit(1)

client = OpenAI(api_key=api_key)

# --- 2. Récupération des articles ---
def get_week_articles():
    print("Récupération des flux RSS...")
    # On regarde sur 7 jours pour être sûr d'avoir du contenu
    one_week_ago = datetime.now() - timedelta(days=7) 
    articles = []

    for feed in RSS_FEEDS:
        try:
            f = feedparser.parse(feed)
            # Récupération propre du nom de la source (ex: Le Monde Informatique)
            source_name = f.feed.get('title', 'Site Inconnu') 
            
            # On prend un peu plus d'articles pour avoir du choix
            for entry in f.entries[:2]: 
                try:
                    if hasattr(entry, 'published_parsed'):
                        published = datetime(*entry.published_parsed[:6])
                    else:
                        published = datetime.now()

                    if published >= one_week_ago:
                        articles.append({
                            "title": entry.title,
                            "link": entry.link,
                            "date": published.strftime("%d/%m/%Y"),
                            "content": entry.get("summary", "")[:1000], # Contenu tronqué
                            "source": source_name
                        })
                except Exception as e:
                    continue
        except Exception:
            continue

    print(f"Total articles récents trouvés : {len(articles)}")
    return articles

# --- 3. Analyse IA (CRITIQUE) ---
def analyze_article(article):
    # C'est ici qu'on change "Résumé" par "Analyse personnelle" pour le BTS
    prompt = f"""
    Agis comme un étudiant en informatique (BTS SIO) passionné.
    Ne fais PAS un résumé descriptif. Rédige une "Analyse personnelle" critique en 2 phrases max.
    
    Critères :
    1. Pourquoi est-ce pertinent pour un futur développeur ?
    2. Quel est l'impact potentiel ou l'intérêt technique ?
    
    Format de réponse STRICT (3 lignes) :
    Titre : [Reformule le titre pour qu'il soit accrocheur]
    Analyse : [Ton analyse personnelle ici, utilise "Je pense", "Intéressant pour...", "À surveiller..."]
    Catégorie : [Développement / IA / Cybersecurité / Cloud / Outils]

    Article source : {article["content"]}
    Titre original : {article["title"]}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5, # Un peu plus créatif pour l'analyse
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Erreur IA : {e}")
        return None

# --- 4. Sauvegarde ---
def save_historique(items):
    file_path = "historique.json"
    historique = []
    
    # Chargement de l'existant pour garder l'historique (Preuve de durée)
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                historique = json.load(f)
        except:
            historique = []

    # Ajout des nouveaux items (au début de la liste)
    # On évite les doublons basés sur le lien
    existing_links = {item['link'] for item in historique}
    new_items = [i for i in items if i['link'] not in existing_links]
    
    if new_items:
        historique = new_items + historique # Nouveaux en premier
        
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(historique, f, indent=4, ensure_ascii=False)
        print(f"{len(new_items)} nouveaux articles sauvegardés.")
    else:
        print("Aucun nouvel article à ajouter (doublons détectés).")

# --- MAIN ---
if __name__ == "__main__":
    print("--- Démarrage Veille SIO ---")
    articles = get_week_articles()
    
    if not articles:
        print("Rien de neuf cette semaine.")
        exit(0)

    final_items = []
    # On limite à 3 analyses par exécution pour gérer le budget API et ne pas spammer le tableau
    # Mais comme le script tourne chaque semaine, le tableau va se remplir petit à petit.
    import random
    random.shuffle(articles) # Mélange pour ne pas toujours prendre le premier flux
    
    count = 0
    for a in articles:
        if count >= 3: break # Limite journalière
        
        print(f"Analyse de : {a['title']}...")
        ai_output = analyze_article(a)
        
        if ai_output:
            lines = [l for l in ai_output.split("\n") if l.strip()]
            
            # Valeurs par défaut
            titre_final = a['title']
            analyse_perso = "Analyse non générée."
            categorie = "Veille"

            for line in lines:
                if "Titre :" in line: titre_final = line.replace("Titre :", "").replace("**", "").strip()
                if "Analyse :" in line: analyse_perso = line.replace("Analyse :", "").strip()
                if "Catégorie :" in line: categorie = line.replace("Catégorie :", "").strip()

            final_items.append({
                "date": datetime.now().strftime("%d/%m/%Y"), # Date de l'ajout au tableau
                "category": categorie,
                "title": titre_final,
                "source": a['source'],       # <--- NOUVEAU
                "tool": NOM_OUTIL,           # <--- NOUVEAU
                "link": a['link'],
                "analysis": analyse_perso    # <--- REMPLACE SUMMARY
            })
            count += 1

    if final_items:
        save_historique(final_items)
        print("Succès.")
