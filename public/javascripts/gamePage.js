function changeHeight(form)
{
	var input = form.input.value;
	switch(true)
	{
		case (input==0):
			document.getElementById("emptyTank").style.height='100%';
			alert("Set to 0% filled");
			break;
		case (input==20):
			document.getElementById("emptyTank").style.height='80%';
			alert("Set to 20% filled");
			break;
		case (input==40):
			document.getElementById("emptyTank").style.height='60%';
			alert("Set to 40% filled");
			break;
		case (input==60):
			document.getElementById("emptyTank").style.height='40%';
			alert("Set to 60% filled");
			break;
		case (input==80):
			document.getElementById("emptyTank").style.height='20%';
			alert("Set to 80% filled");
			break;
		case (input==100):
			document.getElementById("emptyTank").style.height='0%';
			alert("Set to 100% filled");
			break;
		default:
			alert("Please enter an increment of 20");
	}
}

function changeHeightDynamic(form)
{
	var input = form.input.value;
	var currentEmpty = 100-input;
	currentEmpty = currentEmpty + "%";
	if(input == 0)
	{
		document.getElementById("emptyTank").style.height='100%';
		document.getElementById("emptyTank").style.borderRadius = '50px';
		alert("Tank set to empty");
	}
	else
	{
		document.getElementById("emptyTank").style.height=currentEmpty;
		document.getElementById("emptyTank").style.borderBottomLeftRadius = '0px';
		document.getElementById("emptyTank").style.borderBottomRightRadius = '0px';
		alert("Set to " +input+ "% filled.");
	}
}