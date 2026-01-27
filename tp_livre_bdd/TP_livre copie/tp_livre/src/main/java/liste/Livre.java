package liste;

import java.sql.SQLException;
import java.sql.Statement;

public class Livre {

    // 1. ATTRIBUTS
    
    private String isbn;
    private String titre;
    private String auteur;
    private double prix;

    
    // 2. CONSTRUCTEURS
   

    /**
     * Constructeur classique 
     */
    public Livre(String isbn, String titre, String auteur, double prix) {
        this.isbn = isbn;
        this.titre = titre;
        this.auteur = auteur;
        this.prix = prix;
    }

    /**
     * Constructeur "Intelligent"
     * Crée l'objet et l'insère directement dans la BDD via le Statement.
     */
    public Livre(String isbn, String titre, String auteur, int prix, Statement stmt) {
        // A. Initialisation de l'objet Java
        this.isbn = isbn;
        this.titre = titre;
        this.auteur = auteur;
        this.prix = prix;

        // B. Insertion SQL directe
        try {
            String requete = "INSERT INTO Livre (ISBN, titre, Auteur, prix) VALUES ('" 
                             + isbn + "', '" 
                             + titre + "', '" 
                             + auteur + "', " 
                             + prix + ")";

            stmt.executeUpdate(requete);
            System.out.println("Succès : Le livre " + titre + " a été ajouté à la BDD !");

        } catch (SQLException e) {
            System.out.println("Erreur lors de l'insertion en BDD : " + e.getMessage());
        }
    }

    // 3. GETTERS (Accesseurs)
    
    public String getISBN() { 
        return this.isbn; 
    }

    public String getTitre() { 
        return this.titre; 
    }

    public String getAuteur() { 
        return this.auteur; 
    }

    public double getPrix() { 
        return this.prix; 
    }

    // 4. SETTERS JDBC (Mutateurs avec mise à jour BDD)

    //Set ISBN
    public void setISBN(String isbn, Statement stmt) { 
        this.isbn = isbn; 
        try {
            
            
            String requete = "UPDATE Livre SET ISBN = '" + isbn + "' WHERE titre = '" + this.titre + "'";
            stmt.executeUpdate(requete);
            System.out.println("Base de données mise à jour : Nouvel ISBN enregistré.");
        } catch (SQLException e) {
            System.out.println("Erreur SQL : " + e.getMessage());
        }
    }

    //Set Titre
    public void setTitre(String titre, Statement stmt) {
        this.titre = titre;
        try {
            String requete = "UPDATE Livre SET titre = '" + titre + "' WHERE ISBN = '" + this.isbn + "'";
            stmt.executeUpdate(requete);
            System.out.println("Base de données mise à jour : Nouveau titre enregistré.");
        } catch (SQLException e) {
            System.out.println("Erreur SQL : " + e.getMessage());
        }
    }
    
    //Set Auteur
    public void setAuteur(String auteur, Statement stmt) {
        this.auteur = auteur;
        try {
            String requete = "UPDATE Livre SET Auteur = '" + auteur + "' WHERE ISBN = '" + this.isbn + "'";
            stmt.executeUpdate(requete);
            System.out.println("Base de données mise à jour : Nouvel auteur enregistré.");
        } catch (SQLException e) {
            System.out.println("Erreur SQL : " + e.getMessage());
        }
    }

    //Set Prix
    public void setPrix(int prix, Statement stmt) {
        // Mise à jour de l'objet Java
        this.prix = prix; 
        
        // Mise à jour de la Base de Données
        try {
            String requete = "UPDATE Livre SET prix = " + prix + " WHERE ISBN = '" + this.isbn + "'";
            stmt.executeUpdate(requete);
            System.out.println("Base de données mise à jour : Nouveau prix enregistré.");
        } catch (SQLException e) {
            System.out.println("Erreur lors de la mise à jour du prix : " + e.getMessage());
        }
    }
    
    // 5. AUTRES MÉTHODES
    
    public void afficherLivre() {
        System.out.println("Livre: " + this.titre + " (" + this.isbn + ") - " + this.prix + "€");
    }
}