<?php
session_start();
require 'Connecting.php';

if (isset($_POST['lock_screen'])) {
    $_SESSION['locked'] = true;
    header("Location: lockscreen.php");
    exit();
}

if (isset($_SESSION['locked']) && $_SESSION['locked']) {
    header("Location: lockscreen.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Main Page</title>
</head>
<body>
    <h1>Welcome to Your Application</h1>
    <form method="post" action="">
        <button type="submit" name="lock_screen">Lock Screen</button>
    </form>
    <!-- Your application content goes here -->
</body>
</html>
