window.addEventListener('load', function () {

    let calcState = {
        input: '',
        history: '',
        evaluated: false,
        operatorIds: ['add-button', 'minus-button', 'multiply-button', 'divide-button']
    }

    let commaFormat = string => {
        return Number(string).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 10
        });
    }

    let updateDisplay = () => {

        document.getElementById('input-screen').innerHTML = commaFormat(calcState.input);


        document.getElementById('history-screen').innerHTML = calcState.history;
        /*

        I don't know why, but the following should work but instead screws everything up
    

        // the following assigns or removes a class to the decimal button element used to change
        // colour of the decimal button when it's been clicked during an input

        let decimal = document.getElementById('decimal-button');

        if (input.length == 0 && !decimal.classList.contains('decimal-clicked')) {
            return;
        } else if (input.length == 0 && decimal.classList.contains('decimal-clicked')) {
            decimal.classList.remove('decimal-clicked');
            this.console.log('removed')
        } else if (input.substr(-1, 1) == '.' && !decimal.classList.contains('decimal-clicked')) {
            decimal.classList.add('decimal-clicked');
        } else if (input.substr(-1, 1) != '.' && decimal.classList.contains('decimal-clicked')) {
            decimal.classList.remove('decimal-clicked');
        } else {
            return;
        }
        */

    }

    let resetScreen = () => {
        calcState.input = "";
        calcStatehistory = "";
        calcState.evaluated = false;

        updateDisplay();
    }

    let numberButton = id => {

        if (calcState.evaluated) {
            resetScreen();
        }

        // prevents string beginning with 0, and caps entry length to 9
        if ((calcState.input.length == 0 && id == '0') || calcState.input.length > 9) return;
        else calcState.input += id;

        updateDisplay();

    }

    let keyPress = () => {

        document.addEventListener('keydown', event => {

            if (event.keyCode == 48 || event.keyCode == 96) {
                numberButton('0');
            }
            if (event.keyCode == 49 || event.keyCode == 97) {
                numberButton('1');
            }
            if (event.keyCode == 50 || event.keyCode == 98) {
                numberButton('2');
            }
            if (event.keyCode == 51 || event.keyCode == 99) {
                numberButton('3');
            }
            if (event.keyCode == 52 || event.keyCode == 100) {
                numberButton('4');
            }
            if (event.keyCode == 53 || event.keyCode == 101) {
                numberButton('5');
            }
            if (event.keyCode == 54 || event.keyCode == 102) {
                numberButton('6');
            }
            if (event.keyCode == 55 || event.keyCode == 103) {
                numberButton('7');
            }
            if (event.keyCode == 56 || event.keyCode == 104) {
                numberButton('8');
            }
            if (event.keyCode == 57 || event.keyCode == 105) {
                numberButton('9');
            }
            if ((event.shiftKey && event.keyCode == 61) || event.keyCode == 107) {
                operatorButton('add-button');
            }
            if (event.keyCode == 173 || event.keyCode == 109) {
                operatorButton('minus-button');
            }
            if ((event.shiftKey && event.keyCode == 56) || event.keyCode == 106) {
                operatorButton('multiply-button');
            }
            if (event.keyCode == 191 || event.keyCode == 111) {
                operatorButton('divide-button');
            }
            if (event.keyCode == 110 || event.keyCode == 190) {
                decimalButton();
            }
            if (event.keyCode == 8) {
                backspaceButton();
            }
            if (event.keyCode == 27) {
                clearButton();
            }
            if (event.keyCode == 61 || event.keyCode == 13) {
                evaluate();
            }
        })
    }


    let decimalButton = () => {

        if (calcState.evaluated) {
            resetScreen();
        }

        if (calcState.input.includes('.')) return; // only one decimal allowed per input
        else if (calcState.input.length == 0) {
            calcState.input += "0.";
        } else {
            calcState.input += ".";
        }

        updateDisplay();

    }

    let operatorButton = operatorId => {
        let operator;

        if (operatorId == 'divide-button') {
            operator = '/'
        } else if (operatorId == 'multiply-button') {
            operator = '*'
        } else if (operatorId == 'add-button') {
            operator = '+'
        } else {
            operator = '-'
        }
        if (calcState.evaluated) {
            calcState.evaluated = false;
        }

        // prevent operators being entered before the user has entered an input value
        // allows user to begin first entry with a minus operator, for negative numbers
        if (calcState.history.length == 0 && calcState.input.length == 0 && operator != '-') {
            return;
        } else if (calcState.history.length == 0 && calcState.input.length == 0 && operator == '-') {
            input = "-";
        } else if (isNaN(Number(calcState.history.substr(-1, 1))) && calcState.input.length == 0) {
            calcState.history = calcState.history.substr(0, calcState.history.length - 1) + operator;
        } else {
            calcState.history += calcState.input;
            calcState.history += operator;
            calcState.input = "";
        }

        updateDisplay();

    }

    let backspaceButton = () => {

        if (calcState.evaluated) {
            return;
        }

        if (calcState.input.length > 0) {
            calcState.input = calcState.input.substr(0, calcState.input.length - 1);
            updateDisplay();
        }

    }

    let clearButton = () => {

        calcState.input = "";
        calcState.history = "";
        calcState.evaluated = false;

        updateDisplay();
    }

    let evaluate = () => {

        if (calcState.history.length != 0) {
            if (calcState.input.length == 0 && isNaN(Number(calcState.history.substr(-1, 1)))) {
                calcState.history = calcState.history.substr(0, calcState.history.length - 1);
            } else {
                calcState.history += calcState.input;
            }


            calcState.input = eval(calcState.history).toString();


            updateDisplay();

            //reset input back to empty after evaluating - otherwise further entries are concatenated
            //onto output
            calcState.history = calcState.input;
            calcState.input = "";
        }

        calcState.evaluated = true;

    }

    // event listeners for number buttons

    for (let i = 0; i < 10; i++) {
        document.getElementById('button-' + i.toString()).addEventListener('click', function () {
            numberButton(i.toString())
        })
    }

    // event listeners for operator and decimal buttons

    for (let i = 0; i < calcState.operatorIds.length; i++) {
        document.getElementById(calcState.operatorIds[i]).addEventListener('click', function () {
            operatorButton(calcState.operatorIds[i]);
        })
    }

    // event listeners for equals, clear and backspace buttons

    document.getElementById('equals-button').addEventListener('click', function () {
        evaluate();
    })

    document.getElementById('backspace-button').addEventListener('click', function () {
        backspaceButton();
    })

    document.getElementById('clear-button').addEventListener('click', function () {
        clearButton();
    })

    // event listener for decimal button

    document.getElementById('decimal-button').addEventListener('click', function () {
        decimalButton();
    })

    //listeners for keypresses
    keyPress();


    updateDisplay();

})

//todo ------ change how backspace and clear button work - remove event listeners within functions