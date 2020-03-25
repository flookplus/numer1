<?php
    require('./severconnect.php');
    
    $N_Name = $_POST["N_Name"];
    $N_Type = $_POST["N_Type"];
    $N_Diff = $_POST["N_Diff"];

    $sql = "INSERT INTO equation (N_Name,N_Type,N_Diff) VALUES ('$N_Name','$N_Type','$N_Diff');";
   

  if($connect->query($sql) === TRUE){
        $check = array(1 => "success");
        echo json_encode($check);
  }
  else {
        $check = array(1 => "fail");
        echo json_encode($check);
  }

  $connect->close();

 ?>