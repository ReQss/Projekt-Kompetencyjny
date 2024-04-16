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

--
-- Baza danych: `inventory`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inventory`
--

CREATE TABLE `inventory` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  `photo` varbinary(255) DEFAULT NULL,
  `rent_status` varchar(255) DEFAULT NULL,
  `sala` varchar(50) DEFAULT NULL,
  `Building` varchar(50) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Value` decimal(20,2) DEFAULT NULL,
  `Nr inwnetarz` varchar(50) DEFAULT NULL,
  `Nr faktury` varchar(50) DEFAULT NULL,
  `zrodlo_finansowania/projekt` varchar(50) DEFAULT NULL,
  `dostawca/dokument` varchar(50) DEFAULT NULL,
  `pozycja_faktury` varchar(50) DEFAULT NULL,
  `SN serial number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rent_history`
--

CREATE TABLE `rent_history` (
  `rent_id` int(11) NOT NULL,
  `name_of_the_borrower` varchar(255) NOT NULL,
  `numer_indeksu` int(11) NOT NULL,
  `rent_status` varchar(50) NOT NULL,
  `rental_date` datetime(6) NOT NULL,
  `return_date` datetime(6) NOT NULL,
  `item_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('USER','ADMIN') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `fname`, `lname`, `login`, `password`, `role`) VALUES
(1, 'adam@o2.pl', 'adam', 'adamowski', 'adam', 'adam', 'USER'),
(2, 'adam@o2.pl', 'adam', 'adamowski', 'adam', 'adam', 'USER'),
(52, 'adam@o2.pl', 'adam', 'adamowski', 'adam', 'adam', 'USER'),
(102, 'adam@o2.pl', 'adam', 'adamowski', 'adam', 'adam', 'USER');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_seq`
--

CREATE TABLE `users_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users_seq`
--

INSERT INTO `users_seq` (`next_val`) VALUES
(201);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  ADD PRIMARY KEY (`rent_id`),
  ADD KEY `FK4ai6fwp0w6p144mr6i1qf1y3v` (`item_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  ADD CONSTRAINT `FK4ai6fwp0w6p144mr6i1qf1y3v` FOREIGN KEY (`item_id`) REFERENCES `inventory` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
