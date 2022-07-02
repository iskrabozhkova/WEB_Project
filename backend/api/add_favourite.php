<?php
require_once("../config/conf.php");
$db = new Config();
$connection = $db->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) 
{
      session_start();
      $user_id = $_SESSION["user"];
      $my_user = $user_id['ID'];
      try {
            $sql_1 = "INSERT INTO favourites (user_ID, favourite_user_ID ) VALUES (?, ?)";
            $stmt = $connection->prepare($sql_1);
            $stmt->execute([$my_user, $data]);
            if ($stmt->rowCount() > 0) {
                  $stmt->fetch(PDO::FETCH_ASSOC);
            }
      }
      catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      }
}
?>