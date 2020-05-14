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
  `nome` VARCHAR(100) NOT NULL,
  `sobrenome` VARCHAR(100) NULL,
  `rg` VARCHAR(15) NULL,
  `cpf` VARCHAR(15) NULL,
  `email` VARCHAR(150) NULL,
  `cell` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`niveis_acesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`niveis_acesso` (
  `id` INT NOT NULL,
  `niveis` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`niveis_acesso_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`niveis_acesso_usuario` (
  `niveis_acesso_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`niveis_acesso_id`, `usuario_id`),
  INDEX `fk_niveis_acesso_has_usuario_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_niveis_acesso_has_usuario_niveis_acesso_idx` (`niveis_acesso_id` ASC) VISIBLE,
  CONSTRAINT `fk_niveis_acesso_has_usuario_niveis_acesso`
    FOREIGN KEY (`niveis_acesso_id`)
    REFERENCES `jsst`.`niveis_acesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_niveis_acesso_has_usuario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `jsst`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `niveis_acesso_usuario_niveis_acesso_id` INT NOT NULL,
  `niveis_acesso_usuario_usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`, `niveis_acesso_usuario_niveis_acesso_id`, `niveis_acesso_usuario_usuario_id`),
  INDEX `fk_licensa_niveis_acesso_usuario1_idx` (`niveis_acesso_usuario_niveis_acesso_id` ASC, `niveis_acesso_usuario_usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_licensa_niveis_acesso_usuario1`
    FOREIGN KEY (`niveis_acesso_usuario_niveis_acesso_id` , `niveis_acesso_usuario_usuario_id`)
    REFERENCES `jsst`.`niveis_acesso_usuario` (`niveis_acesso_id` , `usuario_id`)
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
-- Table `jsst`.`clientes_has_licensa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`clientes_has_licensa` (
  `clientes_id` INT NOT NULL,
  `licensa_id` INT NOT NULL,
  `licensa_niveis_acesso_usuario_niveis_acesso_id` INT NOT NULL,
  `licensa_niveis_acesso_usuario_usuario_id` INT NOT NULL,
  PRIMARY KEY (`clientes_id`, `licensa_id`, `licensa_niveis_acesso_usuario_niveis_acesso_id`, `licensa_niveis_acesso_usuario_usuario_id`),
  INDEX `fk_clientes_has_licensa_licensa1_idx` (`licensa_id` ASC, `licensa_niveis_acesso_usuario_niveis_acesso_id` ASC, `licensa_niveis_acesso_usuario_usuario_id` ASC) VISIBLE,
  INDEX `fk_clientes_has_licensa_clientes1_idx` (`clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_clientes_has_licensa_clientes1`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `jsst`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clientes_has_licensa_licensa1`
    FOREIGN KEY (`licensa_id` , `licensa_niveis_acesso_usuario_niveis_acesso_id` , `licensa_niveis_acesso_usuario_usuario_id`)
    REFERENCES `jsst`.`licensa` (`id` , `niveis_acesso_usuario_niveis_acesso_id` , `niveis_acesso_usuario_usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `jsst`.`cargos_setores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`cargos_setores` (
  `cargos_id` INT NOT NULL,
  `setores_id` INT NOT NULL,
  `setores_clientes_id` INT NOT NULL,
  PRIMARY KEY (`cargos_id`, `setores_id`, `setores_clientes_id`),
  INDEX `fk_cargos_has_setores_setores1_idx` (`setores_id` ASC, `setores_clientes_id` ASC) VISIBLE,
  INDEX `fk_cargos_has_setores_cargos1_idx` (`cargos_id` ASC) VISIBLE,
  CONSTRAINT `fk_cargos_has_setores_cargos1`
    FOREIGN KEY (`cargos_id`)
    REFERENCES `jsst`.`cargos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cargos_has_setores_setores1`
    FOREIGN KEY (`setores_id` , `setores_clientes_id`)
    REFERENCES `jsst`.`setores` (`id` , `clientes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `setores_clientes_id` INT NOT NULL,
  `cargos_id` INT NOT NULL,
  `dataadm` DATE NULL,
  `status` INT NULL,
  `datadesl` DATE NULL,
  PRIMARY KEY (`id`, `funcionarios_id`, `setores_id`, `setores_clientes_id`, `cargos_id`),
  INDEX `fk_contrato_trabalho_funcionarios1_idx` (`funcionarios_id` ASC) VISIBLE,
  INDEX `fk_contrato_trabalho_setores1_idx` (`setores_id` ASC, `setores_clientes_id` ASC) VISIBLE,
  INDEX `fk_contrato_trabalho_cargos1_idx` (`cargos_id` ASC) VISIBLE,
  CONSTRAINT `fk_contrato_trabalho_funcionarios1`
    FOREIGN KEY (`funcionarios_id`)
    REFERENCES `jsst`.`funcionarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrato_trabalho_setores1`
    FOREIGN KEY (`setores_id` , `setores_clientes_id`)
    REFERENCES `jsst`.`setores` (`id` , `clientes_id`)
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
  `danos` VARCHAR(450) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jsst`.`perigos_ges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jsst`.`perigos_ges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `fase` VARCHAR(45) NULL,
  `agentes_riscos_id` INT NOT NULL,
  `danos` VARCHAR(150) NULL,
  `lim_expo` VARCHAR(45) NULL,
  `fonte_geradora` VARCHAR(450) NULL,
  `intesidade` VARCHAR(5) NULL,
  `tecnica_util` VARCHAR(50) NULL,
  `risco` VARCHAR(50) NULL,
  `monitoramento` VARCHAR(50) NULL,
  `setores_id` INT NOT NULL,
  `setores_clientes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `agentes_riscos_id`, `setores_id`, `setores_clientes_id`),
  INDEX `fk_perigos_ges_agentes_riscos1_idx` (`agentes_riscos_id` ASC) VISIBLE,
  INDEX `fk_perigos_ges_setores1_idx` (`setores_id` ASC, `setores_clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_perigos_ges_agentes_riscos1`
    FOREIGN KEY (`agentes_riscos_id`)
    REFERENCES `jsst`.`agentes_riscos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_perigos_ges_setores1`
    FOREIGN KEY (`setores_id` , `setores_clientes_id`)
    REFERENCES `jsst`.`setores` (`id` , `clientes_id`)
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
  `perigos_ges_agentes_riscos_id` INT NOT NULL,
  `perigos_ges_setores_id` INT NOT NULL,
  `perigos_ges_setores_clientes_id` INT NOT NULL,
  PRIMARY KEY (`ind`, `perigos_ges_id`, `perigos_ges_agentes_riscos_id`, `perigos_ges_setores_id`, `perigos_ges_setores_clientes_id`),
  INDEX `fk_controle_exposicao_perigos_ges1_idx` (`perigos_ges_id` ASC, `perigos_ges_agentes_riscos_id` ASC, `perigos_ges_setores_id` ASC, `perigos_ges_setores_clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_controle_exposicao_perigos_ges1`
    FOREIGN KEY (`perigos_ges_id` , `perigos_ges_agentes_riscos_id` , `perigos_ges_setores_id` , `perigos_ges_setores_clientes_id`)
    REFERENCES `jsst`.`perigos_ges` (`id` , `agentes_riscos_id` , `setores_id` , `setores_clientes_id`)
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
  `setores_clientes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `setores_id`, `setores_clientes_id`),
  INDEX `fk_inventario_setores1_idx` (`setores_id` ASC, `setores_clientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_inventario_setores1`
    FOREIGN KEY (`setores_id` , `setores_clientes_id`)
    REFERENCES `jsst`.`setores` (`id` , `clientes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
