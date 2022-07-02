-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 03:50 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comments_id` int(11) NOT NULL,
  `username_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `content` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comments_id`, `username_id`, `event_id`, `content`) VALUES
(29, 5, 7, 'Какви идеи имате за подарък ?'),
(30, 5, 15, 'Искате ли да направим парти изненада ;)'),
(31, 6, 7, 'Може да вземем билет за театър, ако сте съгласни');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_ID`) VALUES
(7),
(15);

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `user_ID` int(20) NOT NULL,
  `favourite_user_ID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`user_ID`, `favourite_user_ID`) VALUES
(5, 7),
(5, 15),
(5, 16),
(6, 7),
(6, 15),
(6, 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(20) NOT NULL,
  `username` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `birthday` date NOT NULL,
  `nameday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `email`, `password`, `birthday`, `nameday`) VALUES
(5, 'Марина', 'marina@abv.bg', '$2y$10$V0JNl6Axf9bNdvP1BSunJeQZaUhwk4jSoQUFbk6Br38eIOM4f9bd2', '2022-05-20', '2022-04-28'),
(6, 'Иван', 'ivan@abv.bg', '$2y$10$lgqbkexPdOEkYh9EiP4HjOsRu.GQHv0ucWn060zDHaobq2Xzut98O', '2022-05-11', '2022-04-30'),
(7, 'Симона', 'simon@abv.bg', '$2y$10$lR1uLcjr1407MIHP4xQyeO7Zw2THijW9cGYoE3Dj58mr8QtQZyXpe', '2022-05-27', '2022-05-11'),
(15, 'Виктор', 'viktor@gmail.com', '$2y$10$0vO.F0TzveMYerb5RLdDfuRfXHiolnRPpeMknCe9FwFaT.gyQxgtq', '2022-06-17', '2022-06-13'),
(16, 'Галина', 'galina@gmail.com', '$2y$10$EmRJfiIWFtDEByhLGp0Wu.u0OLhNXKEIRO.RMriokurxQpglduZf.', '2022-06-26', '2022-06-13'),
(17, 'Георги', 'georgi@abv.bg', '$2y$10$Jp.tQit7bq/IBeBBnh8pVeajSONjupJ38ALwxKsCeacXAxgnUoN0W', '2022-06-27', '2022-06-17'),
(19, 'Павел', 'pavel@gmail.com', '$2y$10$HbEocADeny.zzFgqP4MFRO6v9/l13ZhG/e7bU0o9qiisk1HdYnrE.', '2022-06-19', '2022-06-27');

-- --------------------------------------------------------

--
-- Table structure for table `user_events`
--

CREATE TABLE `user_events` (
  `user_ID` int(20) NOT NULL,
  `event_ID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_events`
--

INSERT INTO `user_events` (`user_ID`, `event_ID`) VALUES
(5, 7),
(5, 15),
(6, 7),
(7, 15),
(16, 7),
(16, 15),
(17, 7),
(17, 15),
(19, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comments_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `username_id` (`username_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_ID`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`user_ID`,`favourite_user_ID`),
  ADD KEY `favourite_user_ID` (`favourite_user_ID`) USING BTREE,
  ADD KEY `user_ID` (`user_ID`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_events`
--
ALTER TABLE `user_events`
  ADD PRIMARY KEY (`user_ID`,`event_ID`),
  ADD KEY `event_ID` (`event_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comments_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `favourite_user_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
