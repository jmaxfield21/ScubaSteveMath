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
self.totalQuestions = 15;

//runs when this file is loaded
function initialSetup(){
	getEquations();
}

//Called from HTML play button on click
//Sets up the equation
function setup()
{
	isGameOver();
	var level = 1;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	
	var problems = self.numbers.concat(level2Generator(self.remainingProblems));
	var answerArray =  self.answers[self.currentProblem-1];
	
	//for the randomly generated problems
	if(answerArray == undefined){
		var num1 = problems[self.currentProblem-1][0];
		var num2 = problems[self.currentProblem-1][1];
		answerArray = getAnswerArrayForNumber(num1, num2);
	}
	
	correctAnswer = answerArray[0];
	wrong1 = answerArray[1];
	wrong2 = answerArray[2];
	
	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
		wrong1 = randomAnswer(1);
		wrong2 = randomAnswer(1);
	}
	
	setNewQuestion(problems[self.currentProblem-1][0], problems[self.currentProblem-1][1]);
	
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
// function setup()
// {
// 	isGameOver();
// 	var wrong1 = randomAnswer(2);
// 	var wrong2 = randomAnswer(2);
// 	var answerArray = level2();
// 	correctAnswer = answerArray[0] + answerArray[1];
// 	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
// 		wrong1 = randomAnswer(2);
// 		wrong2 = randomAnswer(2);
// 	}
// 	setButtons(correctAnswer, wrong1, wrong2);
// 	var playButton = document.getElementById("play");
// 	playButton.style.display = "none";
// }

function level2Generator(numberOfQuestionsNeeded) {
	var questions = new Array();
	var array = new Array();
	var min = 0;
	var max = 10;
	
	
	for(var i = 0; i < numberOfQuestionsNeeded; i++){
		var first = Math.floor(Math.random() * ( max - min + 1) ) + min;
		var second = Math.floor(Math.random() * ( max - min + 1) ) + min;
		array[0] = first;
		array[1] = second;
		questions[questions.length] = array;
	}
	
	return questions;
}

function setNewQuestion(first, second){
	var id = document.getElementById("output");
	var str = first + " + " + second + " = ";
	id.innerHTML = str;
}

//Called from setup()
//Used to set up the multiple choice buttons
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

//Called from html Answer buttons onclick
//Accepts the students answer
//Prints dialog along with adjusting tank
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
		tankSize = tankSize + 6.66666;
		document.getElementById("result").innerHTML = 'Correct!';
		changeHeightDynamic(tankSize);
	}
	else
	{
		document.getElementById("result").innerHTML = 'Incorrect, the correct answer was ' +correctAnswer+ '.';
		changeHeightDynamic(tankSize);
	}
	self.currentProblem++;
	setup();
}

function getAnswerArrayForNumber(num1, num2)
{
	var answers = new Array();
	answers[0] = parseInt(num1) + parseInt(num2);
	
	// if((number + "")[0] != answer){
	// 	answers[nonAnswerIndex] = (number + "")[0];
	// 	nonAnswerIndex++;
	// }
	//  
	// if((number + "")[1] != answer){
	// 	answers[nonAnswerIndex] = (number + "")[1];
	// 	nonAnswerIndex++;
	// } 
	// 
	// if ((number + "")[2] != answer){
	// 	answers[nonAnswerIndex] = (number + "")[2];
	// 	nonAnswerIndex++;
	// }
	
	for(var i = 0; i < 3; i++){
		if(answers[i] == undefined){
			answers[i] = Math.floor(Math.random() * 20);
		}
	}
	
	return answers;
	
}

//Called from setup()
//Checks whether the game is over
//If it is, prints dialog window informing student of result
function isGameOver(){
	if(index == 15){
		if(self.correctAnswers/self.totalQuestions >= .9)
			dialog('win');
		else
			dialog('loser');
	}
	sendScore((Math.round((self.correctAnswers/self.totalQuestions)*100)));
}

function sendScore(score) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addscore',
	  data:{score:score,level:2},
	  dataType: 'json',
	  success: function(){},
	  error: function(response){
	    console.log("cannont send score");
		console.log(response);
	  },
	  async:   false
	});
};

var getEquations = function() 
{
	var equationsResponse = $.ajax({
	  type: "POST",
	  url: '/getequations',
	  data:{level:"2"},
	  dataType: 'json',
	  success: successL2Callback,
	  error: function(response){
	    console.log("cannont get equations");
		console.log(response);
	  },
	  async:   false
	});
}

var successL2Callback = function(response)
{
	self.numbers = response.additionProblems;
	
	for(var i = 0; i < self.numbers.length; i++){
		self.answers[i] = getAnswerArrayForNumber(self.numbers[i][0], self.numbers[i][1]);
	}
	var numOfProblems = self.numbers.length;
	self.remainingProblems = self.totalQuestions - numOfProblems;
};

//Called from isGameOver()
//JQuery function that creates dialog window
//Informs student of level result
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