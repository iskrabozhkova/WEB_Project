<?php
class Config
{
    private $connection;

    function __construct()
    {
        $host = "localhost:3306";
        $dbname = "project";
        $username = "root";
        $password = "";

        $dsn = "mysql:host=$host;dbname=$dbname";

        $this->connection = new PDO($dsn, $username, $password);
    }

    function getConnection()
    {
        return $this->connection;
    }
}
?>