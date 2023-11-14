// Задача о странных числах:
// Напишите функцию, которая принимает число и возвращает true, если это число является странным,
// и false в противном случае.
// Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

// Ознакомившись со статьей в Википедии о странных числах, пришел к выводу,
// что в задании имеется ввиду проверка числа на то, является ли оно совершенным.
// В связи с этим приведу ниже две функции для каждого из вариантов.

// Странное число — это натуральное число, которое является избыточным,
// но не является полусовершенным.
// Другими словами, сумма собственных делителей (делители, включая 1, но не включая себя)
// числа больше самого числа, но сложением подмножества делителей нельзя получить само число.

// Совершенное число — натуральное число, равное сумме всех своих собственных делителей
// (то есть всех положительных делителей, отличных от самого числа).

// Проверяем, является ли число странным
function isWeirdNumber(number) {
  let divisors = []; // Задаем пустой массив, в который будем помещать делители
  let subsets = []; // Задаем пустой массив, в который будем помещать подмножества

  // Проходимся циклом от 0 до числа
  for (let i = 0; i < number; i++) {
    number % i === 0 && divisors.push(i); // Если число делится на i без остатка, добавляем i в массив
  }

  if (divisors.reduce((acc, currentVal) => acc + currentVal, 0) > number) {
    for (let i = 0; i < divisors.length; i++) {
      subsets.push([]);
      subsets[i].push([divisors[i]]);
      for (let j = i + 1; j < divisors.length; j++) {
        // console.log(subsets[i]);
        current = subsets[i];
        // current.push([]);
        current[current.length - 1].push(divisors[j]);
      }
    }
  }

  // console.log(divisors);
  return subsets;
}

console.log(isWeirdNumber(70)); // true
// console.log(isWeirdNumber(836)); // true
// console.log(isWeirdNumber(20)); // false
// console.log(isWeirdNumber(421)); // false

// Проверяем, является ли число совешенным
// function isPerfectNumber(number) {
//   let divisors = []; // Задаем пустой массив, в который будем помещать делители

//   // Проходимся циклом от 0 до числа
//   for (let i = 0; i < number; i++) {
//     number % i === 0 && divisors.push(i); // Если число делится на i без остатка, добавляем i в массив
//   }

//   // возвращаеи результат совпадения суммы всех делителей с самим числом
//   return divisors.reduce((acc, currentVal) => acc + currentVal, 0) === number;
// }

// console.log(isPerfectNumber(6)); // true
// console.log(isPerfectNumber(28)); // true
// console.log(isPerfectNumber(5)); // false
// console.log(isPerfectNumber(41)); // false
