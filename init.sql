-- Host: localhost    Database: recipes
-- ------------------------------------------------------
-- Server version	8.2.0

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `category`
--

INSERT INTO `category` VALUES (1,'wegetariańskie'),(2,'wegańskie'),(3,'bezglutenowe'),(4,'bezlaktozowe'),(5,'niskokaloryczne'),(6,'niskowęglowodanowe'),(7,'wysokobiałkowe'),(8,'keto'),(9,'na parze'),(10,'mięsne');

--
-- Table structure for table `dish`
--

CREATE TABLE `dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `dish`
--

INSERT INTO `dish` VALUES (1,'śniadanie'),(2,'obiad'),(3,'kolacja'),(4,'przekąska'),(5,'deser'),(6,'napój'),(7,'lunche'),(8,'zupy'),(9,'surówki'),(10,'przystawki'),(11,'dania główne');

--
-- Table structure for table `favourite_recipes`
--

CREATE TABLE `favourite_recipes` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`recipe_id`),
  KEY `fk_user_has_recipe_recipe1_idx` (`recipe_id`),
  KEY `fk_user_has_recipe_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_recipe_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `fk_user_has_recipe_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Dumping data for table `favourite_recipes`
--

INSERT INTO `favourite_recipes` VALUES (5,1),(6,1),(3,2),(4,2),(3,3),(4,3),(5,4),(6,4),(5,5),(6,5),(3,6),(4,6),(5,7),(6,7),(7,7);

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipe_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ingredients_recipe1_idx` (`recipe_id`),
  CONSTRAINT `fk_ingredients_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` VALUES (1,'4 łyżki czarnej soczewicy',1),(2,'szczpyta soli',1),(3,'2 ząbki czosnku',1),(4,'1 gwiazdka anyżu',1),(5,'1 cebula',1),(6,'15 suszonych grzybów',1),(7,'1 łyżeczka cynamonu cejlońskiego',1),(8,'butelka passaty pomidorowej',1),(9,'płatki drożdżowe do posypania',1),(10,'oliwa z oliwek do sosu',1),(11,'pieprz',1),(12,'makaron spaghetti lub inny',1),(13,'2 łyżeczki ziół prowansalskich do sosu',1),(14,'świeża bazylia do posypania',1),(15,'sól',1),(16,'2 łyżki dowolnego oleju do soczewicy',1),(17,'kilka łodyg selera naciowego',1),(18,'3 marchewki',1),(19,'2 łyżki sosu sojowego',1),(20,'szklanka wody',1),(21,'1/4 szklanki wytrawnego wina (opcjonalnie)',1),(22,'świeża bazylia do posypania',2),(23,'sól',2),(24,'makaron spaghetti lub inny',2),(25,'2 ząbki czosnku',2),(26,'0,5kg mięsa mielonego',2),(27,'2 łyżeczki ziół prowansalskich do sosu',2),(28,'oliwa z oliwek do sosu',2),(29,'parmezan do posypania lub płatki drożdżowe',2),(30,'pieprz',2),(31,'1 cebula',2),(32,'1 butelka passaty pomidorowej',2),(33,'2 łyżki herbaty matcha',3),(34,'4 łyżki mąki',3),(35,'200g cukru',3),(36,'200ml śmietanki 30%',3),(37,'1kg zmielonego twarogu',3),(38,'100g masła',3),(39,'1 łyżeczka ekstraktu waniliowego',3),(40,'2 łyżki gorącej wody',3),(41,'6 jajek',3),(42,'200g herbatników',3),(43,'sól',4),(44,'1 łyżka mleka',4),(45,'3 jajka',4),(46,'1 cebula',4),(47,'pieprz',4),(48,'1 łyżka oleju',4),(49,'1 łyżka posiekanego szczypiorku',4),(50,'1 łyżeczka oleju kokosowego',5),(51,'3 jajka',5),(52,'3 łyżeczki mascarpone',5),(53,'1/3 łyżeczki soli',6),(54,'3/4 szklanki cukru trzcinowego',6),(55,'1 szklanka puree z dyni',6),(56,'2 łyżki octu jabłkowego',6),(57,'1/2 łyżeczka sody',6),(58,'1 łyżeczka proszku do pieczenia',6),(59,'1/2 szklanki oleju',6),(60,'1/3 szklanki mocnej herbaty Earl Grey',6),(61,'2 szklanki mąki pszennej',6),(62,'szczypta pieprzu',7),(63,'1 szklanka mleka roślinnego',7),(64,'1 łyżeczka imbiru',7),(65,'1 łyżeczka kurkumy',7),(66,'1 łyżeczka kardamonu',7),(67,'1 łyżeczka cynamonu',7),(68,'1 łyżeczka miodu',7),(69,'1 łyżka oleju kokosowego',7);

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cook_time` time NOT NULL,
  `servings` int NOT NULL,
  `image_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_recipe_user1_idx` (`author_id`),
  CONSTRAINT `fk_recipe_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
);

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` VALUES (1,NULL,'Spaghetti wegetariańskie','Wegetariańska wersja spaghetti bolognese','23:30:01',4,'veganese'),(2,NULL,'Spaghetti z mięsem','Klasyczne spaghetti z mięsem mielonym i sosem pomidorowym','23:30:01',4,'spaghetti-con-carne'),(3,NULL,'Sernik matcha','Pyszny sernik w wydaniu azjatyckim o smaku herbaty matcha.','01:00:01',10,'matcha-cheesecake'),(4,NULL,'Jajecznica','Klasyczna jajecznica z cebulą i szczypiorkiem','23:10:01',2,'jajecznica'),(5,NULL,'Naleśniki ketogeniczne','Naleśniki bez mąki, bez cukru, bez glutenu, bez węglowodanów','23:20:01',2,'keto-pancake'),(6,NULL,'Ciasto dyniowe z herbatą','Pyszne ciasto dyniowe z domieszką herbaty.','01:00:01',10,'ciasto-dyniowe'),(7,NULL,'Złote mleko','Napój o właściwościach prozdrowotnych.','23:10:01',2,'golden-milk');

--
-- Table structure for table `recipe_has_category`
--

CREATE TABLE `recipe_has_category` (
  `recipe_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`category_id`),
  KEY `fk_recipe_has_category_category1_idx` (`category_id`),
  KEY `fk_recipe_has_category_recipe1_idx` (`recipe_id`),
  CONSTRAINT `fk_recipe_has_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_recipe_has_category_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Dumping data for table `recipe_has_category`
--

INSERT INTO `recipe_has_category` VALUES (1,1),(6,1),(7,1),(6,2),(7,2),(7,4),(3,7),(5,8),(2,10),(4,10);

--
-- Table structure for table `recipe_has_dish`
--

CREATE TABLE `recipe_has_dish` (
  `recipe_id` int NOT NULL,
  `dish_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`dish_id`),
  KEY `fk_recipe_has_dish_dish1_idx` (`dish_id`),
  KEY `fk_recipe_has_dish_recipe1_idx` (`recipe_id`),
  CONSTRAINT `fk_recipe_has_dish_dish1` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`id`),
  CONSTRAINT `fk_recipe_has_dish_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Dumping data for table `recipe_has_dish`
--

INSERT INTO `recipe_has_dish` VALUES (4,1),(5,1),(1,2),(2,2),(4,2),(3,5),(5,5),(6,5),(7,6),(1,11),(2,11);

--
-- Table structure for table `recipe_has_tag`
--

CREATE TABLE `recipe_has_tag` (
  `recipe_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`tag_id`),
  KEY `fk_recipe_has_tag_recipe1_idx` (`recipe_id`),
  KEY `fk_recipe_has_tag_tag1_idx` (`tag_id`),
  CONSTRAINT `fk_recipe_has_tag_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `fk_recipe_has_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
);

--
-- Dumping data for table `recipe_has_tag`
--

INSERT INTO `recipe_has_tag` VALUES (1,1),(1,3),(1,4),(1,5),(1,6),(1,7),(2,1),(2,3),(2,4),(2,5),(2,6),(2,7),(2,10),(3,2),(3,7),(4,2),(4,4),(5,2);

--
-- Table structure for table `recipe_rating`
--

CREATE TABLE `recipe_rating` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`user_id`),
  KEY `fk_recipe_has_user_recipe1_idx` (`recipe_id`),
  KEY `fk_recipe_has_user_user1_idx` (`user_id`),
  CONSTRAINT `fk_recipe_has_user_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `fk_recipe_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Dumping data for table `recipe_rating`
--

INSERT INTO `recipe_rating` VALUES (1,3,5),(1,4,4),(1,5,2),(2,3,5),(2,4,4),(2,5,5),(3,3,4),(3,4,4),(3,5,4),(4,3,5),(4,4,4),(4,5,3),(5,3,5),(5,4,3),(5,5,2),(6,3,3),(6,4,4),(6,5,4),(7,3,5),(7,4,4),(7,5,4),(7,6,4),(7,7,5);

--
-- Table structure for table `recipe_review`
--

CREATE TABLE `recipe_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `date` datetime NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_has_recipe_recipe2_idx` (`recipe_id`),
  KEY `fk_user_has_recipe_user2_idx` (`user_id`),
  CONSTRAINT `fk_user_has_recipe_recipe2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `fk_user_has_recipe_user2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Dumping data for table `recipe_review`
--

INSERT INTO `recipe_review` VALUES (1,3,1,'2024-01-02 15:08:49','Dobra bezmięsna opcja. Polecam'),(2,4,1,'2024-01-02 15:08:49','Zrobiłem i jestem zadowolony. Polecam'),(3,5,1,'2024-01-02 15:08:49','Dobre, ale nie dla mnie'),(4,3,2,'2024-01-02 15:08:49','Bardzo dobre'),(5,4,2,'2024-01-02 15:08:49','Pyszny przepis! Zrobię na pewno nie jeden raz!'),(6,6,3,'2024-01-02 15:08:49','Bardzo dobre ciasto'),(7,7,3,'2024-01-02 15:08:49','Dobre, ale wolę klasyczny sernik'),(8,4,3,'2024-01-02 15:08:49','A gdzie rodzynki?'),(9,6,4,'2024-01-02 15:08:49','Klasyczna jajecznica, ale zawsze dobra'),(10,4,4,'2024-01-02 15:08:49','Dobre, ale wolę jajecznice z pomidorami'),(11,3,5,'2024-01-02 15:08:49','Dobre, ale wolę zwykłe naleśniki'),(12,5,5,'2024-01-02 15:08:49','Dobre, zdrowe!!!'),(13,7,6,'2024-01-02 15:08:49','Przepyszne, idealne na jesienne wieczory'),(14,5,6,'2024-01-02 15:08:49','Dobre, ale wolę zwykłe ciasto dyniowe'),(15,3,7,'2024-01-02 15:08:49','Dobre, zdrowe, obowiązkowy napój na dobrą odporność'),(16,4,7,'2024-01-02 15:08:49','Dobre, ale wolę zwykłe mleko'),(17,5,7,'2024-01-02 15:08:49','Ciekawy smak'),(18,6,7,'2024-01-02 15:08:49','Piłem u mojej babci, ale nie wiedziałem jak się robi. Dzięki za przepis');

--
-- Table structure for table `recipe_step`
--

CREATE TABLE `recipe_step` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int NOT NULL,
  `recipe_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipe_step_recipe1_idx` (`recipe_id`),
  CONSTRAINT `fk_recipe_step_recipe1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Dumping data for table `recipe_step`
--

INSERT INTO `recipe_step` VALUES (1,'Podawaj z posypanymi płatkami drożdżowymi i świeżą bazylią.',8,1),(2,'Dodaj passatę pomidorową i zioła prowansalskie. Gotuj przez 10 minut.',6,1),(3,'Dodaj cynamon, anyż i sól. ',3,1),(4,'Makaron ugotuj al dente w osolonej wodzie. Odcedź i wymieszaj z sosem.',7,1),(5,'Soczewicę i grzyby zalej sosem sojowym, wodą i olejem. Wstaw na mały ogień i gotuj pod przykryciem 20-25 minut do wchłonięcia płynów.',1,1),(6,'Jeśli używasz wina, dodaj je teraz i gotuj, aż odparuje.',4,1),(7,'Cebulę, marchewki i seler pokrój w kostkę. Czosnek posiekaj. Na patelni rozgrzej olej, dodaj cebulę i smaż przez 2 minuty. Dodaj marchewkę, seler i czosnek. Smaż aż warzywa zmiękną.',2,1),(8,'W międzyczasie zblenduj soczewicę z grzybami na gładką masę. Dodaj do warzyw i wymieszaj.',5,1),(9,'Zdejmij z ognia i przełóż do miski.',3,2),(10,'Cebulę i czosnek posiekaj. Na patelni rozgrzej oliwę, dodaj cebulę i smaż przez 2 minuty. Dodaj czosnek i smaż przez kolejną minutę.',2,2),(11,'Włącz patelnię na bardzo niski ogień. Dodaj oliwę oraz zioła prowansalskie. W momenci kiedy zioła zaczną pachnieć, zdejmij do miski.',1,2),(12,'Dodaj passatę pomidorową. Gotuj przez 10 minut.',5,2),(13,'Podawaj z posypanymi płatkami drożdżowymi lub startym serem i świeżą bazylią.',7,2),(14,'Na tej samej patelni podsmaż mięso mielone. Dodaj do cebuli i czosnku.',4,2),(15,'Makaron ugotuj al dente w osolonej wodzie. Odcedź i wymieszaj z sosem.',6,2),(16,'Formę ustawić w kąpieli wodnej. Użyć gorącej wody',11,3),(17,'Przykryć formę folią aluminiową',12,3),(18,'Dodać cukier',4,3),(19,'Dodawać jajka po jednym, zmniejszyć obroty miksera',5,3),(20,'Wylać masę na herbatniki',10,3),(21,'Dodać mąkę i wymieszać dokładnie łyżką',9,3),(22,'Dodać eksktrakt waniliowy',8,3),(23,'Ser miksować w misce 2-3 minuty, aby uzyskać jednolitą, napowietrzoną masę',3,3),(24,'Piekarnik powinien być nagrzany do 170 stopni. Piec w tej temperaturze przez 15 minut. Następnie obniżyć ją do 120 stopni i piec kolejne 45-60 minut.',13,3),(25,'Matchę wymieszać z 2 łyżkami gorącej wody.',2,3),(26,'Dodać śmietanki',6,3),(27,'Dodać matchę',7,3),(28,'Rozgnieść herbatniki. Wymieszać z roztopionym masłem i wyłożyć na dno tortownicy.',1,3),(29,'Po upieczeniu wyjąć z piekarnika i ostudzić. Następnie wstawić do lodówki na kilka godzin.',14,3),(30,'Dodać do cebuli i smażyć, mieszając, aż się zetną.',4,4),(31,'Jajka roztrzepać z mlekiem, solą i pieprzem.',3,4),(32,'Podawać z chlebem.',6,4),(33,'Cebulę pokroić w kostkę, szczypiorek posiekać.',1,4),(34,'Na koniec dodać szczypiorek.',5,4),(35,'Na patelni rozgrzać olej, dodać cebulę i smażyć, aż się zeszkli.',2,4),(36,'Na patelni rozgrzać olej kokosowy i smażyć naleśniki z obu stron na złoty kolor.',2,5),(37,'Wszystkie składniki naleśników umieścić w blenderze i zmiksować na gładką masę.',1,5),(38,'W międzyczasie zalać herbatę wrzątkiem i odstawić do ostygnięcia.',2,6),(39,'Wymieszać wszystkie mokre składniki i zblendować',4,6),(40,'Dynię obrać, pokroić w kostkę i ugotować na parze.',1,6),(41,'Wylać ciasto do formy i piec w 180 stopniach przez 50-60 minut.',6,6),(42,'Ostudzoną dynię zmiksować na gładką masę.',3,6),(43,'Wymieszać wszystkie suche składniki i dodać do nich mokre.',5,6),(44,'Wszystkie składniki umieścić w garnku i podgrzewać, aż się zagotują.',1,7),(45,'Podawać ciepłe.',2,7);

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` VALUES (1,'pomidor'),(2,'jajka'),(3,'grzyby'),(4,'cebula'),(5,'czosnek'),(6,'makaron'),(7,'ser'),(8,'kurczak'),(9,'wieprzowina'),(10,'wołowina'),(11,'ryż'),(12,'ziemniaki'),(13,'marchewka'),(14,'ryba'),(15,'szpinak'),(16,'truskawka');

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('USER','ADMIN','MODERATOR') COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `birthdate` date DEFAULT NULL,
  `activate_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES (1,'ADMIN','admin','admin@localhost','$2b$10$5KrLIdTujpYhJpqTkccFhOObbGyPP.2oFJX1aGtO2.D2a0XiVBlp6','Admin','Admin','2024-01-02','2024-01-02 15:08:48'),(2,'MODERATOR','moderator','mod@localhost','$2b$10$2.PgdpDZiHW6thKLBUqHROXHdXyToDkq5oilHklH/yCYkJs1y9spu','Moderator','Moderator','2024-01-02','2024-01-02 15:08:48'),(3,'USER','janko','user+1@localhost','$2b$10$DGxyOGIHIntaIbv5MCE2BeVhWVg7DIHJx33horNw1DudMynORPW3O','Jan','Kowalski','2024-01-02','2024-01-02 15:08:48'),(4,'USER','franko','user+2@localhost','$2b$10$ZLzY6M.JApMMM5Wi24WS5ewAVdLB2bz0t7TF2sGvQb1nGGLuHmTfW','Jan','Kowalski','2024-01-02','2024-01-02 15:08:48'),(5,'USER','hanko','user+3@localhost','$2b$10$2nIWC1wcIYq3NBTmcW/jzu3wYXaQmusTZZpua1mB28sK6yG.nJOfS','Jan','Kowalski','2024-01-02','2024-01-02 15:08:48'),(6,'USER','panko','user+4@localhost','$2b$10$zTaNi/A7bgyJ.rkkum6shOLH4elnrpXbuwgAdufgMuqO6ODIuQu8W','Jan','Kowalski','2024-01-02','2024-01-02 15:08:48'),(7,'USER','manko','user+5@localhost','$2b$10$cVv5CZq3hbdpkt3K3SZo/OkMBQ0n9/.Rhn2QwYyEiKjJrIPSciziG','Jan','Kowalski','2024-01-02','2024-01-02 15:08:48');