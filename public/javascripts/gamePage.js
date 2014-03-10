function changeHeight(form)
{
	var input = form.input.value;
	switch(input)
	{
		case 20:
			document.getElementById("emptyTank").height=135px;
			alert("Set to 20% filled");
			break;
		case 40:
			document.getElementById("emptyTank").height=270px;
			alert("Set to 40% filled");
			break;
	}
}