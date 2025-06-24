-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: schoolapplication
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Aid` int NOT NULL AUTO_INCREMENT,
  `gmail` varchar(100) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`Aid`),
  UNIQUE KEY `gmail` (`gmail`),
  UNIQUE KEY `mobile_number` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'uday@gmail.com','8340820754','uday@123'),(2,'meena@gmail.com','1234567890','meena@123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `Sid` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `class` varchar(10) DEFAULT NULL,
  `section` char(1) DEFAULT NULL,
  `status` enum('Present','Absent') DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Sid`,`date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `students` (`Sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES ('S1002','2025-06-18','10','A','Present',NULL),('S1002','2025-06-19','10','A','Present',NULL),('S1002','2025-06-21','10','A','Present',NULL),('s1003','2025-06-20','9','A','Present',NULL),('s1003','2025-06-21','9','A','Present',NULL),('S1004','2025-06-17','10','A','Present',NULL),('S1004','2025-06-19','10','A','Present',NULL),('S1004','2025-06-20','10','A','Absent',NULL),('S1004','2025-06-21','10','A','Absent',NULL),('S1005','2025-06-17','10','A','Present',NULL),('S1005','2025-06-20','10','A','Absent',NULL),('S1005','2025-06-21','10','A','Present',NULL),('S101','2025-06-17','10','A','Present',''),('S101','2025-06-18','10','A','Absent',NULL),('S102','2025-06-17','10','A','Absent','Sick'),('S102','2025-06-18','10','A','Absent',NULL),('S103','2025-06-17','10','B','Present',''),('S103','2025-06-18','10','B','Present',NULL),('S104','2025-06-17','9','B','Present','On time'),('S104','2025-06-18','9','B','Absent',NULL),('S105','2025-06-17','8','A','Present','On time');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_types`
--

DROP TABLE IF EXISTS `exam_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_types` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(50) NOT NULL,
  PRIMARY KEY (`exam_id`),
  UNIQUE KEY `exam_name` (`exam_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_types`
--

LOCK TABLES `exam_types` WRITE;
/*!40000 ALTER TABLE `exam_types` DISABLE KEYS */;
INSERT INTO `exam_types` VALUES (1,'FA1'),(2,'FA2'),(4,'FA3'),(5,'FA4'),(3,'SA1'),(6,'SA2');
/*!40000 ALTER TABLE `exam_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fees`
--

DROP TABLE IF EXISTS `fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees` (
  `Sid` varchar(10) NOT NULL,
  `fee_paid` decimal(10,2) DEFAULT NULL,
  `due_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Sid`),
  CONSTRAINT `fees_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `students` (`Sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees`
--

LOCK TABLES `fees` WRITE;
/*!40000 ALTER TABLE `fees` DISABLE KEYS */;
INSERT INTO `fees` VALUES ('S101',20000.00,10000.00),('S102',15000.00,15000.00),('S103',30000.00,0.00),('S104',25000.00,5000.00),('S105',20000.00,10000.00),('S999',25000.00,NULL);
/*!40000 ALTER TABLE `fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `Sid` varchar(10) NOT NULL,
  `exam_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `marks_obtained` decimal(5,2) DEFAULT NULL,
  `max_marks` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`Sid`,`exam_id`,`subject_id`),
  KEY `exam_id` (`exam_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `students` (`Sid`),
  CONSTRAINT `marks_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exam_types` (`exam_id`),
  CONSTRAINT `marks_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES ('S1003',1,4,43.00,50.00),('S1004',1,1,49.00,50.00),('S1004',1,2,45.00,50.00),('S1004',1,3,40.00,50.00),('S1004',1,4,43.00,50.00),('S1004',3,1,89.00,100.00),('S1004',3,2,85.00,100.00),('S1004',3,3,87.00,100.00),('S1004',3,4,97.00,100.00),('S101',1,1,45.00,50.00),('S101',1,2,43.00,50.00),('S104',1,1,40.00,50.00),('S105',1,2,44.00,50.00);
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (2,'parents meeting on 23/06/2025 at 9:am;\n','2025-06-21 14:54:59'),(3,'Traditional day on upcoming tuesday i.e on 24/06/25 . so make sure your childern come in traditional outfits ','2025-06-21 14:56:13');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `Sid` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `total_fees` decimal(10,2) DEFAULT NULL,
  `class` varchar(10) DEFAULT NULL,
  `section` char(1) DEFAULT NULL,
  `gmail` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `parent_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('S1002','abc','Female','kothapet','1234567890',12222.00,'10','A','123@gmail.com','111',NULL),('s1003','rashi','Female','lb nagar','9999988888',35000.00,'9','A','father@gmail.com','1234','Mr. Anish Kumar'),('S1004','rahul','Male','LB nagar','9999988888',32000.00,'10','A','father@gmail.com','1234','Mr. Anish Kumar'),('S1005','uday','Male','nalgonda','9988771122',35000.00,'10','A','uday@gmail.com','uday123','Mr.vittal'),('S1006','abc','Male','kothapet','1234567890',12.00,'2','a','1234@gmail.com','1234',NULL),('S1007','sai','Male','warangal','8179318870',15000.00,'10','A','sai@gmail.com','sai123',NULL),('S1008','shararath','Male','dilsuknagar','1234567890',15000.00,'10','A','ravi@gmail.com','1234',NULL),('S1009','nihal','Male','kothapet','8179318870',15000.00,'10','A','ram@gmail.com','1234','Ram'),('S101','Riya Sharma','Female','Delhi','9876543210',30000.00,'10','A','riya.sharma@example.com','pass123','Mr. Ramesh Kumar'),('S1010','qw','Male','warangal','1234567890',100000.00,'12','A','sai@gmail.com','123','shankar'),('S1011','nanu','Male','Hyderabad','1234567890',15000.00,'10','A','nanu@gmail.com','1234','daddy'),('S1012','qq','Male','warangal','1234567890',12.00,'12','A','sai@gmail.com','123','shankar'),('S102','Amit Verma','Male','Mumbai','9876543211',30000.00,'10','A','amit.verma@example.com','pass456',NULL),('S103','Priya Mehta','Female','Bangalore','9876543212',30000.00,'10','B','priya.mehta@example.com','pass789','Mr.Raju'),('S104','Anjali Desai','Female','Pune','9876543213',32000.00,'9','B','anjali.desai@example.com','pass101',NULL),('S105','Karan Singh','Male','Hyderabad','9876543214',31000.00,'8','A','karan.singh@example.com','pass202',NULL),('S999','Dummy Student','Other','Test City','9999999999',25000.00,'10','C','dummy@student.com','dummy123',NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) NOT NULL,
  `class` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `subject_name` (`subject_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Math','10'),(2,'Science','10'),(3,'English','10'),(4,'Social Science','10');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `Tid` varchar(10) NOT NULL,
  `Tname` varchar(100) DEFAULT NULL,
  `assigned_class` varchar(10) DEFAULT NULL,
  `assigned_section` char(1) DEFAULT NULL,
  PRIMARY KEY (`Tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('T001','Sunita Desai','10','A'),('T002','Ravi Kumar','10','B');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 10:43:39
