var index = 0;
var score = 0;
var tankSize = 0;
var correctAnswer;
var leftButtonValue;
var middleButtonValue;
var rightButtonValue;
var self = this;
self.currentProblem = 1;
self.answers = new Array();
self.numbers = new Array();
self.correctAnswers = 0;
self.totalQuestions = 10;

function initialSetup(){
	getEquations();
}

function setup()
{
	isGameOver();
	var level = 1;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	
	var bigNumbersArray = self.numbers.concat(level1Generator(self.remainingProblems));
	var answerArray =  self.answers[self.currentProblem-1];
	
	//for the randomly generated problems
	if(answerArray == undefined){
		var bigNumString = bigNumbersArray[self.currentProblem-1] + "";
		answerArray = getAnswerArrayForNumber(bigNumbersArray[self.currentProblem-1], bigNumString[Math.floor(Math.random() * ( bigNumString.length - 1 ))]);
	}
	
	correctAnswer = answerArray[0];
	wrong1 = answerArray[1];
	wrong2 = answerArray[2];
	
	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
		wrong1 = randomAnswer(1);
		wrong2 = randomAnswer(1);
	}
	
	setNewQuestion(bigNumbersArray[self.currentProblem-1], correctAnswer);
	
	setButtons(correctAnswer, wrong1, wrong2);
	var playButton = document.getElementById("play");
	playButton.style.display = "none";
	var answer1 = document.getElementById("answer1");
	answer1.style.visibility = "visible";
	var answer2 = document.getElementById("answer2");
	answer2.style.visibility = "visible";
	var answer3 = document.getElementById("answer3");
	answer3.style.visibility = "visible";
};

var getEquations = function() 
{
	var equationsResponse = $.ajax({
	  type: "POST",
	  url: '/getequations',
	  data:{level:"1"},
	  dataType: 'json',
	  success: successL1Callback,
	  error: function(response){
	    console.log("cannont get equations");
		console.log(response);
	  },
	  async:   false
	});
}

function sendScore(score) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addscore',
	  data:{score:score,level:1},
	  dataType: 'json',
	  success: function(){},
	  error: function(response){
	    console.log("cannont send score");
		console.log(response);
	  },
	  async:   false
	});
}


var successL1Callback = function(response)
{
	self.numbers = response.numbers;
	var numbersToIdentify = response.numbersToIdentify;
	for(var i = 0; i < numbersToIdentify.length; i++){
		self.answers[i] = getAnswerArrayForNumber(self.numbers[i], numbersToIdentify[i]);
	}
	var numOfProblems = self.numbers.length;
	self.remainingProblems = 10 - numOfProblems;
};

function level1Generator(number) {
	//digits can only be 0-9
	var min = 0;
	var max = 9;
	var problemArray = new Array();
	
	for(var i = 0; i < number; i++){
		//Calculate digits
		var one = Math.floor(Math.random() * ( max - min + 1) ) + min;
		var two = Math.floor(Math.random() * ( max - min) ) + min;
		var three = Math.floor(Math.random() * ( max - min) ) + min;
	
		//create the array that will be used to randomly choose which place to ask for
		var digits = new Array();
		digits[0] = "HUNDREDS";
		digits[1] = "TENS";
		digits[2] = "ONES";

		//Get the big number
		var bigNum = (100*one) + (10*two) + three;
	
		//if the number is only 2 digits, don't ask about the hundreds digit, if only 1 digit, don't ask about other 2
		if (one ==  0) {
			var numPlace = Math.ceil(Math.random() * 2);
		} else if(one ==  0 && two == 0){
			var numPlace = 2;
		} else {
			var numPlace = Math.floor(Math.random() * ( 3 ));
		}
	
		//Fills up the array with the correct answer first and returns it
		
		switch(digits[numPlace])
		{
			case "HUNDREDS":
				problemArray[problemArray.length] = bigNum;
				break;
			case "TENS":
				problemArray[problemArray.length] = bigNum;
				break;
			case "ONES":
				problemArray[problemArray.length] = bigNum;
				break;
			default:
				break;
		}
	}
	
	return problemArray;
}

function setNewQuestion(bigNumber, smallNumber){
	var id = document.getElementById("output");
	var str = "The number is " + bigNumber + ". What number is in the " + getPlaceForNumber(bigNumber,smallNumber) + " place?";
	id.innerHTML = str;
}

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
		self.correctAnswers++;
		tankSize = tankSize + 10;
		document.getElementById("result").innerHTML = 'Correct!';
		$(function(){
			$("#correct_image").fadeIn(500);
			$("#correct_image").fadeOut(1500);
		});
		changeHeightDynamic(tankSize);
	}
	else
	{
		document.getElementById("result").innerHTML = 'Incorrect, the correct answer was ' +correctAnswer+ '.';
		$(function(){
			$("#incorrect_image").fadeIn(500);
			$("#incorrect_image").fadeOut(1500);
		});
		changeHeightDynamic(tankSize);
	}
	
	self.currentProblem++;
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

function getAnswerArrayForNumber(number, answer)
{
	var answers = new Array();
	answers[0] = answer + "";
	var nonAnswerIndex = 1;
	
	if((number + "")[0] != answer){
		answers[nonAnswerIndex] = (number + "")[0];
		nonAnswerIndex++;
	}
	 
	if((number + "")[1] != answer){
		answers[nonAnswerIndex] = (number + "")[1];
		nonAnswerIndex++;
	} 
	
	if ((number + "")[2] != answer){
		answers[nonAnswerIndex] = (number + "")[2];
		nonAnswerIndex++;
	}
	
	for(var i = 0; i < 3; i++){
		if(answers[i] == undefined){
			answers[i] = Math.floor(Math.random() * 10);
		}
	}
	
	return answers;
	
}

//Called from setup()
//Checks whether the game is over
//If it is, start game over animation
function isGameOver(){
	if(index == 10){
		if(score/index >= .9){
			dialog('win');
		} else {
			dialog('loser');
		}
		sendScore(Math.floor((self.correctAnswers/self.totalQuestions)*100));
	}
}

function dialog(result){
	
	if(result === 'win'){
		$(function() {
    		$( "#success_dialog" ).dialog();
			$("#finalScoreSuccess").append(Math.floor((self.correctAnswers/self.totalQuestions)*100) + "%");
  		});
  	}
  	else{
  		$(function() {
    		$( "#failed_dialog" ).dialog();
			$("#finalScoreFail").append(Math.floor((self.correctAnswers/self.totalQuestions)*100) + "%");
  		});
  	}
}
initialSetup();