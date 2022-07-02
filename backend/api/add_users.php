<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

session_start();
$my_event_id = $_SESSION['user_id'];
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];

try 
{
  if (isset($data)) {
    if ($data != 0) {
      $sql_1 = "INSERT INTO user_events (user_ID, event_ID) VALUES (?, ?)";
      $stmt = $connection->prepare($sql_1);
      $stmt->execute([$data, $my_event_id]);
      if ($stmt->rowCount() > 0) {
        $stmt->fetch(PDO::FETCH_ASSOC);
      }
    }
  }
  else {
    $sql_1 = "INSERT INTO user_events (user_ID, event_ID) VALUES (?, ?)";
    $stmt = $connection->prepare($sql_1);
    $stmt->execute([$my_user, $my_event_id]);
    if ($stmt->rowCount() > 0) {
      $stmt->fetch(PDO::FETCH_ASSOC);
    }
  }
}
catch (Exception $e) 
{
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>