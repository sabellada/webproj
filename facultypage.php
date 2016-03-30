<?php
    session_start();
    include("link.php");

    if(!$_SESSION['user_id']) {
		header("Location: index.php");
		exit;
	} else {
		$fid = $_SESSION['user_id'];
		$info = mysqli_fetch_assoc(mysqli_query($connect, "SELECT * FROM users WHERE user_id=$fid"));
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
		
		<title>Advisees</title>
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
				<br><br>
				<h1 style="padding-left:50px; padding-top:20px">My Advisees </h1>
				<br/>
				<ul style="padding-top:70px">
                    
                    <?php
                        $getstudent_query = mysqli_query($connect, "SELECT u.first_name, u.last_name FROM users u, students s WHERE s.adviser_id='".$info['username']."' AND s.student_id = u.username;");
                        
                        while($data = mysqli_fetch_assoc($getstudent_query)) {
                            echo "<li><a style='color:black'>";
                            echo $data['first_name'] .  " " . $data['last_name'];
                            echo "</a></li>";
                        }

                    ?>
					
				</ul>
				<br><br>
			
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

</script>
<html>
