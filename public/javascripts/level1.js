var index = 0;
var score = 0;
var correctAnswer;
var leftButtonValue;
var middleButtonValue;
var rightButtonValue;
var self = this;

function setup()
{
	var level = 1;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	
	$.ajax({
	  type: "POST",
	  url: '/getequations',
	  data:{level:"1"},
	  dataType: 'json',
	  success: successL1Callback,
	  error: function(response){
	    console.log("cannont get equations");
		console.log(response);
	  }
	});
};


var successL1Callback = function(response){
	self.numbers = response.numbers;
	self.numbersToIdentify = response.numbersToIdentify;
	var numOfProblems = self.numbers.length;
	
	// while(numOfProblems > 0){
// 		break;
// 	}
};