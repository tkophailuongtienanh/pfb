
//constants
//var kMinDigits = 2; // unused currently

// declare global vars. reset in initGame
var NumDigits = 3;
var AllowZero = true;
var Answer = "";

//getRand
function getRand(lo,hi) {
if (Math.random === null) { // NN 2.0
	var dt = new Date();
	return lo + ((dt.getMinutes() * dt.getSeconds()) % (hi+1-lo));
	}
return lo + Math.floor(Math.random() * (hi+1-lo));
}

//getSelNum
function getSelNum(sel) {
return parseInt(sel.options[sel.selectedIndex].text);
}

//giveUp
function giveUp() {
alert("Pico Fermi Bagels\nanswer: " + Answer);
}

//newGame
function newGame(arg) {
//Answer = "";	// prevent some results?
document.PFB.guess1.focus();	// reset cursor to 1st guess
var elems = document.PFB.elements, i, elem;
for (i = 0; i < elems.length; i++) {
	elem = elems[i];
	if ((elem.name.indexOf("guess") === 0) || (elem.name.indexOf("result") === 0)) {
		elem.value = "";
		}
	}
generateAnswer();
}

//generateAnswer
function generateAnswer() {
Answer = "";	// new 'blank' answer
var i, rch, rdig, z9 = 9, dupDig, z0 = (AllowZero) ? 0 : 1;

for (i=0; i < NumDigits; i++) {
	// generate new digit in range, non-duplicate
	dupDig = true;
	while (dupDig) {
		rdig = getRand(z0,z9); // 0|1 - 9
		rch = "0123456789".substring(rdig,rdig+1); // NN 3.0 no substr?  rdig.toString();
		if (Answer.length === 0 || Answer.indexOf(rch) < 0)	{ // not present? .length for NN 3.0
				dupDig = false;
				}
		}

	Answer += rch; // add new digit

	// squeeze range to elim some dups
	if (rdig === z0) {
		z0++;
		}
	else if (rdig == z9) {
		z9--;
		}
	}
}

//evalGuess
function evalGuess(fguess, fresult) {
var guess = fguess.value;	// trim whitespace?
if (guess === "") {
	return;
	}

if (Answer === "") {
	initGame(false);	// e.g., IE5 didn't do onload?
	}

var i, fermi = 0, pico = 0, g1, result = "";

// check length of guess
if (guess.length != NumDigits) {
	result = NumDigits + " digits only";
	}
else {
	for (i=0; i < NumDigits; i++) {
		g1 = guess.substring(i,i+1);	// NN 3.0
		if (("0123456789".indexOf(g1) < 0) || (g1 === "0" && !AllowZero)) {
			result += g1 + " not valid; ";
			}
		else if (((i+1) < NumDigits) && (guess.indexOf(g1,i+1) > i)) {
			result += g1 + " duplicate; ";
			}
		else if (Answer.charAt(i) === g1.charAt(0)) {
			fermi++;
			}
		else if (Answer.indexOf(g1) >= 0) {
			pico++;
			}
	}
}

if (result === "") {
	if (pico===0 && fermi===0) {
		result = "Bagels";
		}
	else {
		for (i=0; i < fermi; i++) {
			result += "Fermi ";
			}
		if (fermi == NumDigits) {
			result += "!!!"; 
			}
		else {
			for (i=0; i < pico; i++) {
				result += "Pico ";
				}
			}
		}
	}
fresult.value = result;
// popup 'win' except recursive problem with alert and onFocus
}

//initGame
function initGame(ng) {
// set params to form values (init/reload)
AllowZero = document.PFB.fAllowZero.checked;
NumDigits = getSelNum(document.PFB.fNumDigits);
if (ng) {
	newGame(0);
	}
else {
	generateAnswer();
	}
}
//-->