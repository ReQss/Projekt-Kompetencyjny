-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Kwi 2024, 23:45
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `rentaldatabase`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inventory`
--

CREATE TABLE `inventory` (
  `Item_ID` int(11) NOT NULL,
  `Item_Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Photo` longblob DEFAULT NULL,
  `Sala` varchar(50) DEFAULT NULL,
  `Owner_ID` int(11) NOT NULL,
  `Rent_Status` varchar(50) NOT NULL DEFAULT 'dostepny'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rent_history`
--

CREATE TABLE `rent_history` (
  `Rent_ID` int(11) NOT NULL,
  `Rental_Date` datetime NOT NULL,
  `Return_Date` datetime NOT NULL,
  `Item_ID` int(11) NOT NULL,
  `Numer_indeksu` int(11) NOT NULL,
  `Name_Of_The_Borrower` varchar(255) NOT NULL,
  `Rent_Status` varchar(50) NOT NULL DEFAULT 'niezwrócony'
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
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------


--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`Item_ID`),
  ADD KEY `fk_owner` (`Owner_ID`);

--
-- Indeksy dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  ADD PRIMARY KEY (`Rent_ID`),
  ADD KEY `fk_item` (`Item_ID`);

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
  MODIFY `Item_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  MODIFY `Rent_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`Owner_ID`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `rent_history`
--
ALTER TABLE `rent_history`
  ADD CONSTRAINT `fk_item` FOREIGN KEY (`Item_ID`) REFERENCES `inventory` (`Item_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
