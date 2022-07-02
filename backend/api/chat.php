<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

try 
{
  if (isset($data)) {
    $sql = 'SELECT *
            FROM user_events AS user_event
            JOIN users AS us ON us.ID=user_event.user_ID
            WHERE event_ID= ?';
    $stmt = $connection->prepare($sql);
    $stmt->execute([$data]);
    $result = $stmt->fetchAll();
    echo json_encode(["message" => $result]);
  }
}
catch (Exception $e) 
{
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
