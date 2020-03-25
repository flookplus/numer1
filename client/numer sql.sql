-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2020 at 01:48 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `numer`
--

-- --------------------------------------------------------

--
-- Table structure for table `equation`
--

CREATE TABLE `equation` (
  `N_No` int(11) NOT NULL,
  `N_Name` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `N_Type` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `N_Diff` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equation`
--

INSERT INTO `equation` (`N_No`, `N_Name`, `N_Type`, `N_Diff`) VALUES
(0, '(x+5)+5', 'Bisection', ''),
(1, 'x^3-2x-5', 'Bisection', ''),
(2, 'x^4-13', 'Bisection', ''),
(3, '(x+1)+5-1', 'FalsePosition', ''),
(4, 'x^3-5', 'FalsePosition', ''),
(5, '1/x-43', 'FalsePosition', ''),
(6, '(x-5)+6', 'OnePoint', ''),
(7, '(x-5)+2', 'OnePoint', ''),
(8, 'x^2-x+1/4', 'OnePoint', ''),
(9, 'x^2-4', 'NewtonRaphson', 'x'),
(10, '(x+7)-8', 'NewtonRaphson', '2x+1'),
(11, 'x^2+2x-1', 'NewtonRaphson', 'x'),
(12, 'x^3-6*x-2', 'Secant', ''),
(13, 'x^3-6x-2', 'Secant', ''),
(14, 'x^3+4x-6', 'Secant', '');

-- --------------------------------------------------------

--
-- Table structure for table `สมาการ`
--

CREATE TABLE `สมาการ` (
  `ื์N_No` int(10) NOT NULL,
  `N_Name` text NOT NULL,
  `N_Type` varchar(10) NOT NULL,
  `N_Diff` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `สมาการ`
--

INSERT INTO `สมาการ` (`ื์N_No`, `N_Name`, `N_Type`, `N_Diff`) VALUES
(1, '(x^2)-(3*x)+3', 'Bisection', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equation`
--
ALTER TABLE `equation`
  ADD PRIMARY KEY (`N_No`);

--
-- Indexes for table `สมาการ`
--
ALTER TABLE `สมาการ`
  ADD PRIMARY KEY (`ื์N_No`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
