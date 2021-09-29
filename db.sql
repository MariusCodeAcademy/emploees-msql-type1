-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 29, 2021 at 06:47 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `employeesDBtype1`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `salary` decimal(6,2) NOT NULL,
  `age` int(10) UNSIGNED NOT NULL,
  `experience` int(10) UNSIGNED NOT NULL,
  `sex` enum('male','female') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `salary`, `age`, `experience`, `sex`) VALUES
(1, 'James Bond', '1000.00', 35, 2, 'male'),
(2, 'John', '1200.00', 30, 3, 'male'),
(3, 'Jane Doe', '1500.00', 28, 4, 'female'),
(4, 'Erica Bell', '999.00', 25, 1, 'female'),
(5, 'Jane Brown', '2000.00', 37, 5, 'female'),
(6, 'James Bond', '2500.00', 40, 7, 'male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
