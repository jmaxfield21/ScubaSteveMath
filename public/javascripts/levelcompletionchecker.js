var getlevelscompleted = function(username){
	
	var response = $.post("/levelscompleted",{"username":username}, function(){});
	
	if(response.responseJSON.l1 && response.responseJSON.l2 && response.responseJSON.l3){
		// change class and unlock
	}
	
	if(response.responseJSON.l4){
		// change class and unlock
	}
	
	console.log(response.responseJSON.l1);
	console.log(response.responseJSON.l2);
	console.log(response.responseJSON.l3);
	console.log(response.responseJSON.l4);
	console.log(response.responseJSON.l5);
}