function eval() {
    return;
}

const expressionCalculator = (expr) => {

    const calcSimple = (firstOperand, action, secondOperand) => {
        const doAction = {
            '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
            '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
            '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
            '/': (firstOperand, secondOperand) => {
                if (secondOperand === 0) {
                    throw new Error('TypeError: Division by zero.');
                } else return firstOperand / secondOperand;
            }
        }
        return doAction[action](firstOperand, secondOperand);
    }

    const calcWithBrakets = (str) => {
        if (str.includes('(')) {
            str = str.slice(1, -1);
        }
        let arr = str.split(' ');
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === '*' || arr[i] === '/') {
                let result = calcSimple(+arr[i - 1], arr[i], +arr[i + 1]);
                arr.splice(i - 1, 3, result);
                i = 0;
            }
        }
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === '+' || arr[i] === '-') {
                let result = calcSimple(+arr[i - 1], arr[i], +arr[i + 1]);
                arr.splice(i - 1, 3, result);
                i = 0;
            }
        }
        return arr[0];
    }

    const brackets = (str) => {
        let openBracets = str.split('').filter(el => el === '(').length;
        let closeBracets = str.split('').filter(el => el === ')').length;
        if (openBracets !== closeBracets) throw new Error('ExpressionError: Brackets must be paired');
    }

    brackets(expr);
    expr = expr.split('').filter(el => el !== ' ').join('');
    let reg = /[-+*/]/g;
    expr = expr.replace(reg, ' $& ');
    let exp = /\([^()]*\)/;
    while (expr.includes('(')) {
        expr = expr.replace(exp, calcWithBrakets);
    }
    expr = calcWithBrakets(expr);
    return +expr;
}

module.exports = {
    expressionCalculator
}
