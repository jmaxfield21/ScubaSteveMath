-- MySQL dump 10.13  Distrib 5.6.12, for osx10.8 (x86_64)
--
-- Host: localhost    Database: scuba_steve_db
-- ------------------------------------------------------
-- Server version	5.6.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addition`
--

DROP TABLE IF EXISTS `addition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addition` (
  `addition_id` varchar(45) NOT NULL,
  `addition_level_id` int(11) DEFAULT NULL,
  `sum_min` int(11) DEFAULT NULL,
  `sum_max` int(11) DEFAULT NULL,
  PRIMARY KEY (`addition_id`),
  KEY `addition_id_idx` (`addition_id`),
  KEY `level_id_idx` (`addition_level_id`),
  CONSTRAINT `addition_level_id` FOREIGN KEY (`addition_level_id`) REFERENCES `levels` (`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addition`
--

LOCK TABLES `addition` WRITE;
/*!40000 ALTER TABLE `addition` DISABLE KEYS */;
/*!40000 ALTER TABLE `addition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levels` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(45) NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `username` varchar(30) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('admin','admin'),('shane','test');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `math_problems`
--

DROP TABLE IF EXISTS `math_problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `math_problems` (
  `problem_id` int(11) NOT NULL,
  `problems_addition_id` varchar(45) DEFAULT NULL,
  `problems_number_rec_id` varchar(45) DEFAULT NULL,
  `problems_subtraction_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`problem_id`),
  KEY `rec_id_idx` (`problems_number_rec_id`),
  KEY `add_id_idx` (`problems_addition_id`),
  KEY `subtraction_id_idx` (`problems_subtraction_id`),
  CONSTRAINT `add_id` FOREIGN KEY (`problems_addition_id`) REFERENCES `addition` (`addition_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rec_id` FOREIGN KEY (`problems_number_rec_id`) REFERENCES `number_recognition` (`number_rec_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sub_id` FOREIGN KEY (`problems_subtraction_id`) REFERENCES `subtraction` (`subtraction_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `math_problems`
--

LOCK TABLES `math_problems` WRITE;
/*!40000 ALTER TABLE `math_problems` DISABLE KEYS */;
/*!40000 ALTER TABLE `math_problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `number_recognition`
--

DROP TABLE IF EXISTS `number_recognition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `number_recognition` (
  `number_rec_id` varchar(45) NOT NULL,
  `numrec_level_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `number_to_identify` int(11) DEFAULT NULL,
  PRIMARY KEY (`number_rec_id`),
  KEY `level_id_idx` (`numrec_level_id`),
  CONSTRAINT `numrec_level_id` FOREIGN KEY (`numrec_level_id`) REFERENCES `levels` (`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `number_recognition`
--

LOCK TABLES `number_recognition` WRITE;
/*!40000 ALTER TABLE `number_recognition` DISABLE KEYS */;
/*!40000 ALTER TABLE `number_recognition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `score_id` varchar(45) NOT NULL,
  `score_level_id` int(11) NOT NULL,
  `UUID` varchar(45) NOT NULL,
  `score` double DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`score_id`),
  KEY `UUID_idx` (`UUID`),
  KEY `score_level_id_idx` (`score_level_id`),
  CONSTRAINT `score_level_id` FOREIGN KEY (`score_level_id`) REFERENCES `levels` (`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `UUID` FOREIGN KEY (`UUID`) REFERENCES `users` (`UUID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtraction`
--

DROP TABLE IF EXISTS `subtraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subtraction` (
  `subtraction_id` varchar(45) NOT NULL,
  `subtraction_level_id` int(11) DEFAULT NULL,
  `difference_min` int(11) DEFAULT NULL,
  `difference_max` int(11) DEFAULT NULL,
  PRIMARY KEY (`subtraction_id`),
  KEY `fk_level_id_idx` (`subtraction_level_id`),
  CONSTRAINT `subtraction_level_id` FOREIGN KEY (`subtraction_level_id`) REFERENCES `levels` (`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtraction`
--

LOCK TABLES `subtraction` WRITE;
/*!40000 ALTER TABLE `subtraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UUID` varchar(45) NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `level_4_complete` tinyint(1) DEFAULT '1',
  `level_5_complete` tinyint(1) DEFAULT '1',
  `admin` tinyint(1) DEFAULT NULL,
  `level_1_complete` tinyint(1) DEFAULT NULL,
  `level_2_complete` tinyint(1) DEFAULT NULL,
  `level_3_complete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`UUID`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('uuid1','shane','mckee','shane','2013-12-18 13:17:17',0,0,1,0,0,0),('uuid2','Hi','guys','admin','2013-12-18 13:17:17',0,0,1,0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-13  1:15:04
