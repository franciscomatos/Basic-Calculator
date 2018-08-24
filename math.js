var currentNumber = '';
var toDoOperation = '';
var currentResult = 0;
/*var entireExpression = '';*/
var queuedNumber = 0; /*saves the last number operated, might be used if the user clicks multiple times in the equal sign 
or clicks a signal after pressing the equal sign*/
var flag = false; /*false means first operation*/
var multipleEqualFlag = false; /*true means equal has already been pressed*/



function updateNumber(n) {
    if(multipleEqualFlag) clearAll();

    if(currentNumber.length < 16) {
        var newNumber = currentNumber.concat('', n);
        document.getElementById('current-operation-space').innerHTML = newNumber;
        currentNumber = newNumber;
    }
    console.log(currentNumber);
}

function clearAll() {
    currentNumber = '';
    document.getElementById('current-operation-space').innerHTML = currentNumber;
    /*document.getElementById('previous-operation-space').innerHTML = '';*/
    toDoOperation = '';
    currentResult = 0;
    /*entireExpression = '';*/
    queuedNumber = 0;
    flag = false;
    multipleEqualFlag = false;
}

function clearLast() {
    console.log(currentNumber);
    var newNumber = currentNumber.slice(0, currentNumber.length - 1);
    console.log(newNumber);
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

/*
function updateExpression(signal) {
    if(multipleEqualFlag == true) {
        console.log('chegou ao else');
        entireExpression += ' ' + signal + ' ';
        currentNumber = '';
        document.getElementById('previous-operation-space').innerHTML = entireExpression;
        document.getElementById('current-operation-space').innerHTML = '';
    } else {
        entireExpression = entireExpression + currentNumber + ' ' + signal + ' ';
        currentNumber = '';
        document.getElementById('previous-operation-space').innerHTML = entireExpression;
        document.getElementById('current-operation-space').innerHTML = '';
    }
    multipleEqualFlag = false;
}*/


function updateResult(signal) {
    var n = Number(currentNumber);
    if(flag) {
        switch(toDoOperation) {
            case '+':
                console.log('gonna operate: ', currentResult, ' ',toDoOperation, ' ', n);
                currentResult += n;
                console.log('currentResult = ',currentResult);
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
            default:
                break;
         }
    } else {
        currentResult = n;
        console.log('currentResult = ',currentResult);
    } 
    toDoOperation = signal;
    flag = true;
    currentNumber = '';
    document.getElementById('current-operation-space').innerHTML = '';
    console.log('currentNumber = ', currentNumber);
}

function endResult() {
    var n;
    /*this condition updates the 'entireExpression' depending on whether it is the 
      first operation*/
    if(!multipleEqualFlag) {
        n = Number(currentNumber);
        console.log('multipleEqualFlag = ', multipleEqualFlag);
        queuedNumber = n;
        console.log('queuedNumber = ', queuedNumber);
        /*entireExpression = entireExpression + currentNumber;
        console.log('entireExpression = ', entireExpression);*/
    } else {
        console.log('chegou aqui');
        n = queuedNumber;
        /*entireExpression = entireExpression + ' ' + toDoOperation + ' ' + n.toString();*/
    }
    /*does the math per say */
    switch(toDoOperation) {
        case '+':
            currentResult += n;
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
        default:
            break;
    }
    document.getElementById('current-operation-space').innerHTML = currentResult;
    /*document.getElementById('previous-operation-space').innerHTML = entireExpression;*/
    currentNumber = currentResult;
    multipleEqualFlag = true;
    flag = false;
    console.log('operacao concluida. resultado: ', currentResult);
} 