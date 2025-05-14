<?php
$servername = "127.0.0.1"; 
$username = "root"; 
$password = ""; 
$dbname = "booking"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
echo "Соединение установлено успешно";


//$conn->close();
?>