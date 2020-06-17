-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jsst
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jsst
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jsst` DEFAULT CHARACTER SET utf8 ;
USE `jsst` ;

-- -----------------------------------------------------
-- Table `jsst`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `nome` VARCHAR(100) NULL,
  `sobrenome` VARCHAR(100) NULL,
  `rg` VARCHAR(15) NULL,
  `cpf` VARCHAR(15) NULL,
  `email` VARCHAR(60) NULL,
  `cell` VARCHAR(20) NULL,
  `data_nascimento` DATE NULL,
  `genero` VARCHAR(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`niveis_acesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`niveis_acesso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `niveis` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`licensa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`licensa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(15) NOT NULL,
  `razao_social` VARCHAR(250) NOT NULL,
  `nome_fantasia` VARCHAR(150) NULL,
  `ie` VARCHAR(15) NULL,
  `cnae` VARCHAR(15) NULL,
  `logradouro` VARCHAR(150) NULL,
  `numero` VARCHAR(5) NULL,
  `bairro` VARCHAR(50) NULL,
  `cep` VARCHAR(15) NULL,
  `municipio` VARCHAR(50) NULL,
  `estado` VARCHAR(50) NULL,
  `site` VARCHAR(50) NULL,
  `fone` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `logo` VARCHAR(150) NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_licensa_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_licensa_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `jsst`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(15) NOT NULL,
  `razao_social` VARCHAR(250) NOT NULL,
  `nome_fantasia` VARCHAR(150) NULL,
  `ie` VARCHAR(15) NULL,
  `cnae` VARCHAR(15) NULL,
  `logradouro` VARCHAR(150) NULL,
  `numero` VARCHAR(5) NULL,
  `bairro` VARCHAR(50) NULL,
  `cep` VARCHAR(15) NULL,
  `municipio` VARCHAR(50) NULL,
  `estado` VARCHAR(50) NULL,
  `site` VARCHAR(50) NULL,
  `fone` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `logo` VARCHAR(150) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`setores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`setores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `setores` VARCHAR(150) NOT NULL,
  `descricao` VARCHAR(450) NULL,
  `num_func_m` VARCHAR(5) NULL,
  `num_func_f` VARCHAR(5) NULL,
  `clientes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `clientes_id`),
  INDEX `fk_setores_clientes1_idx` (`clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_setores_clientes1`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `jsst`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`cargos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(150) NOT NULL,
  `cbo` VARCHAR(45) NULL,
  `funcao` VARCHAR(150) NULL,
  `descricao` VARCHAR(450) NULL,
  `num_func_m` VARCHAR(5) NULL,
  `num_func_f` VARCHAR(5) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`funcionarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NOT NULL,
  `rg` VARCHAR(15) NOT NULL,
  `cpf` VARCHAR(15) NULL,
  `ctps` VARCHAR(45) NULL,
  `logradouro` VARCHAR(150) NULL,
  `numero` VARCHAR(5) NULL,
  `bairro` VARCHAR(50) NULL,
  `cep` VARCHAR(15) NULL,
  `municipio` VARCHAR(50) NULL,
  `estado` VARCHAR(50) NULL,
  `data_nasc` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`contrato_trabalho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`contrato_trabalho` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `funcionarios_id` INT NOT NULL,
  `setores_id` INT NOT NULL,
  `cargos_id` INT NOT NULL,
  `dataadm` DATE NULL,
  `status` INT NULL,
  `datadesl` DATE NULL,
  PRIMARY KEY (`id`, `funcionarios_id`, `setores_id`, `cargos_id`),
  INDEX `fk_contrato_trabalho_funcionarios1_idx` (`funcionarios_id` ASC) VISIBLE,
  INDEX `fk_contrato_trabalho_setores1_idx` (`setores_id` ASC) VISIBLE,
  INDEX `fk_contrato_trabalho_cargos1_idx` (`cargos_id` ASC) VISIBLE,
  CONSTRAINT `fk_contrato_trabalho_funcionarios1`
    FOREIGN KEY (`funcionarios_id`)
    REFERENCES `jsst`.`funcionarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrato_trabalho_setores1`
    FOREIGN KEY (`setores_id`)
    REFERENCES `jsst`.`setores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrato_trabalho_cargos1`
    FOREIGN KEY (`cargos_id`)
    REFERENCES `jsst`.`cargos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`agentes_riscos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`agentes_riscos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `risco` VARCHAR(50) NOT NULL,
  `tipo` VARCHAR(50) NULL,
  `danos` VARCHAR(450) NULL,
  `cor` VARCHAR(45) NULL,
  `hexadecimal` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`perigos_ges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`perigos_ges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `fase` VARCHAR(45) NULL,
  `danos` VARCHAR(150) NULL,
  `lim_expo` VARCHAR(45) NULL,
  `fonte_geradora` VARCHAR(450) NULL,
  `intesidade` VARCHAR(5) NULL,
  `tecnica_util` VARCHAR(50) NULL,
  `risco` VARCHAR(50) NULL,
  `monitoramento` VARCHAR(50) NULL,
  `Image1` VARCHAR(45) NULL,
  `Image2` VARCHAR(45) NULL,
  `Image3` VARCHAR(45) NULL,
  `agentes_riscos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_perigos_ges_agentes_riscos1_idx` (`agentes_riscos_id` ASC) VISIBLE,
  CONSTRAINT `fk_perigos_ges_agentes_riscos1`
    FOREIGN KEY (`agentes_riscos_id`)
    REFERENCES `jsst`.`agentes_riscos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`controle_exposicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`controle_exposicao` (
  `ind` INT NOT NULL AUTO_INCREMENT,
  `pcdaepc` VARCHAR(250) NULL,
  `eficaz` VARCHAR(45) NULL,
  `epi` VARCHAR(45) NULL,
  `ca` VARCHAR(45) NULL,
  `perigos_ges_id` INT NOT NULL,
  PRIMARY KEY (`ind`),
  INDEX `fk_controle_exposicao_perigos_ges1_idx` (`perigos_ges_id` ASC) VISIBLE,
  CONSTRAINT `fk_controle_exposicao_perigos_ges1`
    FOREIGN KEY (`perigos_ges_id`)
    REFERENCES `jsst`.`perigos_ges` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`inventario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_rotulo` VARCHAR(150) NULL,
  `substancia` VARCHAR(150) NULL,
  `etapa_processo` VARCHAR(45) NULL,
  `forma_contaminante` VARCHAR(150) NULL,
  `setores_id` INT NOT NULL,
  PRIMARY KEY (`id`, `setores_id`),
  INDEX `fk_inventario_setores1_idx` (`setores_id` ASC) VISIBLE,
  CONSTRAINT `fk_inventario_setores1`
    FOREIGN KEY (`setores_id`)
    REFERENCES `jsst`.`setores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`niveis_acesso_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`niveis_acesso_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `niveis_acesso_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_niveis_acesso_usuario_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_niveis_acesso_usuario_niveis_acesso1_idx` (`niveis_acesso_id` ASC) VISIBLE,
  CONSTRAINT `fk_niveis_acesso_usuario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `jsst`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_niveis_acesso_usuario_niveis_acesso1`
    FOREIGN KEY (`niveis_acesso_id`)
    REFERENCES `jsst`.`niveis_acesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`clientes_has_licensa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`clientes_has_licensa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `licensa_id` INT NOT NULL,
  `clientes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_clientes_has_licensa_licensa1_idx` (`licensa_id` ASC) VISIBLE,
  INDEX `fk_clientes_has_licensa_clientes1_idx` (`clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_clientes_has_licensa_licensa1`
    FOREIGN KEY (`licensa_id`)
    REFERENCES `jsst`.`licensa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clientes_has_licensa_clientes1`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `jsst`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`cargos_setores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`cargos_setores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `setores_id` INT NOT NULL,
  `cargos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cargos_setores_setores1_idx` (`setores_id` ASC) VISIBLE,
  INDEX `fk_cargos_setores_cargos1_idx` (`cargos_id` ASC) VISIBLE,
  CONSTRAINT `fk_cargos_setores_setores1`
    FOREIGN KEY (`setores_id`)
    REFERENCES `jsst`.`setores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cargos_setores_cargos1`
    FOREIGN KEY (`cargos_id`)
    REFERENCES `jsst`.`cargos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`setores_riscos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`setores_riscos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `setores_id` INT NOT NULL,
  `agentes_riscos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_setores_riscos_setores1_idx` (`setores_id` ASC) VISIBLE,
  INDEX `fk_setores_riscos_agentes_riscos1_idx` (`agentes_riscos_id` ASC) VISIBLE,
  CONSTRAINT `fk_setores_riscos_setores1`
    FOREIGN KEY (`setores_id`)
    REFERENCES `jsst`.`setores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_setores_riscos_agentes_riscos1`
    FOREIGN KEY (`agentes_riscos_id`)
    REFERENCES `jsst`.`agentes_riscos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`grupo_exposicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`grupo_exposicao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grupo_exposicao` VARCHAR(50) NULL,
  `quant_func_m` VARCHAR(5) NULL,
  `quant_func_f` VARCHAR(5) NULL,
  `perigos_ges_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_grupo_exposicao_perigos_ges1_idx` (`perigos_ges_id` ASC) VISIBLE,
  CONSTRAINT `fk_grupo_exposicao_perigos_ges1`
    FOREIGN KEY (`perigos_ges_id`)
    REFERENCES `jsst`.`perigos_ges` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
