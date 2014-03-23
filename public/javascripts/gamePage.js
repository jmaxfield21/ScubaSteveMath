var index = 0;
var score = 0;
var correctAnswer;
var leftButtonValue;
var middleButtonValue;
var rightButtonValue;

//In future will accept the level number
function play()
{
	var level = 1;
	var wrongAnswers;
	var wrong1;
	var wrong2;
	switch(level)
	{
		case 1:
			correctAnswer = level1();
			wrongAnswers = randomAnswers();
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
			alert("Way to go idiot, you broke the game");
			break;
	}
}

function setButtons(correctAnswer, wrong1, wrong2){
	var randomAssignment = Math.floor(Math.random() * ( 3 - 1 + 1) ) + 1;
	var randomAssignment2 = Math.floor(Math.random() * ( 2 - 1 + 1) ) + 1;
	swtich (randomAssignment)
	{
		case 1:
			document.getElementById("answer1").value= correctAnswer;
			leftButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer2").value= wrong1;
					middleButtonValue = wrong1;
					document.getElementById("answer3").value= wrong2;
					rightButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer2").value= wrong2;
					middleButtonValue = wrong2;
					docuemnt.getElementById("answer3").value= wrong1;
					rightButtonValue = wrong1;
				}
			break;
		case 2:
			document.getElementById("answer2").value= correctAnswer;
			middleButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer1").value= wrong1;
					leftButtonValue = wrong1;
					document.getElementById("answer3").value= wrong2;
					rightButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer1").value= wrong2;
					leftButtonValue = wrong2;
					docuemnt.getElementById("answer3").value= wrong1;
					rightButtonValue = wrong1;
				}
			break;
		case 3:
			document.getElementById("answer3").value= correctAnswer;
			rightButtonValue = correctAnswer;
			if(randomAssignment2 == '1')
				{
					document.getElementById("answer2").value= wrong1;
					middleButtonValue = wrong1;
					document.getElementById("answer1").value= wrong2;
					leftButtonValue = wrong2;
				}
			else
				{
					document.getElementById("answer2").value= wrong2;
					middleButtonValue = wrong2;
					docuemnt.getElementById("answer1").value= wrong1;
					leftButtonValue = wrong1;
				}
			break;
	}
}

function runGame(level)
{
	index++;
	if(isCorrect(correctAnswer) == true)
	{
		score++;
	}
	
	switch(level)
	{
	case 1:
		changeHeightDynamic(score/10);
		break;
	case 2:
		changeHeightDynamic(score/15);
		break;
	case 3:
		changeHeightDynamic(score/20);
		break;
	case 4:
		changeHeightDynamic(score/25);
		break;
	case 5:
		changeHeightDynamic(score/30);
		break;
	}
	
	switch(level)
	{
	case 1:
		if(index == 9)
		//end game
		break;
	case 2:
		if(index == 14)
		//end game
		break;
	case 3:
		if(index == 19)
		//end game
		break;
	case 4:
		if(index == 24)
		//end game
		break;
	case 5:
		if(index == 29)
		//end game
		break; 
	}
	begin();
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
function isCorrect(studentAnswer, correctAnswer)
{
	if(studentAnswer == correctAnswer)
	{
		document.getElementById("answer").innerHTML = 'Correct!';
		return true;
	}
	else
	{
		document.getElementById("answer").innerHTML = 'Incorrect, the answer was ' + correctAnswer + '.';
		return false;
	}
}