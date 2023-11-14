// Задача о коллекции функций: у вас есть массив функций, напишите код,
// который вызовет каждую функцию в этом массиве и выведет их порядковый номер.
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

const funcArray = [
  () => new Promise((res) => setTimeout(() => res("Function 1"), 1000)),
  () => new Promise((res) => setTimeout(() => res("Function 2"), 800)),
  () => new Promise((res) => setTimeout(() => res("Function 3"), 200)),
  () => new Promise((res) => setTimeout(() => res("Function 4"), 1100)),
  () => new Promise((res) => setTimeout(() => res("Function 5"), 500)),
];

async function callSequentially(functions) {
  for (let i = 0; i < functions.length; i++) {
    console.log(await functions[i]());
  }
}

callSequentially(funcArray);
