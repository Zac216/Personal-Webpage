<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "schedulesdb";


$name = $_POST['name'];
$day = $_POST['day'];
$timestart = $_POST['timestart'].":00";
$timestop = $_POST['timestop'].":00";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO employeeschedules (name, day, timestart, timestop)
VALUES ('$name', '$day', '$timestart', '$timestop')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    header('Location: scheduler.php');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>