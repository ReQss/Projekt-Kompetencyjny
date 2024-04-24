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

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Baza danych: `inventory`

CREATE TABLE `categories` (
                              `category_id` int(11) NOT NULL AUTO_INCREMENT,
                              `name` varchar(255) NOT NULL,

                              PRIMARY KEY (`category_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `inventory` (
                             `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT,
                             `description` varchar(255) DEFAULT NULL,
                             `item_name` varchar(255) NOT NULL,
                             `owner_id` bigint(20) DEFAULT NULL,
                             `photo` varbinary(255) DEFAULT NULL,
                             `rent_status` varchar(255) DEFAULT NULL,
                             `room` varchar(50) DEFAULT NULL,
                             `building` varchar(50) DEFAULT NULL,
                             `inventory_date` date NOT NULL DEFAULT current_timestamp(),
                             `value` decimal(20,2) DEFAULT NULL,
                             `inventory_number` varchar(50) DEFAULT NULL,
                             `invoice_number` varchar(50) DEFAULT NULL,
                             `funding_source` varchar(50) DEFAULT NULL,
                             `supplier_document` varchar(50) DEFAULT NULL,
                             `invoice_position` varchar(50) DEFAULT NULL,
                             `serial_number` varchar(50) DEFAULT NULL,
                             `category_id` int(11) NOT NULL,
                             PRIMARY KEY (`inventory_id`),
                             KEY `fk_category_id` (`category_id`),
                             CONSTRAINT `fk_inventory_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `users` (
                         `user_id` int(11) NOT NULL AUTO_INCREMENT,
                         `email` varchar(255) DEFAULT NULL,
                         `first_name` varchar(255) DEFAULT NULL,
                         `last_name` varchar(255) DEFAULT NULL,
                         `login` varchar(255) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `role` enum('USER','ADMIN') NOT NULL,
                         PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rent_history` (
                                `rent_id` int(11) NOT NULL AUTO_INCREMENT,
                                `user_id` int(11) NOT NULL,
                                `index_number` int(6) NOT NULL,
                                `rent_status` varchar(50) NOT NULL,
                                `rental_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                                `return_date` datetime(6) DEFAULT NULL,
                                `inventory_id` bigint(20) NOT NULL,
                                PRIMARY KEY (`rent_id`),
                                KEY `fk_user_id` (`user_id`),
                                KEY `fk_inventory_id` (`inventory_id`),
                                CONSTRAINT `fk_user_rent_history` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
                                CONSTRAINT `fk_inventory_rent_history` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`user_id`, `email`, `first_name`, `last_name`, `login`, `password`, `role`) VALUES
                                                                                                        (1, 'adam@o2.pl', 'Adam', 'Adamowski', 'adam', 'adam', 'USER'),
                                                                                                        (2, 'adam@o2.pl', 'Adam', 'Adamowski', 'adam', 'adam', 'USER'),
                                                                                                        (52, 'adam@o2.pl', 'Adam', 'Adamowski', 'adam', 'adam', 'USER'),
                                                                                                        (102, 'adam@o2.pl', 'Adam', 'Adamowski', 'adam', 'adam', 'USER');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
