SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `scuba_steve_db` DEFAULT CHARACTER SET latin1 ;
USE `scuba_steve_db` ;

-- -----------------------------------------------------
-- Table `scuba_steve_db`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`login` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`login` (
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`users` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`users` (
  `UUID` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(30) NULL DEFAULT NULL,
  `last_name` VARCHAR(30) NULL DEFAULT NULL,
  `username` VARCHAR(30) NOT NULL,
  `last_login` DATETIME NULL DEFAULT NULL,
  `level_4_complete` TINYINT(1) NULL DEFAULT True,
  `level_5_complete` TINYINT(1) NULL DEFAULT True,
  `admin` TINYINT(1) NULL DEFAULT NULL,
  `level_1_complete` TINYINT(1) NULL,
  `level_2_complete` TINYINT(1) NULL,
  `level_3_complete` TINYINT(1) NULL,
  PRIMARY KEY (`UUID`),
  INDEX `username_idx` (`username` ASC),
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `scuba_steve_db`.`login` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`levels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`levels` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`levels` (
  `level_id` INT NOT NULL,
  `level_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`level_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`number_recognition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`number_recognition` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`number_recognition` (
  `number_rec_id` VARCHAR(45) NOT NULL,
  `numrec_level_id` INT NULL DEFAULT NULL,
  `number` INT NULL DEFAULT NULL,
  `number_to_identify` INT NULL DEFAULT NULL,
  PRIMARY KEY (`number_rec_id`),
  INDEX `level_id_idx` (`numrec_level_id` ASC),
  CONSTRAINT `numrec_level_id`
    FOREIGN KEY (`numrec_level_id`)
    REFERENCES `scuba_steve_db`.`levels` (`level_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`addition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`addition` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`addition` (
  `addition_id` VARCHAR(45) NOT NULL,
  `addition_level_id` INT NULL DEFAULT NULL,
  `sum_min` INT NULL DEFAULT NULL,
  `sum_max` INT NULL DEFAULT NULL,
  PRIMARY KEY (`addition_id`),
  INDEX `addition_id_idx` (`addition_id` ASC),
  INDEX `level_id_idx` (`addition_level_id` ASC),
  CONSTRAINT `addition_level_id`
    FOREIGN KEY (`addition_level_id`)
    REFERENCES `scuba_steve_db`.`levels` (`level_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`subtraction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`subtraction` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`subtraction` (
  `subtraction_id` VARCHAR(45) NOT NULL,
  `subtraction_level_id` INT NULL DEFAULT NULL,
  `difference_min` INT NULL DEFAULT NULL,
  `difference_max` INT NULL DEFAULT NULL,
  PRIMARY KEY (`subtraction_id`),
  INDEX `fk_level_id_idx` (`subtraction_level_id` ASC),
  CONSTRAINT `subtraction_level_id`
    FOREIGN KEY (`subtraction_level_id`)
    REFERENCES `scuba_steve_db`.`levels` (`level_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`math_problems`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`math_problems` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`math_problems` (
  `problem_id` INT NOT NULL,
  `problems_addition_id` VARCHAR(45) NULL DEFAULT NULL,
  `problems_number_rec_id` VARCHAR(45) NULL DEFAULT NULL,
  `problems_subtraction_id` VARCHAR(45) NULL,
  PRIMARY KEY (`problem_id`),
  INDEX `rec_id_idx` (`problems_number_rec_id` ASC),
  INDEX `add_id_idx` (`problems_addition_id` ASC),
  INDEX `subtraction_id_idx` (`problems_subtraction_id` ASC),
  CONSTRAINT `rec_id`
    FOREIGN KEY (`problems_number_rec_id`)
    REFERENCES `scuba_steve_db`.`number_recognition` (`number_rec_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `add_id`
    FOREIGN KEY (`problems_addition_id`)
    REFERENCES `scuba_steve_db`.`addition` (`addition_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sub_id`
    FOREIGN KEY (`problems_subtraction_id`)
    REFERENCES `scuba_steve_db`.`subtraction` (`subtraction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`scores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scuba_steve_db`.`scores` ;

CREATE TABLE IF NOT EXISTS `scuba_steve_db`.`scores` (
  `score_id` VARCHAR(45) NOT NULL,
  `score_level_id` INT NOT NULL,
  `UUID` VARCHAR(45) NOT NULL,
  `score` DOUBLE NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`score_id`),
  INDEX `UUID_idx` (`UUID` ASC),
  INDEX `score_level_id_idx` (`score_level_id` ASC),
  CONSTRAINT `UUID`
    FOREIGN KEY (`UUID`)
    REFERENCES `scuba_steve_db`.`users` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `score_level_id`
    FOREIGN KEY (`score_level_id`)
    REFERENCES `scuba_steve_db`.`levels` (`level_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
