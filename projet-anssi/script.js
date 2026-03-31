// Tableau complet des 20 questions issues du travail sur l'ANSSI
const baseDeQuestions = [
    {
        question: "1. Quel est le nombre de mesures d'hygiène informatique présentées dans le guide de l'ANSSI ?",
        choix: ["12 mesures", "42 mesures", "150 mesures"],
        bonneReponseIndex: 1,
        explication: "Le guide présente 42 mesures essentielles organisées autour de la prévention, du contrôle et de la détection."
    },
    {
        question: "2. À qui s'adresse le guide d'hygiène informatique de l'ANSSI ?",
        choix: [
            "Aux particuliers uniquement",
            "Aux développeurs web juniors",
            "Aux RSSI, administrateurs et dirigeants"
        ],
        bonneReponseIndex: 2,
        explication: "Il cible les professionnels chargés de sécuriser le système d'information de leur organisation."
    },
    {
        question: "3. Parmi ces choix, quel est l'un des grands thèmes du guide d'hygiène informatique ?",
        choix: [
            "Sécuriser les postes de travail",
            "Développer des virus éthiques",
            "Réparer le matériel physique"
        ],
        bonneReponseIndex: 0,
        explication: "Les grands thèmes incluent la sécurisation des postes, du réseau, de l'administration, et la sensibilisation."
    },
    {
        question: "4. Pourquoi est-il important de sensibiliser et former les utilisateurs ?",
        choix: [
            "Pour réduire la facture d'électricité",
            "Car l'humain est souvent le maillon faible en sécurité",
            "Pour qu'ils deviennent administrateurs réseau"
        ],
        bonneReponseIndex: 1,
        explication: "Les utilisateurs doivent connaître les bonnes pratiques pour éviter le phishing ou l'usage de mots de passe faibles."
    },
    {
        question: "5. Quelle est la première règle concernant l'authentification des utilisateurs ?",
        choix: [
            "Chaque utilisateur doit disposer d'un compte nominatif unique",
            "Partager un compte commun pour l'équipe",
            "Ne jamais utiliser de mots de passe"
        ],
        bonneReponseIndex: 0,
        explication: "Un compte unique ne doit pas être partagé, afin de garantir la traçabilité des actions."
    },
    {
        question: "6. Que recommande le guide concernant la longueur et la complexité des mots de passe ?",
        choix: [
            "Au moins 4 chiffres simples",
            "Au moins 8 lettres minuscules",
            "Au moins 12 caractères (majuscules, minuscules, chiffres, spéciaux)"
        ],
        bonneReponseIndex: 2,
        explication: "Il est aussi recommandé d'utiliser un gestionnaire de mots de passe pour retenir ces combinaisons complexes."
    },
    {
        question: "7. Qu'est-ce que l'authentification multifacteur (MFA) ?",
        choix: [
            "Un logiciel générant plusieurs mots de passe",
            "Un mécanisme demandant au moins deux éléments d'authentification différents",
            "Taper son mot de passe deux fois de suite"
        ],
        bonneReponseIndex: 1,
        explication: "Par exemple : un mot de passe (ce que je sais) + un code SMS (ce que je possède). Cela bloque la majorité des vols de comptes."
    },
    {
        question: "8. Pourquoi faut-il limiter les droits d'administration sur les postes de travail ?",
        choix: [
            "Pour éviter l'installation involontaire de logiciels malveillants",
            "Pour faire des économies sur les licences logicielles",
            "Pour punir les employés"
        ],
        bonneReponseIndex: 0,
        explication: "Un utilisateur standard avec des droits admin peut compromettre tout le système sans s'en rendre compte."
    },
    {
        question: "9. Quelles sont les mesures à prendre pour sécuriser un poste de travail ?",
        choix: [
            "Le laisser allumé 24h/24",
            "Antivirus, pare-feu, mises à jour et chiffrement du disque",
            "Désactiver toutes les connexions réseau"
        ],
        bonneReponseIndex: 1,
        explication: "Il faut aussi désactiver les ports USB inutiles et restreindre les droits utilisateurs."
    },
    {
        question: "10. Quel est l'objectif d'une politique de cloisonnement réseau ?",
        choix: [
            "Cacher les câbles informatiques",
            "Accélérer la vitesse d'Internet",
            "Limiter la propagation d'une éventuelle attaque"
        ],
        bonneReponseIndex: 2,
        explication: "Le réseau est segmenté en zones de sécurité. Si un segment est compromis, les autres restent protégés."
    },
    {
        question: "11. Pourquoi est-il important de mettre à jour régulièrement les logiciels ?",
        choix: [
            "Pour corriger des vulnérabilités de sécurité connues",
            "Pour changer l'apparence des menus",
            "Pour libérer de l'espace disque"
        ],
        bonneReponseIndex: 0,
        explication: "Les pirates exploitent des failles connues qui auraient pu être bloquées si la mise à jour avait été appliquée."
    },
    {
        question: "12. Quels risques présente le nomadisme numérique ?",
        choix: [
            "Une usure plus rapide du clavier",
            "Perte/vol d'appareils et connexions à des Wi-Fi non sécurisés",
            "Aucun risque particulier"
        ],
        bonneReponseIndex: 1,
        explication: "Le nomadisme (travailler hors de l'entreprise) augmente aussi fortement les risques liés au phishing."
    },
    {
        question: "13. Quelles mesures de sécurité sont recommandées pour les appareils mobiles en déplacement ?",
        choix: [
            "Chiffrer les données et utiliser un VPN",
            "Se connecter à tous les réseaux publics ouverts",
            "Désactiver les mots de passe pour aller plus vite"
        ],
        bonneReponseIndex: 0,
        explication: "Il faut également activer le verrouillage automatique et éviter les Wi-Fi publics pour les accès sensibles."
    },
    {
        question: "14. Pourquoi faut-il séparer les usages professionnels et personnels sur les équipements ?",
        choix: [
            "Pour des raisons fiscales",
            "Pour limiter les risques de compromission des données professionnelles",
            "Parce que c'est interdit par la loi"
        ],
        bonneReponseIndex: 1,
        explication: "La navigation personnelle (téléchargements, sites web divers) expose le matériel à des risques qui ne doivent pas impacter l'entreprise."
    },
    {
        question: "15. À quoi sert la supervision de sécurité ?",
        choix: [
            "Surveiller l'activité du SI en temps réel pour détecter les anomalies",
            "Vérifier les heures d'arrivée des employés",
            "Gérer les caméras de sécurité du bâtiment"
        ],
        bonneReponseIndex: 0,
        explication: "Elle permet de détecter les tentatives d'intrusion et de réagir rapidement aux incidents."
    },
    {
        question: "16. Quelle est l'importance de la journalisation (logging) dans un SI ?",
        choix: [
            "Écrire un compte rendu journalier en format texte",
            "Enregistrer les événements du système pour l'analyse des incidents",
            "Ralentir le système pour éviter les surchauffes"
        ],
        bonneReponseIndex: 1,
        explication: "Les logs (connexions, accès fichiers) sont essentiels pour l'investigation (forensique) après une attaque."
    },
    {
        question: "17. Que recommande le guide concernant l'administration du réseau ?",
        choix: [
            "Utiliser des protocoles en clair comme HTTP et Telnet",
            "Utiliser des protocoles sécurisés (SSH, HTTPS) et des comptes dédiés",
            "Donner les droits d'administration à tout le monde"
        ],
        bonneReponseIndex: 1,
        explication: "Les accès administrateurs doivent être extrêmement restreints et tracés (journalisés)."
    },
    {
        question: "18. Qu'est-ce que la défense en profondeur en cybersécurité ?",
        choix: [
            "Mettre en place plusieurs couches de protection successives",
            "Cacher les serveurs dans un bunker souterrain",
            "Détruire les disques durs en cas d'attaque"
        ],
        bonneReponseIndex: 0,
        explication: "Si une couche est franchie, les suivantes peuvent encore bloquer l'attaquant (ex: pare-feu + antivirus + chiffrement)."
    },
    {
        question: "19. Pourquoi l'analyse des risques est-elle une étape fondamentale ?",
        choix: [
            "Pour licencier le personnel inutile",
            "Pour identifier les actifs, les menaces et évaluer l'impact",
            "Pour augmenter le tarif des produits vendus"
        ],
        bonneReponseIndex: 1,
        explication: "C'est la base pour définir une politique de sécurité adaptée aux besoins réels et ne pas dépenser de l'argent inutilement."
    },
    {
        question: "20. Qu'est-ce que les produits et services qualifiés par l'ANSSI ?",
        choix: [
            "Des solutions de sécurité garantissant un niveau reconnu par l'autorité",
            "Des logiciels exclusivement gratuits et open-source",
            "Des ordinateurs fabriqués uniquement en France"
        ],
        bonneReponseIndex: 0,
        explication: "Ces produits ont passé des évaluations rigoureuses et sont particulièrement importants pour les infrastructures critiques."
    }
];

// Procédure déclenchée par le bouton "Accéder au questionnaire"
function afficherQuiz() {
    document.getElementById('presentation').classList.add('masque');
    document.getElementById('quiz-section').classList.remove('masque');
    window.scrollTo(0, 0);
}

// Procédure pour générer le HTML des 20 questions
function afficherQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = ''; 

    for (let i = 0; i < baseDeQuestions.length; i++) {
        let questionData = baseDeQuestions[i];
        
        let questionHTML = `<div class="question-bloc">
                                <h3>${questionData.question}</h3>`;
        
        for (let j = 0; j < questionData.choix.length; j++) {
            questionHTML += `
                <label class="option">
                    <input type="radio" name="question${i}" value="${j}">
                    ${questionData.choix[j]}
                </label>`;
        }
        
        questionHTML += `<div id="feedback-${i}" class="feedback masque"></div></div>`;
        container.innerHTML += questionHTML;
    }
}

// Fonction appelée lors du clic sur "Valider"
function calculerScore() {
    let score = 0;

    for (let i = 0; i < baseDeQuestions.length; i++) {
        let radios = document.getElementsByName(`question${i}`);
        let reponseUtilisateur = -1;
        
        for (let radio of radios) {
            if (radio.checked) {
                reponseUtilisateur = parseInt(radio.value);
                break;
            }
        }

        let feedbackDiv = document.getElementById(`feedback-${i}`);
        feedbackDiv.classList.remove('masque'); 

        if (reponseUtilisateur === baseDeQuestions[i].bonneReponseIndex) {
            score++;
            feedbackDiv.innerHTML = `<strong>✅ Correct !</strong> ${baseDeQuestions[i].explication}`;
            feedbackDiv.className = "feedback correct";
        } else if (reponseUtilisateur === -1) {
            feedbackDiv.innerHTML = `<strong>⚠️ Oubli :</strong> Vous n'avez pas répondu. La bonne réponse était la n°${baseDeQuestions[i].bonneReponseIndex + 1}. <br><em>${baseDeQuestions[i].explication}</em>`;
            feedbackDiv.className = "feedback incorrect";
        } else {
            feedbackDiv.innerHTML = `<strong>❌ Incorrect.</strong> La bonne réponse était la n°${baseDeQuestions[i].bonneReponseIndex + 1}. <br><em>${baseDeQuestions[i].explication}</em>`;
            feedbackDiv.className = "feedback incorrect";
        }
    }

    document.getElementById('btn-valider').classList.add('masque');
    document.getElementById('resultat-container').classList.remove('masque');
    document.getElementById('score').innerText = score;
    document.getElementById('total').innerText = baseDeQuestions.length;
}

// Procédure pour relancer complètement le processus
function recommencer() {
    document.getElementById('quiz-form').reset();
    document.getElementById('btn-valider').classList.remove('masque');
    document.getElementById('resultat-container').classList.add('masque');
    
    let feedbacks = document.querySelectorAll('.feedback');
    feedbacks.forEach(fb => fb.classList.add('masque'));
    
    document.getElementById('quiz-section').classList.add('masque');
    document.getElementById('presentation').classList.remove('masque');
    
    window.scrollTo(0, 0);
}

// On précharge les questions en mémoire dès l'ouverture de la page
afficherQuestions();