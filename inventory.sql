-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Kwi 2024, 22:38
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Baza danych: `inventory`

CREATE TABLE `categories`
(
    `category_id` int(11)      NOT NULL AUTO_INCREMENT,
    `name`        varchar(50) NOT NULL,

    PRIMARY KEY (`category_id`)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `inventory`
(
    `inventory_id`      bigint(20)   NOT NULL AUTO_INCREMENT,
    `description`       varchar(2000)          DEFAULT NULL,
    `item_name`         varchar(50) NOT NULL,
    `owner_id`          bigint(20)            DEFAULT NULL,
    `photo`             varchar(255)        DEFAULT NULL,
    `rent_status`       enum ('available','unavailable') NOT NULL,
    `room`              varchar(50)           DEFAULT NULL,
    `building`          varchar(50)           DEFAULT NULL,
    `inventory_date`    datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `value`             decimal(20, 2)        DEFAULT NULL,
    `inventory_number`  varchar(50)           DEFAULT NULL,
    `invoice_number`    varchar(50)           DEFAULT NULL,
    `funding_source`    varchar(50)           DEFAULT NULL,
    `supplier_document` varchar(50)           DEFAULT NULL,
    `invoice_position`  varchar(50)           DEFAULT NULL,
    `serial_number`     varchar(50)           DEFAULT NULL,
    `category_id`       int(11)      NOT NULL,
    PRIMARY KEY (`inventory_id`),
    KEY `fk_category_id` (`category_id`),
    CONSTRAINT `fk_inventory_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


CREATE TABLE `users`
(
    `user_id`    int(11)               NOT NULL AUTO_INCREMENT,
    `email`      varchar(50) UNIQUE,
    `first_name` varchar(50) DEFAULT NULL,
    `last_name`  varchar(50) DEFAULT NULL,
    `login`      varchar(50) UNIQUE,
    `password`   varchar(50)          NOT NULL,
    `role`       enum ('USER','ADMIN') NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
CREATE TABLE `rent_purposes`
(
    `purpose_id` int(11)      NOT NULL AUTO_INCREMENT,
    `purpose`    varchar(255) NOT NULL,
    PRIMARY KEY (`purpose_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `rent_history`
(
    `rent_id`         int(11)     NOT NULL AUTO_INCREMENT,
    `user_id`         int(11)     NOT NULL,
    `email`           varchar(50)       NOT NULL,
    `rent_status`      enum ('rented','returned') NOT NULL,
    `first_name`      varchar(50) NOT NULL,
    `last_name`       varchar(50) NOT NULL,
    `rent_purpose_id` int(11)              DEFAULT NULL,
    `rental_date`     datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `return_date`     datetime(6)          DEFAULT NULL,
    `rent_description`varchar(2000)         DEFAULT NULL,
    `inventory_id`    bigint(20)  NOT NULL,
    PRIMARY KEY (`rent_id`),
    KEY `fk_user_id` (`user_id`),
    KEY `fk_inventory_id` (`inventory_id`),
    CONSTRAINT `fk_user_rent_history` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_inventory_rent_history` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_rent_purpose` FOREIGN KEY (`rent_purpose_id`) REFERENCES `rent_purposes` (`purpose_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;



 -- przykladowe kategorie
INSERT INTO categories (name)
VALUES ('Elektronika'),('Meble'),('Czujniki');

 -- przykladowe przedmioty do wypozyczenika
INSERT INTO inventory (item_name, description, owner_id, rent_status, room, building, inventory_date, value,
                       inventory_number, invoice_number, funding_source, supplier_document, invoice_position,
                       serial_number, category_id)
VALUES ('iPhone 13 Pro', 'iPhone 13 Pro, 256GB', 1, 'available', '5A', 'Building X', CURRENT_DATE, 999.99, 'INV00123',
        'INV2021001', 'Company budget', 'Apple Store', '1', 'SN123456789', 1),
       ('MacBook Pro 16-inch', 'MacBook Pro 16-inch, 2021, M1 chip', 2, 'available', '5B', 'Building Y', CURRENT_DATE,
        2499.99, 'INV00124', 'INV2021002', 'Research grant', 'Apple Store', '2', 'SN987654321', 1),
       ('Canon EOS R5', 'Canon EOS R5, 45MP full-frame mirrorless camera', 1, 'available', '5C', 'Building Z',
        CURRENT_DATE, 3899.99, 'INV00125', 'INV2021003', 'Photography department funds', 'B&H', '3', 'SN123123123', 1),
        ('Samsung Galaxy S22', 'Samsung Galaxy S22, 128GB, Black', 2, 'available', '6A', 'Building W', '2023-04-15', 799.99, 'INV00126', 'INV2022001', 'Marketing budget', 'Samsung Store', '4', 'SN5647382910', 2),
       ('Dell XPS 15', 'Dell XPS 15, 2022, 16GB RAM, 512GB SSD', 3, 'available', '6B', 'Building V', '2023-03-20', 1899.99, 'INV00127', 'INV2022002', 'IT department funds', 'Dell Direct', '5', 'SN987987987', 2),
       ('GoPro HERO9', 'GoPro HERO9 Black, 5K Video, 20MP Photos', 2, 'available', '6C', 'Building U', '2022-12-01', 399.99, 'INV00128', 'INV2022003', 'Sports department budget', 'Best Buy', '6', 'SN1010101010', 2),
       ('Oculus Quest 2', 'Oculus Quest 2, Advanced All-In-One Virtual Reality Headset, 256GB', 3, 'available', '7A', 'Building T', '2022-11-15', 299.99, 'INV00129', 'INV2022004', 'Gaming and VR lab', 'Amazon', '7', 'SN2020202020', 3),
       ('Sony A7 IV', 'Sony A7 IV, Full Frame Mirrorless Interchangeable Lens Camera with 33MP resolution, 10 fps continuous shooting, Advanced autofocus', 1, 'available', '7B', 'Building S', '2023-02-28', 2499.99, 'INV00130', 'INV2022005', 'Photography department funds', 'Sony Center', '8', 'SN3030303030', 1),
       ('Asus ROG Zephyrus G14', 'Asus ROG Zephyrus G14, 2021, Ryzen 9, 1TB SSD, RTX 3060', 3, 'available', '7C', 'Building R', '2023-01-10', 1450.99, 'INV00131', 'INV2022006', 'Computer science department', 'Asus Store', '9', 'SN4040404040', 3),
       ('Microsoft Surface Pro 7', 'Microsoft Surface Pro 7, Intel Core i7, 16GB RAM, 256GB SSD, Platinum', 3, 'available', '8A', 'Building Q', '2022-10-05', 1199.99, 'INV00132', 'INV2022007', 'Management budget', 'Microsoft Store', '10', 'SN5050505050',3),
       ('Nikon Z7', 'Nikon Z7, Full-Frame Mirrorless Camera, 45.7MP, 9 fps', 1, 'available', '8B', 'Building P', '2022-09-22', 3399.99, 'INV00133', 'INV2022008', 'Photography department funds', 'Nikon Center', '11', 'SN6060606060', 3),
       ('iPad Pro 12.9-inch', 'iPad Pro 12.9-inch, 2022, M2 chip, 256GB Storage, Space Gray', 2, 'available', '8C', 'Building O', '2023-04-01', 1099.99, 'INV00134', 'INV2022009', 'Design team budget', 'Apple Store', '12', 'SN7070707070', 2),
       ('HP Spectre x360', 'HP Spectre x360 14, Touchscreen, i7, 1TB SSD, OLED display', 2, 'available', '9A', 'Building N', '2023-01-30', 1650.99, 'INV00135', 'INV2022010', 'Software development funds', 'HP Store', '13', 'SN8080808080', 1),
       ('Tesla Wall Connector', 'Tesla Wall Connector, High-powered charging accessory for Tesla vehicles, supports up to 48 amps of power', 1, 'available', '9B', 'Building M', '2022-08-15', 550.00, 'INV00136', 'INV2022011', 'Companys green initiatives budget', 'Tesla Direct', '14', 'SN9090909090', 1);


-- tutaj macie przykladowe powody wypozyczenia
INSERT INTO `rent_purposes` (`purpose`) VALUES
                                            ('Projekt badawczy – w ramach badań wewnątrzinstytutowych'),
                                            ('Projekt badawczy – finansowanie NCBR'),
                                            ('Projekt komercyjny'),
                                            ('Dydaktyka');
-- tutaj macie przykladowych userow
insert into  `users`(email, first_name, last_name, login, password, role)  Values ('240647@edu.p.lodz.pl','mikolaj','czechowski','240647@edu.p.lodz.pl','qwerty','ADMIN'),
                                                                                  ('240666@edu.p.lodz.pl','jacob','ruchaczow','240666@edu.p.lodz.pl','qwerty123','USER'),
('240634@edu.p.lodz.pl','lukaszenko','ledzion','240634@edu.p.lodz.pl','qwerty1234','USER');

-- przykladowa historia wypozyczen
INSERT INTO `rent_history` (user_id, email, rent_status, first_name, last_name, rent_purpose_id, rental_date, return_date, rent_description, inventory_id)
VALUES
    (2, '240647@edu.p.lodz.pl', 'rented', 'Mikolaj', 'Czechowski', 1, '2023-05-01 10:00:00', NULL, 'Badania nad nowym algorytmem', 1),
    (1, '240666@edu.p.lodz.pl', 'rented', 'Jacob', 'Ruchaczow', 2, '2023-04-15 09:30:00', '2023-04-22 10:00:00', 'Testowanie oprogramowania VR', 2),
    (2, '240647@edu.p.lodz.pl', 'returned', 'lukaszenko', 'ledzion', 3, '2023-03-10 12:00:00', '2023-03-15 15:00:00', 'Prace nad projektem komercyjnym', 3),
    (2, '240647@edu.p.lodz.pl', 'returned', 'lukaszenko', 'ledzion', 4, '2023-01-01 11:00:00', '2023-01-10 12:00:00', 'Wykłady z designu', 4),
    (1, '240666@edu.p.lodz.pl', 'rented', 'Jacob', 'Ruchaczow', 1, '2023-04-01 10:00:00', '2023-04-30 11:00:00', 'Badania terenowe', 5),
    (3, '240666@edu.p.lodz.pl', 'returned', 'Jacob', 'Ruchaczow', 2, '2023-02-20 14:00:00', '2023-02-27 14:00:00', 'Projekt NCBR', 6),
    (2, '240647@edu.p.lodz.pl', 'rented', 'Mikolaj', 'Czechowski', 3, '2023-03-20 09:00:00', NULL, 'Rozwój nowych technologii VR', 7),
    (1, '240666@edu.p.lodz.pl', 'rented', 'lukaszenko', 'ledzion', 4, '2023-02-25 10:00:00', '2023-03-03 11:00:00', 'Seminarium z technologii informacyjnych', 8),
    (3, '240647@edu.p.lodz.pl', 'returned', 'Mikolaj', 'Czechowski', 1, '2022-12-05 15:30:00', '2023-01-05 16:30:00', 'Badania w dziedzinie AI', 9),
    (3, '240647@edu.p.lodz.pl', 'rented', 'Mikolaj', 'Czechowski', 2, '2023-04-20 08:00:00', NULL, 'Prace projektowe', 10),
    (1, '240666@edu.p.lodz.pl', 'rented', 'lukaszenko', 'ledzion', 4, '2023-02-01 13:00:00', '2023-03-01 14:00:00', 'Materiały do kursu online', 11),
    (3, '240666@edu.p.lodz.pl', 'returned', 'Jacob', 'Ruchaczow', 1, '2023-01-10 09:00:00', '2023-01-17 10:00:00', 'Zdjęcia do projektu badawczego', 12);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
