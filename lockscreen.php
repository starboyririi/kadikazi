<?php
session_start();
require 'Connecting.php';  // Include your database configuration file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Create a connection
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    $stmt->close();
    $conn->close();

    // Verify password
    if (password_verify($password, $hashed_password)) {
        $_SESSION['locked'] = false;
        header("Location: index.php");
        exit();
    } else {
        $error_message = "Invalid credentials. Please try again.";
    }
}

// If the screen is locked, display the lock screen
if ($_SESSION['locked']) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Locked Screen</title>
    </head>
    <body>
        <h1>Screen is locked</h1>
        <form method="post" action="">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Unlock</button>
        </form>
        <?php if (isset($error_message)) { echo "<p>$error_message</p>"; } ?>
    </body>
    </html>
    <?php
    exit();
}
?>
