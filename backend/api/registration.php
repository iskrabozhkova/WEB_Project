<?php
    require_once("../database/database.php");

    function checkData($userData){
        if (!isset($userData["email"]) || !isset($userData["password"]) || !isset($userData["username"]) || !isset($userData["birthday"]) || !isset($userData["nameday"])) {
            return ["isValid" => false, "message" => "Данните не са попълнени!"];
        }
        if(strlen($userData["password"]) <= 5){
            return ["isValid" => false, "message" => "Паролата трябва да бъде поне 5 символа!"];
        }
        return ["isValid" => true, "message" => "Данните са попълнени!"];
    }

    $userData = json_decode(file_get_contents("php://input"), true);
    if ($userData) {
        $checkData=checkData($userData);
        if (!$checkData["isValid"]) {
            http_response_code(400);
            exit(json_encode(["status" => "error", "message" => $checkData["message"]]));
        }
        $userData["password"] = password_hash($userData["password"], PASSWORD_DEFAULT);
        try{
            $db = new Database();
            $connection = $db->getConnection();

            $sql = "INSERT INTO users (username, email, password, birthday,nameday) VALUES (:username,:email, :password, :birthday, :nameday)";
            $stmt = $connection->prepare($sql);
            $stmt->execute($userData);
            echo json_encode(["status" => "success", "message" => "Регистрацията е успешна"]);
        }catch(PDOException $e){
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Грешка при регистрация!"]);
        }
    }
?>