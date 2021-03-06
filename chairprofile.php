<?php
	session_start();
	include("link.php");
	
	if(!$_SESSION['user_id']) {
		header("Location: index.php");
		exit;
	} else {
		$cid = $_SESSION['user_id'];
		$info = mysqli_fetch_assoc(mysqli_query($connect, "SELECT * FROM users WHERE user_id=$cid"));
	}
?>

<html>
	<head>
		<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>
		<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

		<link rel="stylesheet" href="css/home.css">
		<link rel="	stylesheet" href="functionalities/css/contactus.css">
		<link rel="stylesheet" href="css/styles.css">
		<link rel="stylesheet" href="css/navbar-footer.css">
		<link rel="stylesheet" href="css/carousel.css">

		<script src="js/jquery-latest.min.js" type="text/javascript"></script>
		<script src="js/script.js"></script>
		<script src="js/home.js"></script>
		
		<title>Faculty Profile</title>
	</head>
<body>
<div class="toplogo">
	<a href='#'><img src="css/temp/dcs-sign.png" /></a>
</div>

<!--start navbar-->

<?php require('navbar.php');?>

<!--end navbar-->

	<!--start content(news/events/announcements)-->
	<div class="container">
		<div class="content-wrapper">
			<div class="content">
				<?php
					$name = $info['first_name'] . " " . $info['last_name'];
				?>
				<h1 style="padding-left:50px; padding-top:20px"><?php echo $name; ?>: </h1>
				<br/>
				<ul style="padding-top:50px">
					<p></p>
					<p>Blablabla: Blabla</p>
					<p>Blablabla: Blabla</p>
					<b><a href="chairpage.php" style="color:black;cursor:pointer">Set Advisers Manually</a></b><br>
                
                    <?php
                        $nostudent_query = mysqli_query($connect, "SELECT * FROM students WHERE adviser_id IS NULL");
                        $numofstud = mysqli_num_rows($nostudent_query);

                        if ($numofstud > 0) {
                            echo "<form action='randomprocess.php' target='_blank' role='form' method='post'><b><button style='color:black;cursor:pointer' name='gorandom' id='gorandom' type='submit'>Set Advisers Psuedo-Random</button></b>";
                        } else {
                            echo "<b>N/A</b>";
                        }
                    
						$query = mysqli_query($connect, "SELECT COUNT(adviser_id) AS advisees FROM students WHERE adviser_id='".$info['username']."'");
						$fetch = mysqli_fetch_assoc($query);
						echo "<p><b>Advisees: ". $fetch['advisees'] ."</b></p>";
                    
                    
						if($fetch['advisees'] == 0){
							echo "<p><b><a style='color:gray;cursor:default'>Go to page</a></b></p>";
						} else {
							echo "<p><b><a href='facultypage.php' style='color:black'>Go to page</a></b></p>";
						}
					?>
						
				</ul>
			
			     <p id="display"></p>
			</div>
		</div>
	</div>
	<!--end content-->

	<!--start footer-->
	<footer>
		<div class="lookWrap">
			<h2>Contact Us</h2>
			<div id="look">
					<div class="contactus">
						<h3>Ateneo de Naga University</h3>
						<p>Ateneo de Naga University<br>
							Ateneo Avenue, 4400 <br>
							Naga City, Philippines<br><br>
							Tel. Nos: Trunkline (63 54) 472-2368<br>
							Fax No: (63 54) 473-9253</p>
					</div>
					<div class="contactus">
						<h3>Department of Computer Science</h3>
						<p>2F Rm P219 Phelan Building <br>
							Ateneo de Naga University <br>
							Ateneo Avenue, 4400 <br>
							Naga City, Philippines <br><br>
							Email: dcs@adnu.edu.ph <br>
							Phone: 054 472 2368 ext 2422 </p>
					</div>

				</div>
			</div>
		</div>
		<div class="legality">
			&copy; Copyright 2016 by Your Company
		</div>
	</footer>
	<!--end footer-->
</body>
<script type="text/javascript">
	$(window).scroll(function() {
		var x = window.pageYOffset;
		if(x > 0){
			$('.nav').addClass("fixed"); //make position fixed instead of absolute
		} else {
			$('.nav').removeClass("fixed") ;//clear styles if back to original position
		}
	});

	    
    function showalert() {
        alert("Advisers has been set.");
        
    }
    
    function gorandom() {
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("display").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "randomprocess.php", true);
        xmlhttp.send();
    }
</script>
<html>
