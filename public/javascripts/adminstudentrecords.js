var sendCurrentStudent = function(name){
	var page = $.post("/setcurrentstudent",{"student":name}, function(response){
	window.location.replace("/records");
	});
}

