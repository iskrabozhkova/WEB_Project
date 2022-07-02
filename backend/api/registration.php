<?php
require_once("../config/conf.php");

function checkData($userData)
{
    if (!isset($userData["email"]) || !isset($userData["password"]) || !isset($userData["username"]) || !isset($userData["birthday"]) || !isset($userData["nameday"])) {
        return ["isValid" => false, "message" => "Данните не са попълнени!"];
    }
    if (strlen($userData["password"]) <= 5) {
        return ["isValid" => false, "message" => "Паролата трябва да бъде поне 5 символа!"];
    }

    $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
    if (!preg_match($regex, $userData["email"])) {
        return ["isValid" => false, "message" => "Некоректен имейл!"];
    }

    $db = new Config();
    $connection = $db->getConnection();
    $username = $userData["username"];
    $email = $userData["email"];

    $stmt = $connection->prepare("SELECT * FROM users WHERE username=?");
    $stmt_email = $connection->prepare("SELECT * FROM users WHERE email=?");

    $stmt->execute([$username]);
    $stmt_email->execute([$email]);

    $user = $stmt->fetch();
    $user_email = $stmt_email->fetch();
    if ($user) {
        return ["isValid" => false, "message" => "Вече съществува такова потребителско име!"];
    }
    if ($user_email) {
        return ["isValid" => false, "message" => "Вече съществува такъв имейл!"];
    }

    return ["isValid" => true, "message" => "Данните са попълнени!"];
}

$userData = json_decode(file_get_contents("php://input"), true);
if ($userData) {
    $checkData = checkData($userData);
    if (!$checkData["isValid"]) {
        http_response_code(400);
        exit(json_encode(["status" => "error", "message" => $checkData["message"]]));
    }

    $userData["password"] = password_hash($userData["password"], PASSWORD_DEFAULT);
    try {
        $db = new Config();
        $connection = $db->getConnection();

        $sql = "INSERT INTO users (username, email, password, birthday,nameday) VALUES (:username,:email, :password, :birthday, :nameday)";
        $stmt = $connection->prepare($sql);
        $stmt->execute($userData);
        echo json_encode(["status" => "success"]);
    }
    catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Грешка при регистрация!"]);
    }
}
?>