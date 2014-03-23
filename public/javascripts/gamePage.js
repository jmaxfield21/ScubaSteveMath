var index = 0;
var score = 0;
var correctAnswer;
var leftButtonValue;
var middleButtonValue;
var rightButtonValue;

function setup()
{
	var level = 1;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	switch(level)
	{
		case 1:
			index = 10;
			correctAnswer = level1();
			wrongAnswers = randomAnswers(level);
			wrong1 = wrongAnswers[0];
			wrong2 = wrongAnswers[1];
			setButtons(correctAnswer, wrong1, wrong2);
			break;
		case 2:
			correctAnswer = level2();
			//generate answers
			break;
		case 3:
			correctAnswer = level3();
			//generate answers
			break;
		case 4:
			correctAnswer = level4();
			//generate answers
			break;
		case 5:
			correctAnswer = level5();
			//generate  answers
			break;
		default:
			break;
	}
}


function setButtons(correctAnswer, wrong1, wrong2){
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


function changeHeightDynamic(percent)
{
	//This method adjust the height of the emptyTank div
	//Input is the percent of tank that should be filled
	var input = percent * 100;
	var currentEmpty = 100-input;
	
	//Converts  from number to string
	currentEmpty = currentEmpty + "%";
	
	if(input == 0)
	{
		document.getElementById("emptyTank").style.height='100%';
		document.getElementById("emptyTank").style.borderRadius = '0px';
	}
	else
	{
		document.getElementById("emptyTank").style.height=currentEmpty;
		document.getElementById("emptyTank").style.borderBottomLeftRadius = '0px';
		document.getElementById("emptyTank").style.borderBottomRightRadius = '0px';
	}
	return input;
}

//isCorrect checks whether the student's answer is correct or not then prints message to 'answer' div
function isCorrect(selectedButton)
{
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

