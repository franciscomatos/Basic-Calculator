var currentNumber = '';
var toDoOperation = '';
var currentResult = 0;
var queuedNumber = 0; /*saves the last number operated, might be used if the user clicks multiple times in the equal sign*/
var flag = false; /*false means first operation*/
var multipleEqualFlag = false; /*true means equal has already been pressed*/


function updateNumber(n) {
    if(multipleEqualFlag) clearAll();

    if(currentNumber.length < 16) {
        var newNumber = currentNumber.concat('', n);
        document.getElementById('current-operation-space').innerHTML = newNumber;
        currentNumber = newNumber;
    }
}

function clearAll() {
    currentNumber = '';
    document.getElementById('current-operation-space').innerHTML = currentNumber;
    toDoOperation = '';
    currentResult = 0;
    queuedNumber = 0;
    flag = false;
    multipleEqualFlag = false;
}

function clearLast() {
    var newNumber = currentNumber.slice(0, currentNumber.length - 1);
    document.getElementById('current-operation-space').innerHTML = newNumber;
    currentNumber = newNumber;
    queuedNumber = 0;
    multipleEqualFlag = false;
}

function updateSignal() {
    if(currentNumber.startsWith('-')) {
        var newNumber = currentNumber.slice(1);
        document.getElementById('current-operation-space').innerHTML = newNumber;
        currentNumber = newNumber;
    } else {
        var newNumber = '-'.concat(currentNumber);
        document.getElementById('current-operation-space').innerHTML = newNumber;
        currentNumber = newNumber;
    }
}

function addDecimal() {
    var newNumber = currentNumber.concat('', '.');
    document.getElementById('current-operation-space').innerHTML = newNumber;
    currentNumber = newNumber;
}


function updateResult(signal) {

    var n = Number(currentNumber);

    if(flag) {
        switch(toDoOperation) {
            case '+':
                currentResult += n
                break;
            case '-':
                currentResult -= n;
                break;
            case 'x':
                currentResult *= n;
                break;
            case '/':
                currentResult /= n;
                break;
            case '^':
                currentResult = Math.pow(currentResult, n);
                break;
            default:
                break;
         }
    } else {
      currentResult = n;
    }
    toDoOperation = signal;
    flag = true;
    multipleEqualFlag = false;
    currentNumber = '';
    document.getElementById('current-operation-space').innerHTML = '';
    console.log('currentResult= ', currentResult, ' toDoOperation = ', toDoOperation);
}

function endResult() {
    var n;
    if(!multipleEqualFlag) {
        n = Number(currentNumber);
        queuedNumber = n;
    } else {
        n = queuedNumber;
    }
    /*does the math per say */
    switch(toDoOperation) {
        case '+':
            currentResult += n;
            break;
        case '-':
            currentResult -= n;
            break;
        case '*':
            currentResult *= n;
            break;
        case '/':
            currentResult /= n;
            break;
        case '^':
            currentResult = Math.pow(currentResult, n);
            break;
        default:
            break;
    }
    document.getElementById('current-operation-space').innerHTML = currentResult;
    currentNumber = currentResult;
    multipleEqualFlag = true;
    flag = false;
}
