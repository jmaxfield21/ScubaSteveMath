function submitEquation(first, second, operator) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addequations',
	  data:{first:first,second:second,operator:operator,level:5},
	  dataType: 'json',
	  success: function(){location.reload();},
	  error: function(response){
	    console.log("cannont send equation");
		console.log(response);
	  },
	  async:   false
	});
};

function eqCreator() {
    var first = $("#firstNumber").val();
	var second = $("#secondNumber").val();
	var operator = $("#operator").val();
	var number = $("#number").val();
	var answer = $("#answer").val();
	
	if(first != "" && second != ""){
		submitEquation(first,second, operator);
	}
	
	if(number != "" && answer != ""){
		submitEquation(number,answer, "");
	}

	
};

