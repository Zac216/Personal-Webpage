<!DOCTYPE html>
<html>
<head>
    <script src="jquery-3.3.1.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="schedulerStyles.css">
    <meta charset="utf-8" />
    <title>Scheduling Page</title>
</head>
<body>
    <div id="body2">
        <script>
            $("#body2").fadeIn(500)
        </script>



<table>
    <tr style="font-weight:bold;"> 
        <td colspan="5">Worker Availibility</td>
    </tr>
    <tr style="font-weight:bold;"> 
        <td>Name</td><td>day</td><td>timestart</td><td>timestop</td><td>Action</td>
    </tr>    


    <tr> 
    <form method="post" action="writeToDatabase.php">
        <td><input type="text" name="name" placeholder="New Name" required></td>
        <td>
            <select name="day">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
            </select>
        </td>
        <td><input type="time" name="timestart" min="07:30" max="17:00" value="07:30"></td>
        <td><input type="time" name="timestop" min="07:30" max="17:00" value="17:00"></td>
        <td><button type="submit" name="submit">Add</button></td>
    </form>
    </tr>  

    <script>
        
        function confirmDelete(id) {

            if (confirm("Are you sure you want to delete this record?")) {
                location.href = "deleteFromDatabase.php?id=" + id    
            }
        }

    </script>   

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "schedulesdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM employeeschedules ORDER BY
CASE day
   WHEN 'Monday' THEN 1
   WHEN 'Tuesday' THEN 2
   WHEN 'Wednesday' THEN 3
   WHEN 'Thursday' THEN 4
   ELSE 5
END, name, timestart";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["name"]. "</td><td>" .
         $row["day"]. "</td><td>" . 
         substr($row["timestart"],0,5). "</td><td>" .
         substr($row["timestop"],0,5) . "</td><td> " .
        "<button onClick='confirmDelete(" . $row["id"] . ")'>Delete</button></td></tr>";
    }
} else {
    echo "<tr><td colspan='5'> No data found </td></tr>";
}
$conn->close();
?>
</table>



<div> Worker Schedules </div>

<table>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "schedulesdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT name, day, timestart, timestop FROM employeeschedules ORDER BY
CASE day
   WHEN 'Monday' THEN 1
   WHEN 'Tuesday' THEN 2
   WHEN 'Wednesday' THEN 3
   WHEN 'Thursday' THEN 4
   ELSE 5
END, name, timestart";
$result = $conn->query($sql);

$workable = array(
    array(),//monday
    array(),//tuesday
    array(),//wednesday
    array(),//thursday
    array()//friday
);
$hours = array();

if ($result->num_rows > 0) {
    // output data of each row
    $i = 0;
    while($row = $result->fetch_assoc()) {
      
        switch($row['day']){
            case "Monday":
                $row['day'] = 0;
                break;
            case "Tuesday":
                $row['day'] = 1;
                break;
            case "Wednesday":
                $row['day'] = 2;
                break;
            case "Thursday":
                $row['day'] = 3;
                break;
            case "Friday":
                $row['day'] = 4;
                break;
        }
        array_push($workable[$row['day']], $row['name']);
        
        if (!(array_key_exists($row['name'], $hours))) {
            $hours[$row['name']] = 0;
        }
        echo $row['timestop'] . "-" . $row['timestart'];
        //$hours[$row['name']] += $row['timestop'] - $row['timestart'];

    }
} else {
    echo "no data";
}
$conn->close();


    print_r($hours);



for ($i = 0; $i < count($workable); $i++) {
    echo "<br>day-" . $i . ": ";
    for ($a = 0; $a < count($workable[$i]); $a++) {
        echo $workable[$i][$a];
    }
}




?>
</table>


</body>
</html>