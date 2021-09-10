let n = parseInt(prompt(`Dame un número al que le quiereas sacar el factorial`));
const factorial = (n) => (n <= 1) ?  1 :  factorial( n -1 ) * n;
alert(`Tu número factorial es: ${factorial(n)}`);