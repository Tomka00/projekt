<?php
// Definice proměnných a nastavení na prázdné hodnoty
$name = $email = $error_description = "";
$nameErr = $emailErr = $errorDescriptionErr = "";
$successMessage = "";
 
// Funkce pro čištění vstupů
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
 
// Zpracování formuláře při odeslání
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
        $nameErr = "Jméno je povinné";
    } else {
        $name = test_input($_POST["name"]);
        // Ověření, že jméno obsahuje pouze písmena a mezery
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $nameErr = "Povolena jsou pouze písmena a mezery";
        }
    }
 
    if (empty($_POST["email"])) {
        $emailErr = "Email je povinný";
    } else {
        $email = test_input($_POST["email"]);
        // Ověření formátu emailu
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Neplatný formát emailu";
        }
    }
 
    if (empty($_POST["error_description"])) {
        $errorDescriptionErr = "Popis chyby je povinný";
    } else {
        $error_description = test_input($_POST["error_description"]);
    }
 
    // Pokud nejsou žádné chyby, zobrazíme úspěšnou zprávu a odešleme e-mail
    if (empty($nameErr) && empty($emailErr) && empty($errorDescriptionErr)) {
        $to = "tomik.m1@seznam.cz"; 
        $subject = "Nový formulář - Hlásení chyby";
        $message = "
            <html>
            <head>
            <title>Nový formulář - Hlásení chyby</title>
            </head>
            <body>
            <p><strong>Jméno:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Popis chyby:</strong> $error_description</p>
            </body>
            </html>
        ";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <'.$email.'>' . "\r\n";
 
        if (mail($to, $subject, $message, $headers)) {
            $successMessage = "Formulář byl úspěšně odeslán a e-mail byl odeslán!";
            echo "<h3>$successMessage</h3>";
            echo "<script>console.log('E-mail byl úspěšně odeslán.');</script>";
        } else {
            echo "<h3 class='error'>Došlo k chybě při odesílání e-mailu.</h3>";
            echo "<script>console.log('E-mail nebyl úspěšně odeslán.');</script>";
        }
    } else {
        // Zobrazíme chyby
        echo "<h3 class='error'>Opravte následující chyby:</h3>";
        if (!empty($nameErr)) echo "<p class='error'>$nameErr</p>";
        if (!empty($emailErr)) echo "<p class='error'>$emailErr</p>";
        if (!empty($errorDescriptionErr)) echo "<p class='error'>$errorDescriptionErr</p>";
    }
}
?>