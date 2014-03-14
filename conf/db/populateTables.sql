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
INSERT INTO `levels` VALUES ('1', 'Level 1'), ('2', 'Level 2'), ('3', 'Level 3'), ('4', 'Level 4'), ('5', 'Level 5');
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
INSERT INTO `login` VALUES ('admin','admin'),('shane','shane'), ('jace','jace'), ('drew','drew'), ('dillon','dillon'), ('dan','<3 men'), ('barney','barney'),('doctor','doctor'), ('rose','rose');
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
INSERT INTO `scores` VALUES ('score1','1','uuid1','90','2013-12-18 14:17:17'),('score2','1','uuid1','72','2013-11-18 13:19:17'),('score3','2','uuid1','85','2013-12-18 14:17:17'),
('score4','1','uuid2','90','2013-12-18 14:17:17'),('score5','1','uuid2','72','2013-11-18 13:19:17'),('score6','2','uuid2','85','2013-12-18 14:17:17'),
('score7','1','uuid3','90','2013-12-18 14:17:17'),('score8','1','uuid3','72','2013-11-18 13:19:17'),('score9','2','uuid3','85','2013-12-18 14:17:17'),
('score10','1','uuid4','90','2013-12-18 14:17:17'),('score11','1','uuid4','72','2013-11-18 13:19:17'),('score12','2','uuid4','85','2013-12-18 14:17:17'),
('score13','1','uuid5','90','2013-12-18 14:17:17'),('score14','1','uuid5','72','2013-11-18 13:19:17'),('score15','2','uuid5','85','2013-12-18 14:17:17'),
('score16','1','uuid6','70','2013-12-18 14:17:17'),('score17','1','uuid6','72','2013-11-18 13:19:17'),('score18','2','uuid6','85','2013-12-18 14:17:17'),
('score26','1','uuid7','85','2013-12-18 14:17:17'),('score27','1','uuid7','91','2013-11-18 13:19:17'),('score28','2','uuid7','89','2013-12-18 14:17:17'),('score25','3','uuid7','87','2013-12-18 14:17:17'),
('score29','1','uuid8','98','2013-12-18 14:17:17'),('score30','1','uuid8','67','2013-11-18 13:19:17'),('score31','2','uuid8','88','2013-12-18 14:17:17'),('score22','3','uuid8','80','2013-12-18 14:17:17'),('score23','4','uuid8','99','2013-12-18 14:17:17'),('score24','5','uuid8','100','2013-12-18 14:17:17'),
('score32','1','uuid9','92','2013-12-18 14:17:17'),('score33','1','uuid9','100','2013-11-18 13:19:17'),('score34','2','uuid9','92','2013-12-18 14:17:17'),('score19','3','uuid9','87','2013-12-18 14:17:17'),('score20','4','uuid9','90','2013-12-18 14:17:17'),('score21','5','uuid9','82','2013-12-18 14:17:17');
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
INSERT INTO `users` VALUES ('uuid1','Shane','McKee','shane','2013-12-18 13:17:17',0,0,1,0,0,0),('uuid2','Hi','guys','admin','2013-12-18 13:17:17',0,0,1,0,0,0),
('uuid3','Jace','Maxfield','jace','2013-12-18 13:17:17',0,0,1,0,0,0), ('uuid4','Drew','Olsen','drew','2013-12-18 13:17:17',0,0,1,0,0,0), ('uuid5','Dillon','Irish','dillon','2013-12-18 13:17:17',0,0,1,0,0,0),
('uuid6','Dan','Barton','dan','2013-12-18 13:17:17',0,0,0,0,0,0), ('uuid7','Barney','Stinson','barney','2013-12-18 13:17:17',0,0,0,0,0,0), ('uuid8','The','Doctor','doctor','2013-12-18 13:17:17',0,0,0,0,0,0),
('uuid9','Rose','Tyler','rose','2013-12-18 13:17:17',0,0,0,0,0,0);
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
