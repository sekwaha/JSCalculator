window.addEventListener('load', function () {

    let input = "";
    let history = "";
    let evaluated = false; // blocks certain actions occuring that lead to weird stuff

    let commaFormat = string => {
        return Number(string).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 });
    }

    let updateDisplay = () => {
        document.getElementById('input-screen').innerHTML = commaFormat(input);
        document.getElementById('history-screen').innerHTML = history;
    }

    let resetScreen = () => {
        input = "";
        history = "";
        evaluated = false;

        updateDisplay();
    }

    let numberButton = id => {
        document.getElementById('button-' + id).addEventListener('click', function () {

            if (evaluated) {
                resetScreen();
            }

            // prevents string beginning with 0, and caps entry length to 9
            if ((input.length == 0 && id == '0') || input.length > 9) return;
            else input += id;

            updateDisplay();
        })
    }

    let decimalButton = () => {
        document.getElementById('decimal-button').addEventListener('click', function() {

            if (evaluated) {
                resetScreen();
            }

            if (input.includes('.')) return; // only one decimal allowed per input
            else if (input.length == 0) {
                input += "0.";
            } else {
                input += ".";
            }

            updateDisplay();

        })
    }

    let operatorButton = operatorId => {
        document.getElementById(operatorId).addEventListener('click', function () {
            let operator;

            if (operatorId == 'divide-button') { operator = '/'}
            else if (operatorId == 'multiply-button') { operator = '*' }
            else if (operatorId == 'add-button') { operator = '+' }
            else { operator = '-' }
            if (evaluated) {
                evaluated = false;
            }

            // prevent operators being entered before the user has entered an input value
            // allows user to begin first entry with a minus operator, for negative numbers
            if (history.length == 0 && input.length == 0 && operator != '-') {
                return;
            } else if (history.length == 0 && input.length == 0 && operator == '-') {
                input = "-";
            } else if (isNaN(Number(history.substr(-1, 1))) && input.length == 0) {
                history = history.substr(0, history.length - 1) + operator;
            } else {
                history += input;
                history += operator;
                input = "";
            }

            updateDisplay();
        })
    }

    let backspaceButton = () => {

        if (evaluated) {
            return;
        }

        document.getElementById('backspace-button').addEventListener('click', function () {
            if (input.length > 0) {
                input = input.substr(0, input.length - 1);
                updateDisplay();
            }
        })
    }

    let clearButton = () => {
        document.getElementById('clear-button').addEventListener('click', function() {
            input = "";
            history = "";
            evaluated = false;

            updateDisplay();

        })
    }

    let evaluate = () => {
        document.getElementById('equals-button').addEventListener('click', function() {
            if (history.length != 0) {
                if (input.length == 0 && isNaN(Number(history.substr(-1, 1)))) {
                    history = history.substr(0, history.length - 1);
                } else {
                    history += input;
                }

                
                input = eval(history);


                updateDisplay();
                
                //reset input back to empty after evaluating - otherwise further entries are concatenated
                //onto output
                history = input.toString();
                input = "";
            }

            evaluated = true;
        })
    }

    // creating listeners for number buttons
    for (let i = 0; i < 10; i++) numberButton(i.toString());

    //listeners for operator and decimal buttons
    operatorButton('add-button');
    operatorButton('minus-button');
    operatorButton('multiply-button');
    operatorButton('divide-button');
    decimalButton();

    //listeners for backspace, clear and evaluation buttons
    backspaceButton();
    clearButton();
    evaluate();

    updateDisplay();

})