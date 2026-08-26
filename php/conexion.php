<?php
$host = "localhost";
$usuario = "root";
$clave = "";
$dbName = "natalia";

$conn = new mysqli($host, $usuario, $clave, $dbName);
if ($conn->connect_error) {
    die("Error al conectar con la base de datos: " . $conn->connect_error);
}