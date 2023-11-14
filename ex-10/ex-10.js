// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
// В данном задании я реализую аналог JSON.parse(). В задании 09 есть решение для JSON.stringify()

const json = '{"name":"Jack","age":18,"info":{"married":true},"languages":["English","Spanish"]}';

function parse(string) {
  // конструктор функций преобразует строку JSON в объект JavaScript путем создания и вызова функции
  return new Function('return ' + string)();
}

console.log(parse(json))
