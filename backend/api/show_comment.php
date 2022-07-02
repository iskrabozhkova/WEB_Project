<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

try 
{
  if (isset($data)) {
    $sql = 'SELECT us.username, com.content
           FROM comments AS com
           JOIN users AS us ON us.ID=com.username_id
           WHERE com.event_id=?';
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