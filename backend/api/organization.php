<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();

session_start();
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];

try 
{
  $sql = 'SELECT *
          FROM user_events AS user_event
          JOIN events AS ev ON  user_event.event_ID=ev.event_ID
          JOIN users AS us ON us.ID=ev.event_ID
          WHERE user_event.user_ID=?';
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