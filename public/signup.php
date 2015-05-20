<!DOCTYPE html>
<html>
<?php 	
	setcookie("logged", "", time()-3600);
	setcookie("username", "", time()-3600);
?>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Sign Up</title>
	<link rel="stylesheet" href="css/signup.css">
</head>
<body>
	<div class="over"></div>
	<div class="content">
		<form action="php/signup.php" method="POST" accept-charset="utf-8">
			<input type="text" name="username" value="" placeholder="Username"><br>
			<input type="password" name="password" value="" placeholder="Password"><br>
			<div class="bt" onclick="document.forms[0].submit();">Sign Up</div>
		</form>
	</div>
</body>
</html>