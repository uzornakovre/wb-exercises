// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций,
// используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// Будет плюсом, если задумаетесь и об оптимизации.

function MathX() {
  // метод получения чисел Фибоначчи
  const getFibonacci = (nth) => {
    let a = 1; // задаем первое число
    let b = 1; // задаем второе число
    let sequence = [1]; // задаем последовательность

    // если N-ое число больше 1, добавляем в последовательность второе число
    if (nth > 1) sequence.push(b);

    // проходимся циклом от 3 до N-го числа
    for (let i = 3; i <= nth; i++) {
      let c = a + b;
      a = b; // b становится предыдущим числом
      b = c; // новое b состоит из суммы a и b
      sequence.push(b); // добавляем в последовательность b
    }

    // возвращаем N-оe число и последовательность
    return { number: b, sequence };
  };

  // функция проверки, является ли число простым
  const isPrime = (number) => {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) return false;
    }
    return true;
  };

  // метод получения простых чисел
  const getPrime = (nth) => {
    let a = 2; // первое число 2
    let sequence = []; // задаем последовательность

    // пока последовательность короче N-го числа
    while (sequence.length < nth) {
      // проверяем число, если оно простое
      if (isPrime(a)) {
        sequence.push(a); // добавляем в последовательность
      }
      a++; // увеличиваем значение на 1
    }

    // возвращаем N-ое число и последовательность
    return { number: sequence[sequence.length - 1], sequence };
  };

  return { getFibonacci, getPrime };
}

const fib = MathX().getFibonacci;
const prime = MathX().getPrime;

console.log(fib(10).number);
console.log(fib(10).sequence);

console.log(prime(5).number);
console.log(prime(5).sequence);
