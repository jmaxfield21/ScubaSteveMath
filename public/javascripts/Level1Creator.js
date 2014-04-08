function submitEquation(number, answer) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addequations',
	  data:{number:number,answer:answer,level:1},
	  dataType: 'json',
	  success: function(){},
	  error: function(response){
	    console.log("cannont send equation");
		console.log(response);
	  },
	  async:   false
	});
};

function recognitionCreator(form) {
    var number = $("#number").val();
	var answer = $("#answer").val();
	submitEquation(number,answer);
};

