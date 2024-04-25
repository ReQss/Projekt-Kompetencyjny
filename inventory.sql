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
    `name`        varchar(255) NOT NULL,

    PRIMARY KEY (`category_id`)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `inventory`
(
    `inventory_id`      bigint(20)   NOT NULL AUTO_INCREMENT,
    `description`       varchar(255)          DEFAULT NULL,
    `item_name`         varchar(255) NOT NULL,
    `owner_id`          bigint(20)            DEFAULT NULL,
    `photo`             varbinary(255)        DEFAULT NULL,
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
    `email`      varchar(255) UNIQUE,
    `first_name` varchar(255) DEFAULT NULL,
    `last_name`  varchar(255) DEFAULT NULL,
    `login`      varchar(255) UNIQUE,
    `password`   varchar(255)          NOT NULL,
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
    `email`           varchar(255) UNIQUE      NOT NULL,
    `rent_status`      enum ('rented','returned') NOT NULL,
    `first_name`      varchar(50) NOT NULL,
    `last_name`       varchar(50) NOT NULL,
    `rent_purpose_id` int(11)              DEFAULT NULL,
    `rental_date`     datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `return_date`     datetime(6)          DEFAULT NULL,
    `rent_description`varchar(255)         DEFAULT NULL,
    `inventory_id`    bigint(20)  NOT NULL,
    PRIMARY KEY (`rent_id`),
    KEY `fk_user_id` (`user_id`),
    KEY `fk_inventory_id` (`inventory_id`),
    CONSTRAINT `fk_user_rent_history` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `fk_inventory_rent_history` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`),
    CONSTRAINT `fk_rent_purpose` FOREIGN KEY (`rent_purpose_id`) REFERENCES `rent_purposes` (`purpose_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;



INSERT INTO `users` (`user_id`, `email`, `first_name`, `last_name`, `login`, `password`, `role`)
VALUES (1, 'adam@o2.pl', 'Adam', 'Adamowski', 'adam', 'encrypted_password', 'USER'),
       (2, 'eve@example.com', 'Eve', 'Evans', 'eve', 'encrypted_password', 'USER'),
       (52, 'bob@example.com', 'Bob', 'Builder', 'bob', 'encrypted_password', 'ADMIN'),
       (102, 'alice@example.com', 'Alice', 'Johnson', 'alice', 'encrypted_password', 'USER');
INSERT INTO categories (name)
VALUES ('Elektronika');
INSERT INTO inventory (item_name, description, owner_id, rent_status, room, building, inventory_date, value,
                       inventory_number, invoice_number, funding_source, supplier_document, invoice_position,
                       serial_number, category_id)
VALUES ('iPhone 13 Pro', 'iPhone 13 Pro, 256GB', 1, 'available', '5A', 'Building X', CURRENT_DATE, 999.99, 'INV00123',
        'INV2021001', 'Company budget', 'Apple Store', '1', 'SN123456789', 1),
       ('MacBook Pro 16-inch', 'MacBook Pro 16-inch, 2021, M1 chip', 1, 'available', '5B', 'Building Y', CURRENT_DATE,
        2499.99, 'INV00124', 'INV2021002', 'Research grant', 'Apple Store', '2', 'SN987654321', 1),
       ('Canon EOS R5', 'Canon EOS R5, 45MP full-frame mirrorless camera', 1, 'available', '5C', 'Building Z',
        CURRENT_DATE, 3899.99, 'INV00125', 'INV2021003', 'Photography department funds', 'B&H', '3', 'SN123123123', 1);
INSERT INTO `rent_purposes` (`purpose`) VALUES
                                            ('Projekt badawczy – w ramach badań wewnątrzinstytutowych'),
                                            ('Projekt badawczy – finansowanie NCBR'),
                                            ('Projekt komercyjny'),
                                            ('Dydaktyka');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
