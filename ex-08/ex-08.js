// Задача о замыканиях: напишите функцию, которая будет принимать
// массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве
// и возвращает массив результатов, полученных после вызова каждой функции.

const funcArray = [
  () => "Function 1",
  () => "Function 2",
  () => "Function 3",
  () => "Function 4",
  () => "Function 5",
];

function getResultArray(functions) {
  let result = "";

  return () => {
    functions.forEach((f) => (result += f() + "; "));
    return result;
  };
}

const renderResultArray = getResultArray(funcArray);
console.log(renderResultArray());
