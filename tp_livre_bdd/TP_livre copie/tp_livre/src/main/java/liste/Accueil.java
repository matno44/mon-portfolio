package liste;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

public class Accueil extends JFrame {
    
    // Liste des livres
    private ArrayList<Livre> al = new ArrayList<Livre>();

    // Composants globaux
    private JTextField txtIsbn;
    private JTextField txtTitre;
    private JTextField txtAuteur; // <--- AJOUTÉ ICI (Obligatoire)
    private JTextField txtPrix;
    private JLabel lblCompteur;

     public Accueil() {
        // --- CONFIGURATION FENÊTRE ---
        this.setTitle("Gestion des Livres");
        this.setSize(500, 400); // J'ai agrandi un peu la hauteur
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        JPanel contentPane = new JPanel();
        contentPane.setLayout(null);
        this.setContentPane(contentPane);

        // --- INITIALISATION DONNÉES (BDD) ---
        String url = "jdbc:mysql://localhost:3306/slam2_td2";
        String login = "root";
        String passwd="";
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // Driver récent
            Connection con = DriverManager.getConnection(url,login,passwd);
            Statement stmt = con.createStatement();

            // ATTENTION : J'ai commenté cette ligne car elle fait planter le programme
            // si l'ISBN 999 existe déjà. C'était juste pour un test.
            // String sql = "INSERT INTO `livre` (`ISBN`, `TITRE`, `AUTEUR`, `PRIX`) VALUES ('999', 'test', 'Auteur test', 10); ";
            // stmt.executeUpdate(sql);

            // Lecture de la BDD
            String requete = "SELECT * FROM Livre"; 
            ResultSet rs = stmt.executeQuery(requete);
            
            while (rs.next()) {
                String isbn = rs.getString("ISBN");
                String titre = rs.getString("titre");
                String auteur = rs.getString("Auteur");
               
                int prix = rs.getInt("prix");

                // On crée l'objet Java et on l'ajoute à la liste
                Livre livreBdd = new Livre(isbn, titre, auteur, prix);
                al.add(livreBdd);
            }

            rs.close();
            stmt.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Erreur de connexion BDD : " + e.getMessage());
        }   

        // INTERFACE GRAPHIQUE 
        
        // Ligne 1 : ISBN
        JLabel lblIsbn = new JLabel("ISBN DU LIVRE");
        lblIsbn.setBounds(20, 30, 100, 25);
        contentPane.add(lblIsbn);

        txtIsbn = new JTextField();
        txtIsbn.setBounds(130, 30, 150, 25);
        contentPane.add(txtIsbn);

        JButton btnRechercher = new JButton("Rechercher");
        btnRechercher.setBounds(300, 30, 120, 25);
        contentPane.add(btnRechercher);

        // Ligne 2 : TITRE
        JLabel lblTitre = new JLabel("TITRE DU LIVRE");
        lblTitre.setBounds(20, 70, 100, 25);
        contentPane.add(lblTitre);

        txtTitre = new JTextField();
        txtTitre.setBounds(130, 70, 150, 25);
        contentPane.add(txtTitre);

        // Ligne 3 : AUTEUR 
        JLabel lblAuteur = new JLabel("AUTEUR");
        lblAuteur.setBounds(20, 110, 100, 25);
        contentPane.add(lblAuteur);

        txtAuteur = new JTextField();
        txtAuteur.setBounds(130, 110, 150, 25);
        contentPane.add(txtAuteur);
        
        // Ligne 4 : PRIX 
        JLabel lblPrix = new JLabel("PRIX DU LIVRE");
        lblPrix.setBounds(20, 150, 100, 25);
        contentPane.add(lblPrix);

        txtPrix = new JTextField();
        txtPrix.setBounds(130, 150, 150, 25);
        contentPane.add(txtPrix);

        // BOUTON AJOUTER 
        JButton btnAjouter = new JButton("AJOUTER");
        btnAjouter.setBounds(130, 200, 100, 30);
        contentPane.add(btnAjouter);

        // COMPTEUR 
        lblCompteur = new JLabel("Nombre de livre : " + al.size());
        lblCompteur.setBounds(50, 250, 200, 25);
        contentPane.add(lblCompteur);

        // --- LOGIQUE DES BOUTONS ---

        // 1. Action AJOUTER
        btnAjouter.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String isbn = txtIsbn.getText();
                String titre = txtTitre.getText();
                String prixStr = txtPrix.getText();
                String auteur = txtAuteur.getText(); 

                String url = "jdbc:mysql://localhost:3306/slam2_td2";
                String login = "root";
                String passwd = "";

                try {
                    Connection con = DriverManager.getConnection(url, login, passwd);
                    Statement stmt = con.createStatement();

                    double prixDouble = Double.parseDouble(prixStr);
                    int prixInt = (int) prixDouble;
                    
                    
                    Livre nouveau = new Livre(isbn, titre, auteur, prixInt, stmt);
                    
                    al.add(nouveau); 
                    
                    lblCompteur.setText("Nombre de livre : " + al.size());
                    
                    // Vider les champs
                    txtIsbn.setText("");
                    txtTitre.setText("");
                    txtAuteur.setText(""); // On vide aussi l'auteur
                    txtPrix.setText("");
                   
                    stmt.close();
                    con.close();

                } catch (SQLException ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(null, "Erreur SQL : " + ex.getMessage());
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Le prix doit être un nombre valide !");
                }
            }
        });

        // 2. Action RECHERCHER
        btnRechercher.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String recherche = txtIsbn.getText();
                boolean trouve = false;

                for (Livre l : al) {
                    if (l.getISBN().equals(recherche)) { 
                        txtTitre.setText(l.getTitre());
                        txtAuteur.setText(l.getAuteur()); 
                        txtPrix.setText(String.valueOf(l.getPrix())); 
                        trouve = true;
                        break;
                    }
                }

                if (!trouve) {
                    txtTitre.setText("ERREUR");
                    txtAuteur.setText("ERREUR");
                    txtPrix.setText("ERREUR");
                }
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                Accueil frame = new Accueil();
                frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}