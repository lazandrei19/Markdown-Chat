<?php
	$m = new MongoClient();
	$db = $m->chat;
	$collection = $db->users;

	if(isset($_COOKIE['username'])) {$username = $_COOKIE['username'];}
	$result = $collection->findOne(array("username" => $username), array("password" => true, "_id" => false, "uniq" => true, 'cookie' => true));
	if(!isset($_COOKIE['logged'])) {
		if(isset($_POST['username']) && isset($_POST['password'])) {
			$username = $_POST['username'];
			$password = $_POST['password'];
			$result = $collection->findOne(array("username" => $username), array("password" => true, "_id" => false, "uniq" => true, 'cookie' => true));
		} else {
			header("Location:landingpage.php");
		}
		if(password_verify($password, $result['password'])) {
			if((!isset($_COOKIE['logged'])) && isset($_POST['remember'])){
				//SET COOKIE
				$days = 14;
				$expiration = time() + 60*60*24*$days;
				$ch = bin2hex(openssl_random_pseudo_bytes(64));
				setcookie('logged', $ch, $expiration);
				setcookie('username', $username, $expiration);
				$collection->update(array("username" => $username), array('$set' => array('cookie' => $ch)));
			}
			//LOGIN TRUE
		} else {
			header("Location:landingpage.php");
		}
	} else {
		//CHECK COOKIE
		if($result['cookie'] == $_COOKIE['logged']) {
			//EVERYTHING IS ALRIGHT
		} else {
			header("Location: landingpage.php");
		}
	}
?>