<?php
	require('connection.php');

	$curr_id = $_GET['curr_id'];

	$sql = "DELETE FROM curr_subjects WHERE curriculum_id=$curr_id";
	mysqli_query($conn, $sql);

	$sql = "DELETE FROM curriculum WHERE curriculum_id=$curr_id";
	mysqli_query($conn, $sql);

	$loc = "program_list.php";
	header("Location: $loc");
?>