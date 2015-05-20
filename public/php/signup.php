<?php
	function getCurlData($url) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$curlData = curl_exec($curl);
		curl_close($curl);
		return $curlData;
	}

	$errors = "";
	
	//LOGIN CODE
	$username = $_POST['username'];
	$password = $_POST['password'];
	$pattern = '/^\s*$/';
	
	$m = new MongoClient();
	$db = $m->chat;
	$collection = $db->users;
	$options = ['cost' => 11];
	$passwd = password_hash($password, PASSWORD_DEFAULT, $options);
	if(preg_match($pattern, $username) == 0) {
		$uniq = bin2hex(openssl_random_pseudo_bytes(32));
		$data = array( "username" => $username, "password" => $passwd, "isOnline" => false, 'uniq' => $uniq);
		$res = $collection->findOne(array("username" => $username));
		if(empty($res)){
			$collection->insert($data);
			header("Location: http://192.168.3.100/login.php");
		} else {
			$errors .= "<br><h2>Username already exists</h2>";
		}
	} else {
		$errors .= "<br><h2>Username must not be empty</h2>";
	}

	if(!($errors === "")) {
		header( "refresh:5;url=../signup.php" );
		echo($errors);
	}
?>