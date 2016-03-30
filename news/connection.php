<?php
	/**
 		* File Description: Database login 
 		* @version 2.0
		* @authors Charles Torrente
	*/
	$conn = @mysqli_connect('localhost', 'root', '') or die('Unable to connect to the database');
	@mysqli_select_db($conn, 'dcs_project') or die('Unable to load Database');
?>
