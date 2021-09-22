export default class Operation{
    multiplication (num1, num2) {return parseFloat(num1 * num2)};
    subtraction (num1, num2) {return parseFloat(num1 - num2)};
    sum (num1, num2) {return parseFloat(num1 + num2)};

    getIVA (num) { return Math.round(parseFloat(num / 1.16)) };
    getDiscount(num, discount = 0) { return Math.round(parseFloat(num * (discount / 100)))};
    
}