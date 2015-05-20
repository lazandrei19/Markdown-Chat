<?php
	header("Content-Type: application/json");

	$uploaded = array();
	$extensions = ["jpg", "JPG", "jpeg", "jpeg", "gif", "GIF", "bmp", "BMP", "png", "PNG", "svg", "SVG"];

	if(!empty($_FILES['file']['name'][0])) {
		foreach ($_FILES['file']['name'] as $pos => $name) {
			$ext = explode('.', $name)[count(explode('.', $name)) - 1];
			if(in_array($ext, $extensions)){
				if(move_uploaded_file($_FILES['file']['tmp_name'][$pos], '/tmp/' . $name . date_timestamp_get(date_create()))) {
					$newName = $name . date_timestamp_get(date_create());
					$uploaded[] = array(
						'name' => $name,
						'file' => base64_encode(file_get_contents('/tmp/' . $newName))
					);
				}
			}
		}
	}

	echo json_encode($uploaded);
?>