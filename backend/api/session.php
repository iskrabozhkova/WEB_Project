<?php
    //  require_once("../database/database.php");
    //  $db = new Database();
     $connection = mysqli_connect("localhost","root","","project");
     session_start();
     $email=$_SESSION['email'];

     $ses_sql = mysqli_query( $connection,'SELECT email from users WHERE email="$email"');
     $row=mysqli_fetch_assoc($ses_sql);
     $login_session=$row['email'];

    //  if(!isset($login_session)){
    //      mysqli_close($connection);
    //      header('Location: login.php');
    //  }

?>