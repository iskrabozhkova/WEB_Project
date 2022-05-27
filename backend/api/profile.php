<?php 
    require_once("../database/database.php");
    $data = json_decode(file_get_contents("php://input"), true);
    $db = new Database();
    $connection = $db->getConnection();
    session_start();

    if(isset($_SESSION['email'])){
        try {
            $sql_user = "SELECT * FROM users where email=:email";
            $stmt = $connection->prepare($sql_user);
            $stmt->execute(["email" => $_SESSION['email']]);
    
            if ($stmt->rowCount() == 1) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
               echo json_encode(["message" => array($user["username"], $user["email"],  $user["birthday"],  $user["nameday"])]);
            }
        }catch(PDOException $exc) {
            echo $exc->getMessage();
        }
    }
 ?>