<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Replace these with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "users";

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            $response['success'] = false;
            $response['message'] = "Connection failed: " . $conn->connect_error;
            echo json_encode($response);
            exit();
        }

        // Set the status to true for the provided email
        $stmt = $conn->prepare("UPDATE users SET status = 1 WHERE email = ?");
        $stmt->bind_param("s", $email);

        if ($stmt->execute()) {
            // Send reset password email using PHPMailer
            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->isSMTP();                                            // Send using SMTP
                $mail->Host       = 'smtp.example.com';                    // Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'your_email@example.com';               // SMTP username
                $mail->Password   = 'your_email_password';                  // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port       = 587;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('no-reply@example.com', 'Mailer');
                $mail->addAddress($email);     // Add a recipient

                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Password Reset Request';
                $mail->Body    = 'Click on the following link to reset your password: <a href="https://yourwebsite.com/reset_password.php?email=' . urlencode($email) . '">Reset Password</a>';
                $mail->AltBody = 'Click on the following link to reset your password: https://yourwebsite.com/reset_password.php?email=' . urlencode($email);

                $mail->send();
                $response['success'] = true;
                $response['message'] = "Reset email sent.";
            } catch (Exception $e) {
                $response['success'] = false;
                $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        } else {
            $response['success'] = false;
            $response['message'] = "Failed to update status.";
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['success'] = false;
        $response['message'] = "Invalid email address.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
