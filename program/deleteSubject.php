<?php
	require('connection.php');

	$course_id = $_GET['course_id'];
	$curr_id = $_GET['curr_id'];

	$sql = "DELETE FROM curr_subjects WHERE course_id=$course_id AND curriculum_id=$curr_id";
	mysqli_query($conn, $sql);
	
	$prog_code = $_GET['prog_code'];
	$curr_year = $_GET['curr_year'];

	$loc = "curriculum_view.php?program_code=$prog_code&curriculum_year=$curr_year";
	header("Location: $loc");
?>