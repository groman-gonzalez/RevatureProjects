window.onload = function() {
	// loadHomeView();
	loadLoginView();
	$('#loginNav').on('click', loadLoginView);
	$('#homeNav').on('click', loadHomeView);
	$('#StatusNav').on('click', loadAuthorView);
	$('#SubmitNav').on('click', loadSubmitionView);
// loadManagerView();
// loadStatusView()
// loadAuthorView()

}
/** ***************************************************************************** */
function loadLoginView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			$('#view').html(xhr.responseText);
			$('#btnLogin').on('click', validateUser);
			// $('#cancelbtn').on('click',login);

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
		}
	}
	xhr.open("POST", "login", true);
	xhr.setRequestHeader("Content-type", "application/json");
	var toSend = JSON.stringify(obj);
	console.log(toSend);
	xhr.send(toSend);
}
/** ***************************************************************************** */

function loadHomeView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);
			$('#btnReimb').on('click', addReimbursement)
			// $('#homeNav').on('click',addReimbursement);
			
			/*
			 * $('#mainNav').on('click', loadHomeView);
			 * $('#authorNav').on('click', loadAuthorView);
			 * //$('#SubmitNav').on('click', loadSubmitionView);
			 * loadSubmitionView(); // $('#StatusNav').on('click',
			 * loadAuthorView); // $('#SubmitNav').on('click',
			 * loadSubmitionView); $('#btnReimb').on('click', addReimbursement)
			 */
		}
	}
	// xhr.open("GET", "home.view", true);
	xhr.open("GET", "employee.view", true);
	xhr.send();
}
function addReimbursement() {
	var obj = {
			amount : $('input[name=amount]').val(),
			typeId : $('input[name=subType').val(),
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
		}
	}
	xhr.open("POST", "reimbursement",true);
	xhr.setRequestHeader("Content-Type", "application/json");
	console.log(toSend);
	xhr.send(toSend);
}

/** ***************************************************************************** */

function loadStatusView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);
			
		}
	}
	xhr.open("GET", "status.view", true);
	xhr.send();
}
function loadSubmitionView() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('#view').html(xhr.responseText);
		}
	}
	xhr.open("GET", "status.view", true);
	xhr.send();

}

/*
 * *****************************************************************************
 */
function loadManagerView() {
	console.log("before xhr");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.status)
			console.log("inside manager view js")
			// loadHomeView()
			$('#view').html(xhr.responseText);
			$('#allbtn').on('click',getALL);
			// getAllRequests();
			loadStatusView();
// $('#loginNav').on('click', loadLoginView);
// //$('#homeNav').on('click', loadHomeView);
// $('#StatusNav').on('click', loadAuthorView);
// $('#ManagerNav').on('click', getReimbursements);
// $('#btnReimb').on('click', addReimbursement)
//			
// // loadStatusView()
// //loadAuthorView()
// // getReimbursements();
		}
	}
	 xhr.open("GET", "manager.view", true);
	// xhr.open("GET", "employee.view", true);
	xhr.send();
}
function getReimbursements(){
	console.log("inside getReimb");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log(xhr.responseText);
			let reimbursements = JSON.parse(xhr.responseText);
			for(let r of reimbursements){
				managerReimbursementList(r);
			}
		}
	}
	// xhr.open("GET", "manager");
	xhr.open("GET", "reimbursement");
	xhr.send();
}

function appendToReimbursementsList(r){
	var submitted = new Date(r.submitted);
	var resolver = new Date(r.resolver);
	
	var table = $(`<tr>
									
				<td>${r.amount}</td>
				<td>${submitted}</td>
				<td>${r.resolved}</td>
				<td>${r.description}</td>
				<td>${r.author}</td>
				<td>${resolver}</td>
				<td id = "statusId${r.id}">${r.statusId}</td>
				<td>${r.typeId}</td>
				<td>
				<button class="btn btn-primary" onclick="updateStatus(${r.id},0)">Denied</button>
				<button class="btn btn-primary" onclick="updateStatus(${r.id},2)">Aproved</button>
				</td>
				</tr>
				`)
	$('#managerReimbursementList').append(table);
}
/** ***************************************************************************** */

function loadAuthorView() {
	console.log("before xhr in status");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.status)
			console.log("inside status")
			$('#view').html(xhr.responseText);
			getAuthorReimbursements();
			// getAllRequests();
		}
	}
	xhr.open("GET", "status.view", true);
	xhr.send();
}
function getAuthorReimbursements(){
	console.log("inside getAuthor");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log(xhr.responseText);
			let reimb = JSON.parse(xhr.responseText);
			for(let r of reimb){
				appendAuthorReimbursementsList(r);
			}
		}
	}
	xhr.open("GET", "reimbursement");
	// xhr.open("GET", "manager");
	xhr.send();
}


function getALL(){
	console.log("inside getAuthor");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log(xhr.responseText);
			let reimb = JSON.parse(xhr.responseText);
			for(let r of reimb){
				var table = $(`<tr>							
						<td>${r.amount}</td>
						<td>${submitted}</td>
						<td>${r.resolved}</td>
						<td>${r.description}</td>
						<td>${r.author}</td>
						<td>${resolver}</td>
						<td id = "statusId${r.id}">${r.statusId}</td>
						<td>${r.typeId}</td>
						<td>${r.statusId}</td>
						</tr>
						`)
			$('#reimbursementsList').append(table);
			}
		}
	}
	// xhr.open("GET", "reimbursement");
	xhr.open("GET", "manager");
	xhr.send();
}

function appendAuthorReimbursementsList(r){
	var submitted = new Date(r.submitted);
	var resolver = new Date(r.resolver);
	var table = $(`<tr>							
				<td>${r.amount}</td>
				<td>${submitted}</td>
				<td>${r.resolved}</td>
				<td>${r.description}</td>
				<td>${r.author}</td>
				<td>${resolver}</td>
				<td id = "statusId${r.id}">${r.statusId}</td>
				<td>${r.typeId}</td>
				<td>${r.statusId}</td>
				</tr>
				`)
	$('#reimbursementsList').append(table);
}
/** ***************************************************************************** */
function loadSpecificUserReimb(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			let reimbursements = JSON.parse(xhr.responseText);
			for(let reims of reimbursements) {
				reimburseLists(reims);
			}
		}
	}
	xhr.open("GET", "employee", true);
	xhr.send();
}

/** ***************************************************************************** */


