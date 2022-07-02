<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();

session_start();
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];

try 
{
        $sql = "SELECT *
                FROM favourites AS fav
                JOIN users AS us ON  fav.favourite_user_ID=us.ID
                LEFT JOIN user_events AS ev ON ev.event_ID=fav.favourite_user_ID
                WHERE ev.event_ID IS NULL AND fav.user_ID=?";
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
