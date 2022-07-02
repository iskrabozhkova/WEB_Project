<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$data_event = json_decode(file_get_contents("php://input"), true);

$content = $data_event["comment"];
$ev_id = $data_event["id"];
session_start();
$user_id = $_SESSION["user"];
$my_user = $user_id['ID'];

try 
{
  if (isset($data_event)) {
    $sql = "INSERT INTO comments (username_id, event_id, content) VALUES (?,?,?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$my_user, $ev_id, $content]);
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
 