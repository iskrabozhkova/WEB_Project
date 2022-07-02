<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$userID = json_decode(file_get_contents("php://input"), true);

try 
{
  if (isset($userID)) {
    $sql = "INSERT INTO events (event_ID) VALUES (?)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$userID]);
    if ($stmt->rowCount() > 0) {
      $stmt->fetch(PDO::FETCH_ASSOC);
    }

    session_start();
    $_SESSION['user_id'] = $userID;
    header("location: add_users.php");
    exit;
  }
}
catch (Exception $e) 
{
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>