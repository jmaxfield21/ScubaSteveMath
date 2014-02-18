function additionCreator(form)
{
    var firstNumber = form.firstNumber.value;
    var secondNumber = form.secondNumber.value;
    alert("Equation created: " +firstNumber+ "+" +secondNumber);
    //alert(firstNumber);
    //alert(secondNumber);
    //firstNumber and secondNumber to be sent to database
}

function rangeSetter(form)
{
    var firstRange = form.firstRange.value;
    var secondRange = form.secondRange.value;
    if(firstRange > secondRange)
    {
        alert("Range set: "+ secondRange+ "-" +firstRange);
    }
    else
    {
        alert("Range set: "+ firstRange+ "-" +secondRange);
    }
    return;
    //alert(firstRange);
    //alert(secondRange);
    // firstRange and secondRange to be sent to database
}



