-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Maj 2024, 19:01
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `inventory`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
                              `category_id` int(11) NOT NULL,
                              `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
                                                     (1, 'Elektronika'),
                                                     (2, 'Meble'),
                                                     (3, 'Czujniki');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inventory`
--

CREATE TABLE `inventory` (
                             `inventory_id` bigint(20) NOT NULL,
                             `description` varchar(2000) DEFAULT NULL,
                             `item_name` varchar(50) NOT NULL,
                             `owner_id` bigint(20) DEFAULT NULL,
                             `photo` varchar(255) DEFAULT NULL,
                             `rent_status` enum('available','unavailable') NOT NULL,
                             `room` varchar(50) DEFAULT NULL,
                             `building` varchar(50) DEFAULT NULL,
                             `inventory_date` date DEFAULT NULL,
                             `value` decimal(20,2) DEFAULT NULL,
                             `inventory_number` varchar(50) DEFAULT NULL,
                             `invoice_number` varchar(50) DEFAULT NULL,
                             `funding_source` varchar(50) DEFAULT NULL,
                             `supplier_document` varchar(50) DEFAULT NULL,
                             `invoice_position` varchar(50) DEFAULT NULL,
                             `serial_number` varchar(50) DEFAULT NULL,
                             `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `description`, `item_name`, `owner_id`, `photo`, `rent_status`, `room`, `building`, `inventory_date`, `value`, `inventory_number`, `invoice_number`, `funding_source`, `supplier_document`, `invoice_position`, `serial_number`, `category_id`) VALUES
                                                                                                                                                                                                                                                                                             (1, 'iPhone 13 Pro, 256GB', 'iPhone 13 Pro', 1, NULL, 'unavailable', '5A', 'Building X', '2024-05-08', '999.99', 'INV00123', 'INV2021001', 'Company budget', 'Apple Store', '1', 'SN123456789', 1),
                                                                                                                                                                                                                                                                                             (2, 'MacBook Pro 16-inch, 2021, M1 chip', 'MacBook Pro 16-inch', 2, NULL, 'available', '5B', 'Building Y', '2024-05-08', '2499.99', 'INV00124', 'INV2021002', 'Research grant', 'Apple Store', '2', 'SN987654321', 1),
                                                                                                                                                                                                                                                                                             (3, 'Canon EOS R5, 45MP full-frame mirrorless camera', 'Canon EOS R5', 1, NULL, 'unavailable', '6A', 'dfgd', '2024-05-08', '3899.99', 'INV00125', 'INV2021003', 'Photography department funds', 'B&H', '3', 'SN123123123', 2),
                                                                                                                                                                                                                                                                                             (4, 'Samsung Galaxy S22, 128GB, Black', 'Samsung Galaxy S22', 2, NULL, 'available', '6A', 'Building W', '2023-04-15', '799.99', 'INV00126', 'INV2022001', 'Marketing budget', 'Samsung Store', '4', 'SN5647382910', 2),
                                                                                                                                                                                                                                                                                             (5, 'Dell XPS 15, 2022, 16GB RAM, 512GB SSD', 'Dell XPS 15', 3, NULL, 'available', '6B', 'Building V', '2023-03-20', '1899.99', 'INV00127', 'INV2022002', 'IT department funds', 'Dell Direct', '5', 'SN987987987', 2),
                                                                                                                                                                                                                                                                                             (6, 'GoPro HERO9 Black, 5K Video, 20MP Photos', 'GoPro HERO9', 2, NULL, 'available', '6C', 'Building U', '2022-12-01', '399.99', 'INV00128', 'INV2022003', 'Sports department budget', 'Best Buy', '6', 'SN1010101010', 2),
                                                                                                                                                                                                                                                                                             (7, 'Oculus Quest 2, Advanced All-In-One Virtual Reality Headset, 256GB', 'Oculus Quest 2', 3, NULL, 'available', '7A', 'Building T', '2022-11-15', '299.99', 'INV00129', 'INV2022004', 'Gaming and VR lab', 'Amazon', '7', 'SN2020202020', 3),
                                                                                                                                                                                                                                                                                             (8, 'Sony A7 IV, Full Frame Mirrorless Interchangeable Lens Camera with 33MP resolution, 10 fps continuous shooting, Advanced autofocus', 'Sony A7 IV', 1, NULL, 'available', '7B', 'Building S', '2023-02-28', '2499.99', 'INV00130', 'INV2022005', 'Photography department funds', 'Sony Center', '8', 'SN3030303030', 1),
                                                                                                                                                                                                                                                                                             (9, 'Asus ROG Zephyrus G14, 2021, Ryzen 9, 1TB SSD, RTX 3060', 'Asus ROG Zephyrus G14', 3, NULL, 'available', '7C', 'Building R', '2023-01-10', '1450.99', 'INV00131', 'INV2022006', 'Computer science department', 'Asus Store', '9', 'SN4040404040', 3),
                                                                                                                                                                                                                                                                                             (10, 'Microsoft Surface Pro 7, Intel Core i7, 16GB RAM, 256GB SSD, Platinum', 'Microsoft Surface Pro 7', 3, NULL, 'available', '8A', 'Building Q', '2022-10-05', '1199.99', 'INV00132', 'INV2022007', 'Management budget', 'Microsoft Store', '10', 'SN5050505050', 3),
                                                                                                                                                                                                                                                                                             (11, 'Nikon Z7, Full-Frame Mirrorless Camera, 45.7MP, 9 fps', 'Nikon Z7', 1, NULL, 'available', '8B', 'Building P', '2022-09-22', '3399.99', 'INV00133', 'INV2022008', 'Photography department funds', 'Nikon Center', '11', 'SN6060606060', 3),
                                                                                                                                                                                                                                                                                             (12, 'iPad Pro 12.9-inch, 2022, M2 chip, 256GB Storage, Space Gray', 'iPad Pro 12.9-inch', 2, NULL, 'available', '8C', 'Building O', '2023-04-01', '1099.99', 'INV00134', 'INV2022009', 'Design team budget', 'Apple Store', '12', 'SN7070707070', 2),
                                                                                                                                                                                                                                                                                             (13, 'HP Spectre x360 14, Touchscreen, i7, 1TB SSD, OLED display', 'HP Spectre x360', 2, NULL, 'available', '9A', 'Building N', '2023-01-30', '1650.99', 'INV00135', 'INV2022010', 'Software development funds', 'HP Store', '13', 'SN8080808080', 1),
                                                                                                                                                                                                                                                                                             (14, 'Tesla Wall Connector, High-powered charging accessory for Tesla vehicles, supports up to 48 amps of power', 'Tesla Wall Connector', 1, NULL, 'available', '9B', 'Building M', '2022-08-15', '550.00', 'INV00136', 'INV2022011', 'Companys green initiatives budget', 'Tesla Direct', '14', 'SN9090909090', 1);

--
-- Wyzwalacze `inventory`
--
DELIMITER $$
CREATE TRIGGER `after_update_rent_status` AFTER UPDATE ON `inventory` FOR EACH ROW IF NEW.rent_status = 'available' THEN
    UPDATE rent_history
    SET rent_status = 'returned'
    WHERE inventory_id = NEW.inventory_id;
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rent_history`
--

CREATE TABLE `rent_history` (
                                `rent_id` int(11) NOT NULL,
                                `user_id` int(11) NOT NULL,
                                `email` varchar(50) NOT NULL,
                                `rent_status` enum('rented','returned') NOT NULL,
                                `first_name` varchar(50) NOT NULL,
                                `last_name` varchar(50) NOT NULL,
                                `rent_purpose_id` int(11) DEFAULT NULL,
                                `rental_date` datetime NOT NULL DEFAULT current_timestamp(),
                                `return_date` datetime DEFAULT NULL,
                                `rent_description` varchar(2000) DEFAULT NULL,
                                `inventory_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `rent_history`
--

INSERT INTO `rent_history` (`rent_id`, `user_id`, `email`, `rent_status`, `first_name`, `last_name`, `rent_purpose_id`, `rental_date`, `return_date`, `rent_description`, `inventory_id`) VALUES
                                                                                                                                                                                              (1, 2, '240647@edu.p.lodz.pl', 'returned', 'Mikolaj', 'Czechowski', 1, '2023-05-01 10:00:00', NULL, 'Badania nad nowym algorytmem', 1),
                                                                                                                                                                                              (2, 1, '240666@edu.p.lodz.pl', 'rented', 'Jacob', 'Ruchaczow', 2, '2023-04-15 09:30:00', '2023-04-22 10:00:00', 'Testowanie oprogramowania VR', 2),
                                                                                                                                                                                              (3, 2, '240647@edu.p.lodz.pl', 'returned', 'lukaszenko', 'ledzion', 3, '2023-03-10 12:00:00', '2023-03-15 15:00:00', 'Prace nad projektem komercyjnym', 3),
                                                                                                                                                                                              (4, 2, '240647@edu.p.lodz.pl', 'returned', 'lukaszenko', 'ledzion', 4, '2023-01-01 11:00:00', '2023-01-10 12:00:00', 'Wykłady z designu', 4),
                                                                                                                                                                                              (5, 1, '240666@edu.p.lodz.pl', 'rented', 'Jacob', 'Ruchaczow', 1, '2023-04-01 10:00:00', '2023-04-30 11:00:00', 'Badania terenowe', 5),
                                                                                                                                                                                              (6, 3, '240666@edu.p.lodz.pl', 'returned', 'Jacob', 'Ruchaczow', 2, '2023-02-20 14:00:00', '2023-02-27 14:00:00', 'Projekt NCBR', 6),
                                                                                                                                                                                              (7, 2, '240647@edu.p.lodz.pl', 'rented', 'Mikolaj', 'Czechowski', 3, '2023-03-20 09:00:00', NULL, 'Rozwój nowych technologii VR', 7),
                                                                                                                                                                                              (8, 1, '240666@edu.p.lodz.pl', 'rented', 'lukaszenko', 'ledzion', 4, '2023-02-25 10:00:00', '2023-03-03 11:00:00', 'Seminarium z technologii informacyjnych', 8),
                                                                                                                                                                                              (9, 3, '240647@edu.p.lodz.pl', 'returned', 'Mikolaj', 'Czechowski', 1, '2022-12-05 15:30:00', '2023-01-05 16:30:00', 'Badania w dziedzinie AI', 9),
                                                                                                                                                                                              (10, 3, '240647@edu.p.lodz.pl', 'rented', 'Mikolaj', 'Czechowski', 2, '2023-04-20 08:00:00', NULL, 'Prace projektowe', 10),
                                                                                                                                                                                              (11, 1, '240666@edu.p.lodz.pl', 'rented', 'lukaszenko', 'ledzion', 4, '2023-02-01 13:00:00', '2023-03-01 14:00:00', 'Materiały do kursu online', 11),
                                                                                                                                                                                              (12, 3, '240666@edu.p.lodz.pl', 'returned', 'Jacob', 'Ruchaczow', 1, '2023-01-10 09:00:00', '2023-01-17 10:00:00', 'Zdjęcia do projektu badawczego', 12);

--
-- Wyzwalacze `rent_history`
--
DELIMITER $$
CREATE TRIGGER `after_rent_insert` AFTER INSERT ON `rent_history` FOR EACH ROW IF NEW.rent_status = 'rented' THEN
    UPDATE inventory
    SET rent_status = 'unavailable'
    WHERE inventory_id = NEW.inventory_id;
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rent_purposes`
--

CREATE TABLE `rent_purposes` (
                                 `purpose_id` int(11) NOT NULL,
                                 `purpose` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `rent_purposes`
--

INSERT INTO `rent_purposes` (`purpose_id`, `purpose`) VALUES
                                                          (1, 'Projekt badawczy – w ramach badań wewnątrzinstytutowych'),
                                                          (2, 'Projekt badawczy – finansowanie NCBR'),
                                                          (3, 'Projekt komercyjny'),
                                                          (4, 'Dydaktyka');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
                         `user_id` int(11) NOT NULL,
                         `email` varchar(50) DEFAULT NULL,
                         `first_name` varchar(50) DEFAULT NULL,
                         `last_name` varchar(50) DEFAULT NULL,
                         `login` varchar(50) DEFAULT NULL,
                         `password` varchar(50) NOT NULL,
                         `role` enum('USER','ADMIN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `email`, `first_name`, `last_name`, `login`, `password`, `role`) VALUES
                                                                                                     (1, '240647@edu.p.lodz.pl', 'mikolaj', 'czechowski', '240647@edu.p.lodz.pl', 'qwerty', 'ADMIN'),
                                                                                                     (2, '240666@edu.p.lodz.pl', 'jacob', 'ruchaczow', '240666@edu.p.lodz.pl', 'qwerty123', 'USER'),
                                                                                                     (3, '240634@edu.p.lodz.pl', 'lukaszenko', 'ledzion', '240634@edu.p.lodz.pl', 'qwerty1234', 'USER');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
    ADD PRIMARY KEY (`category_id`);

--
-- Indeksy dla tabeli `inventory`
--
ALTER TABLE `inventory`
    ADD PRIMARY KEY (`inventory_id`),
    ADD KEY `fk_category_id` (`category_id`);

--
-- Indeksy dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
    ADD PRIMARY KEY (`rent_id`),
    ADD KEY `fk_user_id` (`user_id`),
    ADD KEY `fk_inventory_id` (`inventory_id`),
    ADD KEY `fk_rent_purpose` (`rent_purpose_id`);

--
-- Indeksy dla tabeli `rent_purposes`
--
ALTER TABLE `rent_purposes`
    ADD PRIMARY KEY (`purpose_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `email` (`email`),
    ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
    MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `inventory`
--
ALTER TABLE `inventory`
    MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
    MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `rent_purposes`
--
ALTER TABLE `rent_purposes`
    MODIFY `purpose_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `inventory`
--
ALTER TABLE `inventory`
    ADD CONSTRAINT `fk_inventory_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Ograniczenia dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
    ADD CONSTRAINT `fk_inventory_rent_history` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`) ON DELETE CASCADE,
    ADD CONSTRAINT `fk_rent_purpose` FOREIGN KEY (`rent_purpose_id`) REFERENCES `rent_purposes` (`purpose_id`),
    ADD CONSTRAINT `fk_user_rent_history` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
