<?php
    require_once("../database/database.php");

    $db = new Database();
    $connection = $db->getConnection();
    $sql = "SELECT * FROM users";
    $result=$connection->query($sql)->fetchAll();
    echo json_encode($result);
    // foreach ($result as $user) {
    //     echo json_encode($user['username']);
    //    // echo json_encode(["status" => "success", "message" => "Регистрацията е успешна"]);
    // }       
?>