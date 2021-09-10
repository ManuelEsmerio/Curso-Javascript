let n = parseInt(prompt(`Dame un número al que le quieras sacar el factorial`));

if (!isNaN(n)) {
    const factorial = (n) => (n <= 1) ?  1 :  factorial( n -1 ) * n;
    alert(`Tu número factorial es: ${factorial(n)}`);
}else{
    alert(`El valor capturado: ${n} no es número.`);
}
