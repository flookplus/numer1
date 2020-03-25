<?php
  header("Access-Control-Allow-Origin:http://localhost:3000");
  
  // ///Docker/////
  // $hostname = "database";
  // $username = "root";
  // $password = "1111";
  // $dbname = "numer";
  // ///Docker/////
  $hostname = "localhost";
  $username = "root";
  $password = "";
  $dbname = "numer";

  $connect = new mysqli($hostname,$username,$password,$dbname);

  if($connect->connect_error)
  {
    die("Connect Failed : " .$connect->connect_error);
  }
  // echo "Connect Successfully !!";
 ?>