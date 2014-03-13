function changeHeightDynamic(form)
{
	//This method adjust the height of the emptyTank div
	//Input is the percent of tank that should be filled
	var input = form.input.value;
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
}

//isCorrect checks whether the student's answer is correct or not then prints message to 'answer' div
function isCorrect(correctAnswer, studentAnswer)
{
	if(studentAnswer == correctAnswer)
	{
		document.getElementById("answer").innerHTML = 'Correct!';
	}
	else
	{
		document.getElementById("answer").innerHTML = 'Incorrect, the answer was ' + correctAnswer + '.';
	}
}