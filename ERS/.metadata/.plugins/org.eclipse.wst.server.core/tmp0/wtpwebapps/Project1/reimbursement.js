window.onload = function() {
	loadHomeView();
	$('#loginNav').on('click', loadLoginView);
	$('#homeNav').on('click', loadHomeView);
	$('#SubmitNav').on('click', loadStatusView);
	$('#StatusNav').on('click', loadSubmitionView);
}
function loadLoginView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			$('#view').html(xhr.responseText);
			$('#btnLogin').on('click', validateUser);

		}
	}
	xhr.open("GET", "login.view", true);
	xhr.send();
}
function validateUser() {
	var obj = {
		username : $('input[name=username]').val(),
		password : $('input[name=password]').val()
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			$('#view').html(xhr.responseText);
			// $('#btnLogin').on('click',loadHomeView());
		}
	}
	xhr.open("POST", "login", true);
	xhr.setRequestHeader("Content-type", "application/json");
	var toSend = JSON.stringify(obj);
	console.log(toSend);
	xhr.send(toSend);

}

function loadHomeView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);
			$('#addReimb').on('click', reimbList)
			//addReimbursement();
		}
	}
	xhr.open("GET", "home.view", true);
	xhr.send();
}

function loadStatusView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);
			findStatus();

		}
	}
	xhr.open("GET", "employee.view", true);
	xhr.send();
}
function findStatus() {

}

function loadSubmitionView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);

		}
	}
	xhr.open("GET", "manager.view", true);
	xhr.send();

}

function addReimbursement() {
	
	var obj = {
		amount : $('input[name=amount]').val(),
		type : $('input[name=subType').val(),
		description : $('input[name=reimbDescription]').val()
	};

	console.log(obj);
	var toSend = JSON.stringify(obj);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
			console.log(xhr.responseType);
			appendToReimbursementList(obj);
		}
	}
	xhr.open("PUT", "reimbursement");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(toSend);
}
function appendToReimbursementList() {
	var li = $(`<li>${reimb.amount}</li>`);
	$('#reimbursementList').append(li);

}
