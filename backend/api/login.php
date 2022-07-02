<?php
require_once("../config/conf.php");
$data = json_decode(file_get_contents("php://input"), true);

function login($data)
{
    try {
        $db = new Config();
        $connection = $db->getConnection();

        $email = $data["email"];
        $password = $data["password"];

        $sql = "SELECT * FROM users where email = :email";

        $stmt = $connection->prepare($sql);
        $stmt->execute(["email" => $email]);

        if ($stmt->rowCount() == 1) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!password_verify($password, $user["password"])) {
                session_start();
                $_SESSION["user"] = $user["ID"];
                return false;
            }
            else {
                return $user;
            }
        }
        else {
            return false;
        }
    }
    catch (PDOException $e) {
        throw new Exception($e->getMessage());
    }
}

if ($data && isset($data["email"]) && isset($data["password"])) {
    try {
        $db = new Config();
        $connection = $db->getConnection();
        $user = login($data);

        if ($user) {
            session_start();
            $_SESSION["user"] = $user;
            $_SESSION['email'] = $data["email"];

            $email = $data["email"];

            setcookie('email', $data['email'], time() + 600, '/');
            setcookie('password', $data['password'], time() + 600, '/');

            echo json_encode(["status" => "success"]);
        }
        else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Няма регистриран потребител с този имейл или парола!"]);
        }
    }
    catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>