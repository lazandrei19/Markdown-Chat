//Variables
var socket;
var thisUser;
var thisUsername;
var toUser;
var toUsername;
var allUsers = [];
var images = [];

//Functions
function init () {
	try {
		socket = io.connect('http://192.168.3.100:8080');
	} catch(e) {
		console.log(e);
	}

	thisUser = document.getElementById("body").dataset.user;

	socket.emit('isOnline', thisUser);

	$(".messages").scrollTop(document.getElementsByClassName("messages")[0].scrollHeight);

	$(".messages").bind("mousewheel",function(ev, delta) {
		var scrollTop = $(this).scrollTop();
		$(this).scrollTop(scrollTop - Math.round(delta) * 50);
	});
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

} else {

	function uploadTmp () {
		var dropZone = document.getElementById('drop');
		var tmp = document.getElementById('tmp');

		var upload = function(files) {
			var formData = new FormData(),
				xhr = new XMLHttpRequest();
			for (var x = files.length - 1; x >= 0; x--) {
				var file = files[x];
				formData.append("files", file);
			};

			xhr.upload.addEventListener('progress', progressHandler, false);
			xhr.addEventListener('load', completeHandler, false);

			function progressHandler (event) {
				$(".loader.null").removeClass("null");
			}


			//Recieve messages
			function completeHandler (event) {
				$(".loader").addClass("null");
				var data = JSON.parse(event.target.responseText);
				for (var i = data.length - 1; i >= 0; i--) {
					$(".images").html($(".images").html() + '<img src="data:image/jpeg;base64,' + data[i].file + '" class="image" draggable="true" ondragstart="drag(event)">');
					$(".tmp").scrollTop(document.getElementsByClassName("tmp")[0].scrollHeight);
				};
			}

			$(".tmp").bind("mousewheel",function(ev, delta) {
				var scrollTop = $(this).scrollTop();
				$(this).scrollTop(scrollTop - Math.round(delta) * 50);
			});

			xhr.open("POST", '/upload');
			xhr.send(formData);
			dropZone.className = "null";
		}

		tmp.ondrop = function(e) {
			e.preventDefault();
			upload(e.dataTransfer.files);
		}

		dropZone.ondrop = function(e) {
			e.preventDefault();
			this.className = "drop";
		}

		dropZone.ondragover = function(e) {
			this.className = "drop over";
			return false;
		}

		dropZone.ondragleave = function(e) {
			this.className = "drop";
			return false;
		}

		tmp.ondragover = function(e) {
			return false;
		}

		tmp.ondragleave = function(e) {
			return false;
		}
	}

	function drop (event) {
		event.preventDefault()
		var data = event.dataTransfer.getData("src");
		if(toUser) {
			socket.emit('input', {
				from: thisUser,
				to: toUser,
				message: data
			});
		}
	}

	function drag (event) {
		console.log("start");
		event.dataTransfer.setData("src", event.target.src);
	}

	uploadTmp();
}

function handleMessages () {
	var messages = $('.messages');
	var input = $("#input");

	try {
		var socket = io.connect('http://192.168.3.100:8080');
	} catch(e) {

	}

	if(socket !== undefined) {
		
		//Error messages pop here *peek-a-boo ‹’’›(Ͼ˳Ͽ)‹’’›*

		socket.on('er', function (err) {
			alert(err);
		});

		//Listen for a keypress
		input.keydown(function (e) {
			var self = this;

			if(e.which == 13) {
				if(!e.shiftKey){
					socket.emit('input', {
						from: thisUser,
						to: toUser,
						message: self.value
					});

					e.preventDefault();

					self.value = "";
				}
			}
		})
	}
}

//ALL SIZES CODE

init();
handleMessages();

function loadContacts(search) {
	var contacts = $(".users");

	socket.emit('requestUsers', search);

	socket.on('reqestedUsers', function (users) {
		var online = '<div class="online"><div class="ontext"><i>~~Online~~</i></div><ul>';
		var offline = '<div class="offline"><div class="offtext"><i>~~Offline~~</i></div><ul>';
		var template = [
			'<li to="',
			'""><span class="status"></span><span class="name">',
			'</span></li>'
		];

		users.forEach(function(element, index){
			if(element.isOnline) {
				if(element.uniq != thisUser)
					online += template[0] + element.uniq + template[1] + element.username + template[2];
			} else {
				offline += template[0] + element.uniq + template[1] + element.username + template[2];
			}
		});

		online += '</ul></div>';
		offline += '</ul></div>';

		$(".users").html(online + offline);
	});
}

function loadMessages () {
	var tmp = [thisUser, toUser];
	tmp.sort();
	var between = tmp[0] + tmp[1];
	socket.emit('loadMessages', between);
}

function setUsername (username) {
	thisUsername = username;
	$(".from").html(username);
}

function setTo (username) {
	toUsername = username;
	$(".to").html(username);
}

function clickOnTo (ev) {
	ev.className="active";
	toUser = ev.dataset.to;
	setTo($(".active .name").html());
	ev.className="";
	$(".messages").html('');
	loadMessages();
	socket.emit('deleteUserFromuMessages', toUser);
}

function assignTargetsToArray () {
	var aUs = $(".users li");
	
	for (var i = aUs.length - 1; i >= 0; i--) {
		var result = $.grep(allUsers, function(e){ return e.uniq == aUs[i].dataset.to; });
		result[0].target = aUs[i];
	};
}

function detectOfflineMessages () {
	socket.emit('offlineMessages', thisUser);

	socket.on('offlineMessagesUsers', function (users) {
		if(users) {
			users.forEach(function (item, index) {
				allUsers.forEach(function (user, index) {
					if(user.uniq == item) {
						user.target.className = "newMessage";
					}
				});
			});
		}
	});
}

//Jqery Event Handlers
$("#search").focus(function(ev) {
	$("#search").val("");
	socket.emit('updateUsers');
});

$("#search").focusout(function(ev) {
	$("#search").val("");
	socket.emit('updateUsers');
});

$("#search").keyup(function(ev){
	var val = $("#search").val();
	loadContacts(val);
});

//Socket.io Event handlers
socket.on('reqestedUsers', function (users) {
	var online = '<div class="online"><div class="ontext"><i>~~Online~~</i></div><ul>';
	var offline = '<div class="offline"><div class="offtext"><i>~~Offline~~</i></div><ul>';
	var template = [
		'<li onClick="clickOnTo(this)" data-to="',
		'""><span class="status"></span><span class="name">',
		'</span></li>'
	];

	allUsers = users;

	users.forEach(function(element, index){
		if(element.isOnline) {
			if(element.uniq != thisUser) {
				online += template[0] + element.uniq + template[1] + element.username + template[2];
			} else {
				setUsername(element.username);
			}
		} else {
			offline += template[0] + element.uniq + template[1] + element.username + template[2];
		}
	});

	online += '</ul></div>';
	offline += '</ul></div>';

	$(".users").html(online + offline);

	assignTargetsToArray();
	detectOfflineMessages();
});

socket.on('newMessage', function (m) {
	if(m.from == toUser) {
		$(".messages").html($(".messages").html() + '<div class="message"><div class="you">' + m.message + '</div></div>');
		$(".messages").scrollTop(document.getElementsByClassName("messages")[0].scrollHeight);
	} else {
		var result = $.grep(allUsers, function(e){ return e.uniq == m.from; });
		result = result[0];
		result.target.className = "newMessage";
	}
});

socket.on('message', function (m) {
	var p;
	if(m.from == thisUser) {
		p = "me";
	} else if(m.from == toUser){
		p = "you";
	}
	$(".messages").html($(".messages").html() + '<div class="message"><div class="' + p +'">' + m.message + '</div></div>');
	$(".messages").scrollTop(document.getElementsByClassName("messages")[0].scrollHeight);
});