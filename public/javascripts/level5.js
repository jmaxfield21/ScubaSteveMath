var index = 0;
var score = 0;
var tankSize = 0;
var correctAnswer;
var leftButtonValue;
var middleButtonValue;
var rightButtonValue;

//Called from html play button on click
//Sets up the equation
function setup()
{
	isGameOver();
	var wrong1 = randomAnswer(5);
	var wrong2 = randomAnswer(5);
	var answerArray = level5();
	if(answerArray[2] == '-')
		correctAnswer = answerArray[0] - answerArray[1];
	else
		correctAnswer = answerArray[0] + answerArray[1];
	while(correctAnswer == wrong1 || correctAnswer == wrong2 || wrong1 == wrong2){
		wrong1 = randomAnswer(5);
		wrong2 = randomAnswer(5);
	}
	setButtons(correctAnswer, wrong1, wrong2);
	var playButton = document.getElementById("play");
	playButton.style.display = "none";
	var answer1 = document.getElementById("answer1");
	answer1.style.visibility = "visible";
	var answer2 = document.getElementById("answer2");
	answer2.style.visibility = "visible";
	var answer3 = document.getElementById("answer3");
	answer3.style.visibility = "visible";
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
		score++;
		tankSize = tankSize + 3.33333;
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
		correct_sound.load();
		correct_sound.play();
		$(function(){
			$("#incorrect_image").fadeIn(500);
			$("#incorrect_image").fadeOut(1500);
		});
		changeHeightDynamic(tankSize);
	}
	
	setup();
}

//Called from setup()
//Checks whether the game is over
//If it is, start game over animation
function isGameOver(){
	if(index == 30){
		if(score/index >= .9)
			dialog('win');
		else
			dialog('loser');
	}
}

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

		setTimeout("location.href='/levelsuccess';", "2500");
  	}
  	else{
  		$(function() {
    		$("#failed_dialog").dialog();
    		$("#failed_dialog").draggable({disabled:true});
  		});
  	}
}