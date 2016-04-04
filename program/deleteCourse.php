<?php
	require('connection.php');

	$course_id = $_GET['course_id'];
	
	$sql = "DELETE FROM prerequisite WHERE course_id=$course_id  OR course_id_pre=$course_id";
	mysqli_query($conn, $sql);

	$sql = "DELETE FROM curr_subjects WHERE course_id=$course_id";
	mysqli_query($conn, $sql);	

	$sql = "DELETE FROM course WHERE course_id=$course_id";
	mysqli_query($conn, $sql);


	$loc = "course_list.php";
	header("Location: $loc");
?>