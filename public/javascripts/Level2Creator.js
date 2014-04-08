function submitEquation(first, second) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addequations',
	  data:{first:first,second:second,level:2},
	  dataType: 'json',
	  success: function(){},
	  error: function(response){
	    console.log("cannont send equation");
		console.log(response);
	  },
	  async:   false
	});
};

function additionCreator(form) {
    var first = $("#firstNumber").val();
	var second = $("#secondNumber").val();
	submitEquation(first,second);
};
