<?php
require_once("../config/conf.php");
$db = new Config();

$data = json_decode(file_get_contents("php://input"), true);
$connection = $db->getConnection();

session_start();
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];

try 
{
    if (isset($data)) {
        $sql = "SELECT * 
                FROM users
                WHERE ID != ? AND ID !=?";

        $stmt = $connection->prepare($sql);
        $stmt->execute([$data, $my_user]);
        $result = $stmt->fetchAll();
        echo json_encode($result);
    }
}
catch (Exception $e) 
{
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>