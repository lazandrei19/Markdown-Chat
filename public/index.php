<!DOCTYPE html>
<html>
<?php
	require ('php/php_error.php');
	require ('php/vendor/autoload.php');
	require ('php/login.php');
	\php_error\reportErrors();

	$_SESSION['to'] = "Tewdewr";
?>
<head>
	<meta charset="UTF-8">
	<title>Chat</title>
	<link rel="stylesheet" type="text/css" href="css/app.css" />
</head>
<body data-user=<?php echo '"' . $result['uniq'] . '"' ?> id="body">
	<div class="overlay"></div>
	<div class="all">
		<div class="container">
			<div class="contacts">
				<div id="searchbar"><input placeholder="search" id="search"></div>
				<div class="users">
				</div>
				<div class="fandt">
					<span class="from"></span>
					<br><span>&lt&gt</span><br>
					<span class="to"></span>
				</div>
			</div>
			<div class="chat">
				<div class="messages" ondragover="event.preventDefault();" ondrop="drop(event)">
					<span class="welcome">Hey there</span>
				</div>
				<div class="input">
					<textarea id="input"></textarea>
				</div>
			</div>
			<div class="tmp" id="tmp">
				<div class="loader null">Loading...</div>
				<div id="drop" class="drop">Drop files here</div>
				<div class="images"></div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="http://192.168.3.100:8080/socket.io/socket.io.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</body>
</html>
