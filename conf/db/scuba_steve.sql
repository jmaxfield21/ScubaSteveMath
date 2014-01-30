SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `scuba_steve_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `scuba_steve_db` ;

-- -----------------------------------------------------
-- Table `scuba_steve_db`.`login`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`login` (
  `username` VARCHAR(30) NOT NULL ,
  `password` VARCHAR(100) NULL ,
  PRIMARY KEY (`username`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`users` (
  `UUID` VARCHAR(45) NOT NULL ,
  `first_name` VARCHAR(30) NULL ,
  `last_name` VARCHAR(30) NULL ,
  `username` VARCHAR(30) NOT NULL ,
  `last_login` DATETIME NULL ,
  `level_4_lock` TINYINT(1) NULL DEFAULT True ,
  `level_5_lock` TINYINT(1) NULL DEFAULT True ,
  `admin` TINYINT(1) NULL ,
  PRIMARY KEY (`UUID`) ,
  INDEX `username_idx` (`username` ASC) ,
  CONSTRAINT `username`
    FOREIGN KEY (`username` )
    REFERENCES `scuba_steve_db`.`login` (`username` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`math_problems`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`math_problems` (
  `level_id` INT NOT NULL ,
  `addition_id` VARCHAR(45) NULL ,
  `subtraction_id` VARCHAR(45) NULL ,
  `number_rec_id` VARCHAR(45) NULL ,
  PRIMARY KEY (`level_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`levels`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`levels` (
  `score_id` VARCHAR(45) NOT NULL ,
  `level_id` INT NOT NULL ,
  `level_name` VARCHAR(45) NULL ,
  `UUID` VARCHAR(45) NOT NULL ,
  `score` DOUBLE NULL ,
  `date` DATETIME NULL ,
  PRIMARY KEY (`score_id`) ,
  INDEX `UUID_idx` (`UUID` ASC) ,
  INDEX `level_id_idx` (`level_id` ASC) ,
  CONSTRAINT `UUID`
    FOREIGN KEY (`UUID` )
    REFERENCES `scuba_steve_db`.`users` (`UUID` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `level_id`
    FOREIGN KEY (`level_id` )
    REFERENCES `scuba_steve_db`.`math_problems` (`level_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`scores`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`scores` (
  `level_id` INT NOT NULL ,
  `level_name` VARCHAR(45) NULL ,
  `UUID` VARCHAR(45) NULL ,
  `score` DOUBLE NULL ,
  `date` DATETIME NULL ,
  PRIMARY KEY (`level_id`) ,
  INDEX `UUID_idx` (`UUID` ASC) ,
  CONSTRAINT `UUID`
    FOREIGN KEY (`UUID` )
    REFERENCES `scuba_steve_db`.`users` (`UUID` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`addition`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`addition` (
  `addition_id` VARCHAR(45) NOT NULL ,
  `level_id` INT NULL ,
  `sum_min` INT NULL ,
  `sum_max` INT NULL ,
  PRIMARY KEY (`addition_id`) ,
  INDEX `addition_id_idx` (`addition_id` ASC) ,
  CONSTRAINT `addition_id`
    FOREIGN KEY (`addition_id` )
    REFERENCES `scuba_steve_db`.`math_problems` (`addition_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`subtraction`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`subtraction` (
  `subtraction_id` VARCHAR(45) NOT NULL ,
  `level_id` INT NULL ,
  `difference_min` INT NULL ,
  `difference_max` INT NULL ,
  PRIMARY KEY (`subtraction_id`) ,
  CONSTRAINT `fk_subtraction_math_problems1`
    FOREIGN KEY (`subtraction_id` )
    REFERENCES `scuba_steve_db`.`math_problems` (`subtraction_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scuba_steve_db`.`number_recognition`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `scuba_steve_db`.`number_recognition` (
  `number_rec_id` VARCHAR(45) NOT NULL ,
  `level_id` INT NULL ,
  `number` INT NULL ,
  `number_to_identify` INT NULL ,
  PRIMARY KEY (`number_rec_id`) ,
  CONSTRAINT `fk_number_recognition_math_problems1`
    FOREIGN KEY (`number_rec_id` )
    REFERENCES `scuba_steve_db`.`math_problems` (`number_rec_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
