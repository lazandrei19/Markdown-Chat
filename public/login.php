<!DOCTYPE html>
<html>
<?php
	setcookie("logged", "", time()-3600);
	setcookie("username", "", time()-3600);
?>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Log In</title>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/login.css">
</head>
<body>
	<div class="over"></div>
	<div class="content">
		<form action="index.php" method="POST" accept-charset="utf-8">
			<input type="text" name="username" value="" placeholder="Username"><br>
			<input type="password" name="password" value="" placeholder="Password"><br>
			<label><input type="checkbox" name="remember" value=""><span class="label-text">Remember Me</span></label><br>
			<div class="bt" onclick="document.forms[0].submit();">Log In</div>
		</form>
	</div>
</body>
</html>