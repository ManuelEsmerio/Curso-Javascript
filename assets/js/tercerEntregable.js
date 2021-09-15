let number = 0;
let listNumber = [];

while (!isNaN(number)) {
  number = parseInt(prompt("Ordenamiento de numeros (Dame una lista de numeros)"));
  (!isNaN(number)) && listNumber.push(number);
}

const methodBurbuja = (list) => {
  let n, i, k, aux;
  n = list.length;
  for (k = 1; k < n; k++) {
    for (i = 0; i < (n - k); i++) {
      if (list[i] > list[i + 1]) {
        aux = list[i];
        list[i] = list[i + 1];
        list[i + 1] = aux;
      }
    }
  }

  return list
}

alert(`Los numeros que ingresaste ordenados son: \n ${methodBurbuja(listNumber)} `);