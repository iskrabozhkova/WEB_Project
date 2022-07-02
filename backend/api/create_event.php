<?php
require_once("../config/conf.php");
$db = new Config();

session_start();
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];
$connection = $db->getConnection();

try 
{
    $sql = 'SELECT * 
            FROM users
            LEFT JOIN events ON event_ID=ID
            WHERE event_ID IS NULL AND ID != ?';
    $stmt = $connection->prepare($sql);
    $stmt->execute([$my_user]);
    $result = $stmt->fetchAll();
    echo json_encode($result);
}
catch (Exception $e) 
{
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>