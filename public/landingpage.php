<!DOCTYPE html>
<?php
	session_start();

	setcookie("logged", "", time()-3600);
	setcookie("username", "", time()-3600);
?>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Hello there :)</title>
	<link rel="stylesheet" href="css/landing.css">
</head>
<body>
	<div class="over"></div>
	<div class="content">
		<p>Choose your entrance:</p>
		<div class="bt" onclick="location.href = 'login.php';">Log In</div>
		<div class="bt" onclick="location.href = 'signup.php';">Sign Up</div>
	</div>
</body>
</html>