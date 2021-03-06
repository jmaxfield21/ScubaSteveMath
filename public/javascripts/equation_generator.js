/**
 * This is the JavaScript that will generate the numbers
 * that will make up the numbers that will be answered by the student
 * 
 * @author Jace
 * 
 */


/**
 * Level 1 Generator Functions
 * Number Recognition - Hawaii
 * This will generate a random number (between 1-999)
 * and will randomly select one of the digits
 */

function level1() {
	var min = 0;
	var max = 9;
	var one = Math.floor(Math.random() * ( max - min + 1) ) + min;
	var two = Math.floor(Math.random() * ( max - min) ) + min;
	var three = Math.floor(Math.random() * ( max - min) ) + min;
	var digits = new Array();
	digits[0] = "HUNDREDS";
	digits[1] = "TENS";
	digits[2] = "ONES";

	var bigNum = (100*one) + (10*two) + three;
	if (one ==  0) {
		var numPlace = Math.floor(Math.random() * 3) + 1;
		if (numPlace >= 3) {
			numPlace -= 1;
		}
	} else {
		var numPlace = Math.floor(Math.random() * ( 3 ));
	}
	var id = document.getElementById("output");

	var str = "The number is " + bigNum + ". What number is in the " + digits[numPlace] + " place?";
	id.innerHTML = str;
	var array = new Array();
	switch(digits[numPlace])
	{
		case "HUNDREDS":
			array[0]=one;
			array[1]=two;
			array[2]=three;
			return array;
			break;
		case "TENS":
			array[0]=two;
			array[1]=one;
			array[2]=three;
			return array;
			break;
		case "ONES":
			array[0]=three;
			array[1]=two;
			array[2]=one;
			return array;
			break;
		default:
			break;
	}
}

/**
 * Level 2 Generator Functions
 * Simple Addition - Great Barrier Reef
 * Numbers will be simple addition and both numbers will be <= 10
 */
function level2() {
	var min = 0;
	var max = 10;
	var first = Math.floor(Math.random() * ( max - min + 1) ) + min;
	var second = Math.floor(Math.random() * ( max - min + 1) ) + min;
	var id = document.getElementById("output");
	var str = first + " + " + second + " = ";
	id.innerHTML = str;
	var array = new Array();
	array[0] = first;
	array[1] = second;
	return array;
}

 /**
 * Level 3 Generator Functions
 * Simple Subtraction - Cancun, Mexico
 */
function level3() {
	var min = 0;
	var max = 10;
	var first = Math.floor(Math.random() * ( max - min + 1) ) + min;
	// Doing this ensure that the difference is positive
	var second = Math.floor(Math.random() * ( first - min + 1) ) + min;
	var id = document.getElementById("output");
	var str = first + " - " + second + " = ";
	id.innerHTML = str;
	var array = new Array();
	array[0] = first;
	array[1] = second; 
	return array;
}


 /**
 * Level 4 Generator Functions
 * Intermediate Addition & Subtraction - San Fruttuoso, Italy
 */
function level4() {
	var min = 0;
	var max = 50;
	var sym = new Array();
	sym[0] = "+";
	sym[1] = "-";
	var symbol = Math.floor(Math.random() * ( 2 ));
	first = Math.floor(Math.random() * ( max - min + 1) ) + min;

	if ( symbol == "+") {
		second = Math.floor(Math.random() * (max - min + 1) ) + min;
	} else {
		second = Math.floor(Math.random() * ( first - min + 1) ) + min;
	}
	var id = document.getElementById("output");
	var str = first + " " + sym[symbol] + " " + second;
	id.innerHTML = str;
	var array = new Array();
	array[0] = first;
	array[1] = second;
	array[2] = sym[symbol];
	return array;
}


 /**
 * Level 5 Generator Functions
 * Advanced Addition & Subtraction - Barracuda Point, Malaysia
 */
function level5() {
	var min = 0;
	var max = 99;
	var sym = new Array();
	sym[0] = "+";
	sym[1] = "-";
	var symbol = Math.floor(Math.random() * ( 2 ));

	if ( sym[symbol] == "+") {
		first = Math.floor(Math.random() * ( max - min + 1) ) + min;
		second = Math.floor(Math.random() * (max - min + 1) ) + min;
	} else {
		first = Math.floor(Math.random() * ( max - min + 1) ) + min;
		second = Math.floor(Math.random() * ( first - min + 1) ) + min;
	}
	var id = document.getElementById("output");
	var str = first + " " + sym[symbol] + " " + second;
	id.innerHTML = str;
	var array = new Array();
	array[0] = first;
	array[1] = second;
	array[2] = sym[symbol];
	return array;
}
//Called from setup()
//Creates random numbers to populate other multiple choices
function randomAnswer(level){
	var min, max;
	switch(level)
	{
		case 1:
				min = 0;
				max = 9;
				break;
		case 2:
				min = 0;
				max = 20;
				break;
		case 3:
				min = 0;
				max = 10;
				break;
		case 4:
				min = 0;
				max = 100;
				break;
		case 5:
				min = 0;
				max = 198;
				break;
	}
	var ranNum = Math.floor(Math.random() * ( max - min + 1) ) + min;
	return ranNum;
}