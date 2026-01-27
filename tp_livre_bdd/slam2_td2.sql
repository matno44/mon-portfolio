-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 27 jan. 2026 à 09:14
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `slam2_td2`
--

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE `livre` (
  `ISBN` varchar(20) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `auteur` varchar(50) NOT NULL,
  `prix` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`ISBN`, `titre`, `auteur`, `prix`) VALUES
('8571245218', 'Le monde s effondre', 'Chinua Achebe', 29.5),
('1317442277', 'Contes', 'Hans Christian Andersen', 10),
('7634271771', 'Orgueil et Prejuges', 'Jane Austen', 29.5),
('9475876608', 'Le Pere Goriot', 'Honore de Balzac', 19.5),
('5879805162', 'Decameron', 'Boccace', 16),
('3674301355', 'Fictions', 'Jorge Luis Borges', 14),
('1989636786', 'Les Hauts de Hurlevent', 'Emily Bront e', 5),
('8573823224', 'L etranger', 'Albert Camus', 20),
('7587744570', 'Voyage au bout de la nuit', 'Louis-Ferdinand Celine', 13),
('5147239320', 'Don Quichotte', 'Miguel de Cervantes', 15),
('1232108579', 'Les Contes de Canterbury', 'Geoffrey Chaucer', 9.5),
('2223083889', 'Nostromo', 'Joseph Conrad', 28),
('4548950963', 'Divine Comedie', 'Dante Alighieri', 25),
('2490943068', 'Les Grandes Esperances', 'Charles Dickens', 18),
('8221283162', 'Jacques le fataliste et son maitre', 'Denis Diderot', 11),
('5979656845', 'Berlin Alexanderplatz', 'Alfred Doblin', 30),
('6154636942', 'Crime et Chatiment', 'Fiodor Dostoievski', 30),
('6649806112', 'L Idiot', 'Fiodor Dostoievski', 13),
('3435062485', 'Les Demons', 'Fiodor Dostoievski', 15),
('7107322340', 'Les Freres Karamazov', 'Fiodor Dostoievski', 22),
('2390936030', 'Middlemarch', 'George Eliot', 18),
('2481084384', 'Medee', 'Euripide', 20),
('4293996815', 'Absalon  Absalon !', 'William Faulkner', 29.5),
('3974060022', 'Le Bruit et la Fureur', 'William Faulkner', 21),
('7495948500', 'Madame Bovary', 'Gustave Flaubert', 19.5),
('6447873157', 'L education sentimentale', 'Gustave Flaubert', 7),
('9127300501', 'Romancero gitano', 'Federico Garcia Lorca', 14),
('6188391185', 'Cent ans de solitude', 'Gabriel Garcia Marquez', 6),
('7966181142', 'L Amour aux temps du cholera', 'Gabriel Garcia Marquez', 5),
('2248495033', 'epopee de Gilgamesh', 'Anonyme', 18),
('7202147245', 'Faust', 'Johann Wolfgang von Goethe', 23),
('6875678783', 'Les ames mortes', 'Nicolas Gogol', 24),
('2170342861', 'Le Tambour', 'Gunter Grass', 21),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('978-2-PRO-JAVA', 'Coder comme un pro en Java', 'M.Gravouil', 99),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('999', 'test', 'Auteur test', 10),
('testajout', 'testajout', 'Inconnu', 10),
('test-12', 'test', 'moi', 10),
('978-2-PRO-JAVA', 'Coder comme un pro en Java', 'M.Gravouil', 99);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
