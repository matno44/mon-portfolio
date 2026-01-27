package liste;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // 1. Création de livres en mémoire 
        Livre livre1 = new Livre("11111", "Titre 1", "auteur 1", 1);
        Livre livre2 = new Livre("22222", "Titre 2", "auteur 2", 2);
        
        //  2. Appel de la fonction principale qui gère la BDD
        List<Livre> bibliotheque = creerGroupe(livre1, livre2);
        
        //  3. Affichage du résultat final 
        System.out.println("\n--- CONTENU FINAL DE LA BIBLIOTHEQUE ---");
        System.out.println("Taille de la bibliotheque: " + bibliotheque.size());
        
        for (Livre l : bibliotheque) {
            l.afficherLivre();
        }
    }

    // Méthode principale qui crée une liste de livres et interagit avec la BDD
    public static List<Livre> creerGroupe(Livre l1, Livre l2) {
        // A. Initialisation de la liste avec des données en dur
        List<Livre> listeDesLivres = new ArrayList<>();
        listeDesLivres.add(l1);
        listeDesLivres.add(l2);
        listeDesLivres.add(new Livre("33333", "Titre 3", "auteur 3", 3));
        listeDesLivres.add(new Livre("44444", "Titre 4", "auteur 4", 4));
        
        // B. Configuration de la connexion JDBC
        String url = "jdbc:mysql://localhost:3306/slam2_td2";
        String login = "root";
        String passwd = ""; // Pas de mot de passe par défaut sur XAMPP

        try {
            // 1. Établissement de la connexion
            Connection con = DriverManager.getConnection(url, login, passwd);
            Statement stmt = con.createStatement();

            // QUESTION 7 : MODIFICATION D'UN PRIX (UPDATE)
            
            Livre livreAmodifier = new Livre("1317442277", "Titre temporaire", "Auteur temporaire", 0);

            // Appel de la méthode intelligente setPrix avec Statement
            livreAmodifier.setPrix(10, stmt); 
            System.out.println("-> Le prix a été modifié à 10€ pour l'ISBN 1317442277.");

            
            // QUESTION 9 : AJOUT DU LIVRE M. GRAVOUIL (INSERT)
            
            int prixEntier = (int) 99.50; 

            // Création + Insertion BDD via le constructeur "Intelligent" (créé à la question 8)
            Livre livrePro = new Livre("978-2-PRO-JAVA", "Coder comme un pro en Java", "M.Gravouil", prixEntier, stmt);

            // Ajout à la liste 
            listeDesLivres.add(livrePro);
            System.out.println("-> Livre ajouté avec succès à la liste et à la BDD.");
            
            // 2. Fermeture 
            stmt.close();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return listeDesLivres;
    }
}