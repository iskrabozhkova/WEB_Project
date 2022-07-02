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
          FROM users
          WHERE ID !=' . $my_user . ' AND ID  NOT IN (SELECT favourite_user_ID
                                                  FROM  favourites AS fav
                                                  WHERE fav.user_ID=?)';
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