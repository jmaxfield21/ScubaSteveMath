var loginClick = function(event){
	/*
	The dollar sign is basically short for jquery. All you're doing in the next line is saying "Hey, jquery, here is the ID of the 
	HTML component that I want to pick." So all the next statement below is saying is "get the value from the field called 'username.'"
	
	This file is VERY basic, straight-forward JS, so it's a good starting point, I think.
	*/
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

