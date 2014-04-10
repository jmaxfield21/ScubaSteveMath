function submitEquation(first, second) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addequations',
	  data:{first:first,second:second,level:3},
	  dataType: 'json',
	  success: function(){location.reload();},
	  error: function(response){
	    console.log("cannont send equation");
		console.log(response);
	  },
	  async:   false
	});
};

function subtractionCreator(form) {
    var first = $("#firstNumber").val();
	var second = $("#secondNumber").val();
	submitEquation(first,second);
};

