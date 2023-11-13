// Задача о палиндроме:
// Напишите функцию, которая проверяет, является ли заданная строка палиндромом.
// Палиндром — это строка, которая читается одинаково
// в обоих направлениях (например, «аргентина манит негра»).

function isPalindrome(string) {
  let formattedString = string // форматируем входящую строку
    .split("") // расщепляем на массив
    .filter((char) => char.toLowerCase() !== char.toUpperCase()) // фильтруем массив от лишних символов
    .join("") // соединяем массив в строку
    .toLowerCase(); // переводим в нижний регистр для последующего сравнения

  // возвращаем результат совпадения форматированной строки с ее реверсированным значением
  return formattedString === formattedString.split("").reverse().join("");
}

console.log(isPalindrome("Madam, I'm Adam")); // true
console.log(isPalindrome("A man, a plan, a canal-Panama")); // true
console.log(isPalindrome("Was it a car or a cat I saw?")); // true
console.log(isPalindrome("Hello, World!")); //false
console.log(isPalindrome("Carpet pattern")); //false
