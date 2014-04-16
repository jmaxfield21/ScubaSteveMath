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
	var level = 2;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	
	var problems = self.numbers.concat(level5Generator(self.remainingProblems));
	var answerArray =  self.answers[self.currentProblem-1];
	
	//for the randomly generated problems
	if(answerArray == undefined){
		var num1 = problems[self.currentProblem-1][0];
		var num2 = problems[self.currentProblem-1][1];
		var type = problems[self.currentProblem-1][2];
		answerArray = getAnswerArrayForNumber(num1, num2,type);
	}
	
	correctAnswer = answerArray[0];
	wrong1 = answerArray[1];
	wrong2 = answerArray[2];
	
	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
		wrong1 = randomAnswer(1);
		wrong2 = randomAnswer(1);
	}
	
	setNewQuestion(problems[self.currentProblem-1][0], problems[self.currentProblem-1][1], problems[self.currentProblem-1][2]);
	
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

function level5Generator(numberOfQuestionsNeeded) {
	var questions = new Array();
	var array = new Array();
	var min = 0;
	var max = 10;
	
	
	for(var i = 0; i < numberOfQuestionsNeeded; i++){
		var random = Math.round(Math.random() * 2);
		if(random == 0){
			questions[questions.length] = getAdditionProblem();
		} else if(random == 1){
			questions[questions.length] = getSubtractionProblem();
		} else {
			questions[questions.length] = getNumberRecognitionProblem();
		}
	}
	
	return questions;
}

function getAdditionProblem() {
	var array = new Array();
	var min = 0;
	var max = 100;
	
	var first = Math.floor(Math.random() *  max);
	var second = Math.floor(Math.random() * max);
	array[0] = first;
	array[1] = second;
	array[2] = "add";
	
	return array;
}

function getSubtractionProblem(){

	var array = new Array();
	var min = 0;
	var max = 100;
		
	var first = Math.floor(Math.random() * max);
	var second = Math.floor(Math.random() * first);

	array[0] = first;
	array[1] = second;
	array[2] = "sub";
	
	return array;
}

function getNumberRecognitionProblem() {
	//digits can only be 0-9
	var min = 0;
	var max = 9;
	var problemArray = new Array();
	var rtnArray = new Array();
	
	//Calculate digits
	var one = Math.floor(Math.random() * max);
	var two = Math.floor(Math.random() * max);
	var three = Math.floor(Math.random() * max);

	//create the array that will be used to randomly choose which place to ask for
	var digits = new Array();
	digits[0] = "HUNDREDS";
	digits[1] = "TENS";
	digits[2] = "ONES";

	//Get the big number
	var bigNum = (100*one) + (10*two) + three;
	var bigNumStr = bigNum + "";
	rtnArray[0] = bigNum;
	rtnArray[1] = bigNumStr[Math.floor(Math.random() * bigNumStr.length)];
	rtnArray[2] = "rec";
	
	return rtnArray;
}

function setNewQuestion(first, second, type){
	var id = document.getElementById("output");
	var str = "";
	
	if(type == "sub"){
		str = first + " - " + second + " = ";
	} else if(type == "add"){
		str = first + " + " + second + " = ";
	} else if(type == "rec"){
		str = "The number is " + first + ". What number is in the " + getPlaceForNumber(first,second) + " place?";
	}
	
	id.innerHTML = str;
};

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
};

//Called from isCorrect()
//Accepts the percent of the tank that should be filled
function changeHeightDynamic(percent)
{

	var currentEmpty = 100-percent;
	
	//Converts  from number to string
	currentEmpty = currentEmpty + "%";
	document.getElementById("emptyTank").style.height=currentEmpty;
};

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
		correct_sound.load();
		correct_sound.play();
		$(function(){
			$("#correct_image").fadeIn(500);
			$("#correct_image").fadeOut(1500);
		});
		changeHeightDynamic(tankSize);
	}
	else
	{
		document.getElementById("result").innerHTML = 'Incorrect, the correct answer was ' +correctAnswer+ '.';
		incorrect_sound.load();
		incorrect_sound.play();
		$(function(){
			$("#incorrect_image").fadeIn(500);
			$("#incorrect_image").fadeOut(1500);
		});
		changeHeightDynamic(tankSize);
	}
	self.currentProblem++;
	setup();
};

function getAnswerArrayForNumber(num1, num2, type)
{
	var answers = new Array();
	if(type == "sub"){
		answers[0] = parseInt(num1) - parseInt(num2);
	} else if(type == "rec"){
		answers = getAnswerArrayForNumberRecognition(num1, num2);
	} else {
		answers[0] = parseInt(num1) + parseInt(num2);
	}
	
	for(var i = 0; i < 3; i++){
		if(answers[i] == undefined){
			answers[i] = Math.floor(Math.random() * (answers[0]+40));
		}
	}
	
	return answers;
	
};

function getAnswerArrayForNumberRecognition(number, answer)
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
};

function getPlaceForNumber(number, numberToIdentify)
{
	
	var numString = number + "";
	var possiblePlaces = [];
	
	for(var i = 0; i < numString.length; i++){
		if(numString[i] == numberToIdentify){
			possiblePlaces[possiblePlaces.length] = i;
		}
	}
	
	var random = Math.floor(Math.random() * possiblePlaces.length);
	console.log(random + possiblePlaces.length);
	var indexToUse = possiblePlaces[random];
	
	if(numString.length == 3){
		if(indexToUse == 0){
			return "HUNDREDS";
		} else if(indexToUse == 1){
			return "TENS";
		} else if (indexToUse == 2){
			return "ONES";
		}
	} else if(numString.length == 2){
		if(indexToUse == 0){
			return "TENS";
		} else if(indexToUse == 1){
			return "ONES";
		} 
	} else if (numString.length == 1){
		return "ONES";
	}
};

//Called from setup()
//Checks whether the game is over
//If it is, prints dialog window informing student of result
function isGameOver(){
	if(index == 15){
		sendScore((Math.round((self.correctAnswers/self.totalQuestions)*100)));
		if(self.correctAnswers/self.totalQuestions >= .9){
			dialog('win');
		} else {
			dialog('loser');
		}
	}
};

function sendScore(score) 
{
	var scoreResponse = $.ajax({
	  type: "POST",
	  url: '/addscore',
	  data:{score:score,level:5},
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
	  data:{level:"5"},
	  dataType: 'json',
	  success: successL5Callback,
	  error: function(response){
	    console.log("cannont get equations");
		console.log(response);
	  },
	  async:   false
	});
};

var successL5Callback = function(response)
{
	var subProblems = response.subtractionProblems;
	var addProblems = response.additionProblems;
	var numRecBigNums = response.numbers;
	var numsToIdentify = response.numbersToIdentify;
	var numRecProblems = new Array();
	
	if(subProblems != undefined){
		subProblems.forEach(function(each){
			each[2] = "sub";	
		});
	}
	
	if(addProblems != undefined){
		addProblems.forEach(function(each){
			each[2] = "add";	
		});
	}
	
	if(numRecBigNums != undefined && numsToIdentify != undefined){
		for(var i = 0; i < numRecBigNums.length; i++){
			numRecProblems[i] = new Array();
			numRecProblems[i][0] = numRecBigNums[i];
			numRecProblems[i][1] = numsToIdentify[i];
			numRecProblems[i][2] = "rec";
		}
	}
	
	self.numbers = self.numbers.concat(addProblems);
	self.numbers = self.numbers.concat(subProblems);
	self.numbers = self.numbers.concat(numRecProblems);
	
	
	for(var i = 0; i < self.numbers.length; i++){
		self.answers[i] = getAnswerArrayForNumber(self.numbers[i][0], self.numbers[i][1],self.numbers[i][2]);
	}
	var numOfProblems = self.numbers.length;
	self.remainingProblems = self.totalQuestions - numOfProblems;
};

function dialog(result){
	if(result === 'win'){
		var output = document.getElementById("output");
		var button1 = document.getElementById("answer1");
		var button2 = document.getElementById("answer2");
		var button3 = document.getElementById("answer3");

		output.style.display = "none";
		button1.style.display = "none";
		button2.style.display = "none";
		button3.style.display = "none";

		setTimeout("location.href='/endgame';", "2500");
  	}
  	else{
  		$(function() {
    		$("#failed_dialog").dialog();
    		$("#failed_dialog").draggable({disabled:true});
  		});
  	}
}

initialSetup();