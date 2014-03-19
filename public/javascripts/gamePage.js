var index = 0;
var score = 0;
var correctAnswer;

function begin(level)
{
	switch(level)
	{
		case 1:
			correctAnswer = level1();
			//generate answers
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