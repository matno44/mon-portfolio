import feedparser
import openai
import json
import os  # <--- Ajout indispensable
from datetime import datetime, timedelta

# Récupération sécurisée de la clé via la variable d'environnement définie dans le YAML
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("La clé API OpenAI est manquante ! Vérifie tes GitHub Secrets.")

openai.api_key = api_key

# ... le reste de ton code ...
# --- 1. Sources RSS ---
RSS_FEEDS = [
    "https://react.dev/feed.xml",
    "https://dev.to/feed",
    "https://medium.com/feed/tag/artificial-intelligence",
    "https://angular.io/feeds/rss",
    "https://hnrss.org/newest",
]

# --- 2. Récupération des articles de la semaine ---
def get_week_articles():
    one_week_ago = datetime.now() - timedelta(days=7)
    articles = []

    for feed in RSS_FEEDS:
        f = feedparser.parse(feed)
        for entry in f.entries[:5]:
            try:
                published = datetime(*entry.published_parsed[:6])
            except:
                continue

            if published >= one_week_ago:
                articles.append({
                    "title": entry.title,
                    "link": entry.link,
                    "date": published.strftime("%d/%m/%Y"),
                    "content": entry.get("summary", "")[:1500]
                })
    return articles

# --- 3. Résumé automatique par l’IA ---
def summarize(article):
    prompt = f"""
    Résume l'article suivant en 5-6 lignes maximum, dans un style BTS SIO :
    - Explique l’idée principale
    - Son intérêt pour le développement / IA
    - Sa pertinence technique

    Article : {article["content"]}

    Donne-moi :
    1. Un titre reformulé
    2. Un résumé
    3. Une catégorie parmi : IA, Développement, Framework, Outils, Sécurité.
    """

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )

    return response.choices[0].message.content

# --- 4. Génération HTML automatique ---
def generate_html(items):
    html = """
    <div class="row g-4">
    """

    for item in items:
        html += f"""
        <div class="col-md-6">
            <div class="veille-item">
                <span class="veille-category">{item['category']}</span>
                <h3 class="veille-title">{item['title']}</h3>
                
                <div class="veille-meta">
                    <i class="far fa-calendar"></i> {item['date']} |
                    <i class="fas fa-tag"></i> {item['category']}
                </div>

                <p class="veille-summary">{item['summary']}</p>

                <a href="{item['link']}" class="veille-link">
                    Lire l'article complet <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
        """

    html += "</div>"

    with open("veille_auto.html", "w", encoding="utf-8") as f:
        f.write(html)

# --- 5. Historisation JSON ---
def save_historique(items):
    try:
        with open("historique.json", "r", encoding="utf-8") as f:
            historique = json.load(f)
    except:
        historique = []

    historique.extend(items)

    with open("historique.json", "w", encoding="utf-8") as f:
        json.dump(historique, f, indent=4, ensure_ascii=False)

# --- Exécution générale ---
articles = get_week_articles()
final_items = []

for a in articles[:4]:  # on limite à 4 items/semaine
    ai_output = summarize(a)

    parts = ai_output.split("\n")
    final_items.append({
        "title": parts[0].replace("Titre :", "").strip(),
        "summary": parts[1].replace("Résumé :", "").strip(),
        "category": parts[-1].replace("Catégorie :", "").strip(),
        "date": a["date"],
        "link": a["link"]
    })

generate_html(final_items)
save_historique(final_items)

print("Veille auto générée ✔")
