<?php
// Remplacer par ton email
$to = "francoisdanino@gmail.com"; 

// Vérifier si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Protéger les données entrées
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Sujet de l'email
    $subject = "Nouveau message de votre site";

    // Contenu de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Headers de l'email
    $headers = "From: $name <$email>";

    // Envoi de l'email
    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: contact.html?success=1");
        exit;
    } else {
        header("Location: contact.html?error=1");
        exit;
    }
} else {
    // Redirection s'il y a un accès direct
    header("Location: contact.html");
    exit;
}
?>
