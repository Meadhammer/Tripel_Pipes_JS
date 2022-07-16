<?php

$nombre = $_POST["name"];
$apellido = $_POST["surname"];
$edad = $_POST["age"];
$mail = $_POST["email"];
$telefono = $_POST["phone"];
$region = $_POST["zone"];
$encuestaSi = $_POST["yes"];
$encuestaNo = $_POST["no"];
$mensaje = $_POST["mensaje"];

$mensaje = "Este mensaje fue enviado por " . $nombre . ",\r\n";
$mensaje .= "Su edad es " . $edad . ",\r\n";
$mensaje .= "Su e-mail es " . $mail . ",\r\n";
$mensaje .= "Su teléfono es " . $telefono . ",\r\n";
$mensaje .= "Su región es " . $region . ",\r\n";
$mensaje .= "El resutado de la encuesta es " . $encuestaSi . ;
$mensaje .= . $encuestaNo . ",\r\n";
$mensaje .= "Mensaje: " . $_POST["mensaje"] . ",\r\n";
$mensaje .= "Enviado el: " . date("d/m/y", time());

$para = "jftripel@gmail.com";
$asunto = "Consulta desde TRIPEL PIPES";

mail($para, $asunto, utf8_decode($mensaje), $header);

header("Location:index.html");

?>