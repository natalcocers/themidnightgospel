<?php
global $conn;
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = htmlspecialchars(trim(isset($_POST["nombre"]) ? $_POST["nombre"] : ''));

    $apellido = htmlspecialchars(trim(isset($_POST["apellido"]) ? $_POST["apellido"] : ''));

    $email = filter_var(trim(isset($_POST["email"]) ? $_POST["email"] : ''), FILTER_SANITIZE_EMAIL);

    $password = isset($_POST["password"]) ? $_POST["password"] : '';

    if (!$nombre || !$apellido || !$email || !$password) {
        die("Todos los campos son obligatorios.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("El correo no es válido.");
    }

    $check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0) {
        die("Este correo ya está registrado.");
    }
    $check->close();

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $apellido, $email, $passwordHash);

    if ($stmt->execute()) {
        header("Location: ../index.html");
        exit;
    } else {
        echo "Error al registrar: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
