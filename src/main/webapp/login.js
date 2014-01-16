//Author: Shane McKee <smckee6192@gmail.com>
var loginClick = function(event){
	var username = $("#username").val();
	var password = $("#password").val();
	
	if(username === ""){
		alert("Username cannot be empty")
	} else if(password === ""){
		alert("Password cannot be empty");
	}
};

var enableSubmit = function(event){
	var username = $("#username").val();
	var password = $("#password").val();
	var confirmedPassword = $("#password2").val();
	var firstName = $("#fname").val();
	var lastName = $("#lname").val();
	var email = $("#email").val();
	
	if(!(username === "" || password === "")){
		$("#loginButton").prop('disabled', false);
		$("#loginButton").removeClass("disabledButton");
		$("#loginButton").addClass("button");
	} else {
		$("#loginButton").prop('disabled', true);
		$("#loginButton").removeClass("button");
		$("#loginButton").addClass("disabledButton");
	}
};

var newUser = function(event){
	window.location.href = "/newuser";
};

var bindToButtons = function(event){
	$("#loginButton").bind('click', loginClick);
	$("input").keyup(enableSubmit)
	$("#newUser").bind('click', newUser);
};

$(window).load(bindToButtons);

