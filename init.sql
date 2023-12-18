-- -----------------------------------------------------
-- Table `registration`
-- -----------------------------------------------------
CREATE TABLE `registration` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `token` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` ENUM('USER', 'ADMIN') NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `activate_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `recipe`
-- -----------------------------------------------------
CREATE TABLE `recipe` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author_id` INT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(511) NULL,
  `cook_time` TIME NOT NULL,
  `servings` INT NOT NULL,
  `image_id` VARCHAR(36) NULL COMMENT 'image is optional in recipes, we store only if, image is not held in db',
  PRIMARY KEY (`id`),
  INDEX `fk_recipe_user1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe_user1`
    FOREIGN KEY (`author_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
CREATE TABLE `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `dish`
-- -----------------------------------------------------
CREATE TABLE `dish` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `favourite_recipes`
-- -----------------------------------------------------
CREATE TABLE `favourite_recipes` (
  `user_category_id` INT NOT NULL AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`user_category_id`, `recipe_id`),
  INDEX `fk_user_has_recipe_recipe1_idx` (`recipe_id` ASC) VISIBLE,
  INDEX `fk_user_has_recipe_user1_idx` (`user_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_recipe_user1`
    FOREIGN KEY (`user_category_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_recipe_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `recipe_review`
-- -----------------------------------------------------
CREATE TABLE `recipe_review` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`, `date`),
  INDEX `fk_user_has_recipe_recipe2_idx` (`recipe_id` ASC) VISIBLE,
  INDEX `fk_user_has_recipe_user2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_recipe_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_recipe_recipe2`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `recipe_rating`
-- -----------------------------------------------------
CREATE TABLE `recipe_rating` (
  `recipe_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`recipe_id`, `user_id`),
  INDEX `fk_recipe_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_recipe_has_user_recipe1_idx` (`recipe_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe_has_user_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipe_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `recipe_step`
-- -----------------------------------------------------
CREATE TABLE `recipe_step` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `number` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_recipe_step_recipe1_idx` (`recipe_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe_step_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `recipe_has_category`
-- -----------------------------------------------------
CREATE TABLE `recipe_has_category` (
  `recipe_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`recipe_id`, `category_id`),
  INDEX `fk_recipe_has_category_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_recipe_has_category_recipe1_idx` (`recipe_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe_has_category_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipe_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `recipe_has_dish`
-- -----------------------------------------------------
CREATE TABLE `recipe_has_dish` (
  `recipe_id` INT NOT NULL,
  `dish_id` INT NOT NULL,
  PRIMARY KEY (`recipe_id`, `dish_id`),
  INDEX `fk_recipe_has_dish_dish1_idx` (`dish_id` ASC) VISIBLE,
  INDEX `fk_recipe_has_dish_recipe1_idx` (`recipe_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe_has_dish_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipe_has_dish_dish1`
    FOREIGN KEY (`dish_id`)
    REFERENCES `dish` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
