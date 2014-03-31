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
	
	/*index = self.remainingProblems;
	while(self.numbers.length > 0){
		correctAnswer = self.numbersToIdentify[self.numbersToIdentify.length-1];
	}
		correctAnswer = numbers
	}*/

	var answerArray = level1();
	correctAnswer = answerArray[0];
	wrong1 = answerArray[1];
	wrong2 = answerArray[2];
	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
		wrong1 = randomAnswer(1);
		wrong2 = randomAnswer(1);
	}
	setButtons(correctAnswer, wrong1, wrong2);
	var playButton = document.getElementById("play");
	playButton.style.display = "none";
};

var checkForEquations = function() 
{
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
}


var successL1Callback = function(response)
{
	self.numbers = response.numbers;
	self.numbersToIdentify = response.numbersToIdentify;
	var numOfProblems = self.numbers.length;
	self.remainingProblems = 10 - numOfProblems;
};

function setButtons(correctAnswer, wrong1, wrong2)
{
	var randomAssignment = Math.floor(Math.random() * ( 3 - 1 + 1) ) + 1;
	var randomAssignment2 = Math.floor(Math.random() * ( 2 - 1 + 1) ) + 1;
	switch (randomAssignment)
	{
		case 1:
			document.getElementById("answer1").innerHTML= correctAnswer;
			leftButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer2").innerHTML= wrong1;
					middleButtonValue = wrong1;
					document.getElementById("answer3").innerHTML= wrong2;
					rightButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer2").innerHTML= wrong2;
					middleButtonValue = wrong2;
					document.getElementById("answer3").innerHTML= wrong1;
					rightButtonValue = wrong1;
				}
			break;
		case 2:
			document.getElementById("answer2").innerHTML= correctAnswer;
			middleButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer1").innerHTML= wrong1;
					leftButtonValue = wrong1;
					document.getElementById("answer3").innerHTML= wrong2;
					rightButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer1").innerHTML= wrong2;
					leftButtonValue = wrong2;
					document.getElementById("answer3").innerHTML= wrong1;
					rightButtonValue = wrong1;
				}
			break;
		case 3:
			document.getElementById("answer3").innerHTML= correctAnswer;
			rightButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer2").innerHTML= wrong1;
					middleButtonValue = wrong1;
					document.getElementById("answer1").innerHTML= wrong2;
					leftButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer2").innerHTML= wrong2;
					middleButtonValue = wrong2;
					document.getElementById("answer1").innerHTML= wrong1;
					leftButtonValue = wrong1;
				}
			break;
	}
}

//Called from isCorrect()
//Accepts the percent of the tank that should be filled
function changeHeightDynamic(percent)
{

	var currentEmpty = 100-percent;
	
	//Converts  from number to string
	currentEmpty = currentEmpty + "%";
	document.getElementById("emptyTank").style.height=currentEmpty;
}

//isCorrect checks whether the student's answer is correct or not then prints message to 'answer' div
function isCorrect(selectedButton)
{
	index++;
	var studentAnswer;
	switch(selectedButton)
	{
		case 'left':
			studentAnswer = leftButtonValue;
			break;
		case 'middle':
			studentAnswer = middleButtonValue;
			break;
		case 'right':
			studentAnswer = rightButtonValue;
			break;
	}
	if(studentAnswer == correctAnswer)
	{
		score++;
		document.getElementById("result").innerHTML = 'Correct!';
		changeHeightDynamic(score/index);
	}
	else
	{
		index++;
		document.getElementById("result").innerHTML = 'Incorrect, the correct answer was ' +correctAnswer+ '.';
		changeHeightDynamic(score/index);
	}
	
	setup();
}

function getPlaceForNumber(number, numberToIdentify)
{
	if((number + "")[0] == numberToIdentify){
		return "HUNDREDS";
	} else if((number + "")[1] == numberToIdentify){
		return "TENS";
	} else if ((number + "")[2] == numberToIdentify){
		return "ONES";
	}
}

function getOtherNumbersFromNumber(number, numberToIdentify)
{
	// var numberStr = number + "";
// 	for(int i = 0; i < numberStr.length; i++)
// 	{
// 		
// 	}
}

//Called from setup()
//Checks whether the game is over
//If it is, start game over animation
function isGameOver(){
	if(index == 10){
		alert("Game Over!");
	}
}
