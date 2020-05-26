-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ciadascompras
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ciadascompras
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ciadascompras` DEFAULT CHARACTER SET utf8 ;
USE `ciadascompras` ;

-- -----------------------------------------------------
-- Table `ciadascompras`.`subseller_pf`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`subseller_pf` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subseller_id` INT NULL DEFAULT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `razao_social` VARCHAR(255) NOT NULL,
  `nascimento` DATE NOT NULL,
  `nome_mae` VARCHAR(200) NOT NULL,
  `ocupacao` VARCHAR(200) NOT NULL,
  `renda` DECIMAL(5,2) NOT NULL,
  `endereco_corresp` VARCHAR(1) NULL DEFAULT NULL,
  `logradouro` VARCHAR(200) NOT NULL,
  `numero` INT NULL DEFAULT NULL,
  `district` VARCHAR(200) NOT NULL,
  `cidade` VARCHAR(200) NOT NULL,
  `estado` VARCHAR(200) NOT NULL,
  `cep` INT NOT NULL,
  `complemento` VARCHAR(200) NULL DEFAULT NULL,
  `logradouro_corresp` VARCHAR(200) NULL DEFAULT NULL,
  `numero_corresp` INT NULL DEFAULT NULL,
  `district_corresp` VARCHAR(200) NULL DEFAULT NULL,
  `cidade_corresp` VARCHAR(200) NULL DEFAULT NULL,
  `estado_corresp` VARCHAR(200) NULL DEFAULT NULL,
  `cep_corresp` INT NULL DEFAULT NULL,
  `complemento_corresp` VARCHAR(200) NULL DEFAULT NULL,
  `pais_corresp` VARCHAR(150) NULL DEFAULT NULL,
  `code_area` INT NOT NULL,
  `phone_number` INT NOT NULL,
  `code_area_cell` INT NOT NULL,
  `cellphone` INT NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `cod_dom_getnet` VARCHAR(200) NULL DEFAULT NULL,
  `contrato_aceito` VARCHAR(1) NOT NULL,
  `responsabilidade_chargeback` VARCHAR(1) NOT NULL,
  `planos_pagamento` INT NOT NULL,
  `marketplace_store` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ciadascompras`.`subseller_pj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`subseller_pj` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subseller_id` INT NULL DEFAULT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `ie` VARCHAR(20) NULL DEFAULT NULL,
  `razao_social` VARCHAR(255) NOT NULL,
  `nome_fantasia` VARCHAR(200) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `code_area` INT NOT NULL,
  `phone_number` INT NOT NULL,
  `code_area_cell` INT NOT NULL,
  `cellphone` INT NOT NULL,
  `logradouro` VARCHAR(200) NOT NULL,
  `numero` INT NULL DEFAULT NULL,
  `district` VARCHAR(200) NOT NULL,
  `cidade` VARCHAR(200) NOT NULL,
  `estado` VARCHAR(200) NOT NULL,
  `cep` INT NOT NULL,
  `complemento` VARCHAR(200) NULL DEFAULT NULL,
  `contrato_aceito` VARCHAR(1) NOT NULL,
  `responsabilidade_chargeback` VARCHAR(1) NOT NULL,
  `marketplace_store` VARCHAR(1) NULL DEFAULT NULL,
  `planos_pagamento` INT NOT NULL,
  `business_entity_type` INT NULL DEFAULT NULL,
  `atividade_economica` INT NULL DEFAULT NULL,
  `monthly_gross_income` INT NULL DEFAULT NULL,
  `federal_registration_status` VARCHAR(200) NULL DEFAULT NULL,
  `data_fundacao` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ciadascompras`.`contas_bancarias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`contas_bancarias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bandeira` VARCHAR(150) NOT NULL,
  `banco` VARCHAR(10) NOT NULL,
  `agencia` VARCHAR(10) NOT NULL,
  `conta` VARCHAR(15) NOT NULL,
  `tipo_conta` VARCHAR(1) NOT NULL,
  `digito` VARCHAR(1) NOT NULL,
  `subseller_pj_id` INT NULL,
  `subseller_pf_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contas_bancarias_subseller_pj_idx` (`subseller_pj_id` ASC) VISIBLE,
  INDEX `fk_contas_bancarias_subseller_pf1_idx` (`subseller_pf_id` ASC) VISIBLE,
  CONSTRAINT `fk_contas_bancarias_subseller_pj`
    FOREIGN KEY (`subseller_pj_id`)
    REFERENCES `ciadascompras`.`subseller_pj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contas_bancarias_subseller_pf1`
    FOREIGN KEY (`subseller_pf_id`)
    REFERENCES `ciadascompras`.`subseller_pf` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ciadascompras`.`lista_comissoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`lista_comissoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bandeira` VARCHAR(150) NOT NULL,
  `produto` VARCHAR(150) NOT NULL,
  `porcentagem` DECIMAL(5,2) NOT NULL,
  `plano` INT NOT NULL,
  `subseller_pj_id` INT NULL,
  `subseller_pf_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lista_comissoes_subseller_pj1_idx` (`subseller_pj_id` ASC) VISIBLE,
  INDEX `fk_lista_comissoes_subseller_pf1_idx` (`subseller_pf_id` ASC) VISIBLE,
  CONSTRAINT `fk_lista_comissoes_subseller_pj1`
    FOREIGN KEY (`subseller_pj_id`)
    REFERENCES `ciadascompras`.`subseller_pj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lista_comissoes_subseller_pf1`
    FOREIGN KEY (`subseller_pf_id`)
    REFERENCES `ciadascompras`.`subseller_pf` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ciadascompras`.`response_subseller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`response_subseller` (
  `subseller_id` INT NULL,
  `legal_document_number` INT NULL,
  `fiscal_type` VARCHAR(50) NULL,
  `enabled` VARCHAR(1) NULL,
  `status` VARCHAR(150) NULL,
  `payment_plan` INT NULL,
  `capture_payments_enabled` VARCHAR(1) NULL,
  `anticipation_enabled` VARCHAR(1) NULL,
  `accepted_contract` VARCHAR(1) NULL,
  `lock_schedule` DATETIME NULL,
  `lock_capture_payments` DATETIME NULL,
  `create_date` DATETIME NULL,
  `subseller_pj_id` INT NULL,
  `subseller_pf_id` INT NULL,
  PRIMARY KEY (`subseller_id`),
  INDEX `fk_response_subseller_subseller_pj1_idx` (`subseller_pj_id` ASC) VISIBLE,
  INDEX `fk_response_subseller_subseller_pf1_idx` (`subseller_pf_id` ASC) VISIBLE,
  CONSTRAINT `fk_response_subseller_subseller_pj1`
    FOREIGN KEY (`subseller_pj_id`)
    REFERENCES `ciadascompras`.`subseller_pj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_response_subseller_subseller_pf1`
    FOREIGN KEY (`subseller_pf_id`)
    REFERENCES `ciadascompras`.`subseller_pf` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ciadascompras`.`sharehoders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`sharehoders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fiscal_type` VARCHAR(100) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `data` DATE NOT NULL,
  `mothers_name` VARCHAR(150) NULL,
  `legal_document_number` VARCHAR(14) NOT NULL,
  `subseller_pj_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sharehoders_subseller_pj1_idx` (`subseller_pj_id` ASC) VISIBLE,
  CONSTRAINT `fk_sharehoders_subseller_pj1`
    FOREIGN KEY (`subseller_pj_id`)
    REFERENCES `ciadascompras`.`subseller_pj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ciadascompras`.`legal_representative`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`legal_representative` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `birth_date` DATE NOT NULL,
  `legal_document_number` VARCHAR(12) NOT NULL,
  `subseller_pj_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_legal_representative_subseller_pj1_idx` (`subseller_pj_id` ASC) VISIBLE,
  CONSTRAINT `fk_legal_representative_subseller_pj1`
    FOREIGN KEY (`subseller_pj_id`)
    REFERENCES `ciadascompras`.`subseller_pj` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ciadascompras`.`report_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ciadascompras`.`report_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detail_attribute` VARCHAR(50) NULL,
  `detail_code` VARCHAR(50) NULL,
  `detail_type` VARCHAR(50) NULL,
  `detail_description` VARCHAR(50) NULL,
  `response_subseller_subseller_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_report_details_response_subseller1_idx` (`response_subseller_subseller_id` ASC) VISIBLE,
  CONSTRAINT `fk_report_details_response_subseller1`
    FOREIGN KEY (`response_subseller_subseller_id`)
    REFERENCES `ciadascompras`.`response_subseller` (`subseller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
