// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
// В данном задании я реализую аналог JSON.parse(). В задании 09 есть решение для JSON.stringify()

const json =
  '{"name": "Jack","age":30,"info":{"married":true},"languages":["English","Spanish"],"car": null}';

const parse = (str) => {
  // возаращаем сообщение с ошибкой если значение не является строкой
  if (typeof str !== "string") return "Value is not a string";

  let index = 0; // индекс
  let char = str[index]; // текущий символ

  // функция для обновления значения переменной char в зависимости от индекса
  const refreshChar = () => {
    char = str[index];
  };

  // парсинг строки
  const parseString = () => {
    index++; // прибавляем индекс, чтобы пропустить открывающуюся кавычку
    let result = ""; // здесь будет результат в виде строки

    while (index < str.length) {
      refreshChar(); // обновляем текущий символ
      index++; // заранее увеличиваем индекс

      if (char === '"') {
        return result; // если символ - кавычка, возвращаем результат
      } else {
        result += char; // иначе прибавляем символ в строку с результатом
      }
    }
  };

  // парсинг числа
  const parseNumber = () => {
    let result = ""; // здесь будет результат в виде строки

    while (index < str.length) {
      refreshChar(); // обновляем текущий символ

      if (!/[0-9]/.test(char)) {
        return Number(result); // если символ - не цифра, возвращаем результат в виде числе
      } else {
        index++; // иначе увеличиваем индекс
        result += char; // и прибавляем к результату цифру
      }
    }
  };

  // парсинг массива
  const parseArray = () => {
    index++; // увеличиваем индекс, чтобы пропустить открывающуюся скобку
    let result = []; // сюда запишем итоговый массив

    while (index < str.length) {
      refreshChar(); // обновим текущий символ

      if (char === "]") {
        index++; // если закрывающаяся скобка - увеличиваем индекс
        return result; // и возаращаем результат в виде массива
      } else if (char === ",") {
        index++; // если запятая
      } else if (char === " " && str[index - 1] === ",") {
        index++; // или пробел после запятой - увеличиваем индекс
      } else {
        // пушим вызов функции checkChar для проверки значения массива и дальнейшего парсинга
        result.push(checkChar());
      }
    }
  };

  // парсинг объекта
  const parseObject = () => {
    index++; // увеличиваем индекс, чтобы пропустить кавычку
    let result = {}; // сюда запишем итоговый объект

    while (index < str.length) {
      refreshChar(); // обновляем текущий символ

      if (char === "}") {
        index++; // если кавычка закрывается, увеличиваем индекс
        return result; // и возвращаем результат в виде объекта
      } else if (char === ":") {
        index++; // если символ двоеточия
      } else if (char === ",") {
        index++; // или запятая
      } else if (char === " " && str[index - 1] == ",") {
        index++; // или пробел после запятой - увеличиваем индекс
      } else {
        const key = parseString(); // записываем в ключ парсинг строки
        index++; // увеличиваем индекс, чтобы пропуcтить двоеточие
        refreshChar(); // обновляем переменную

        if (char === " " && str[index - 1] === ":") {
          index++; // увеличиваем индекс, чтобы пропуcтить пробел после двоеточия
        }

        // записываем значением для ключа вызов checkChar для проверки значания
        result[key] = checkChar(); // и последующего парсинга
      }
    }
  };

  // парсинг булевых значений
  const parseBoolean = () => {
    if (char === "f") {
      index += 5;
      return false;
    } else if (char === "t") {
      index += 4;
      return true;
    }
  };

  // парсинг null
  const parseNull = () => {
    index += 4;
    return null;
  };

  // функция проверки символа и распределения его по типу парсинга
  const checkChar = () => {
    refreshChar();

    switch (true) {
      case char === "'" || char === '"':
        return parseString(); // если кавычка - парсим строку
      case /[0-9]/.test(char):
        return parseNumber(); // если цифрв - парсим число
      case char === "[":
        return parseArray(); // квадратная скобка - массив
      case char === "{":
        return parseObject(); // фигурная скобка - объект
      case char === "f" || char === "t": // f(false) или t(true) - булевое
        return parseBoolean();
      case char === "n": // n - null
        return parseNull();
    }
  };

  return checkChar();
};

console.log(parse(json));

// еще один вариант парсинга
const parseByFuncConstructor = (string) => {
  // конструктор функций преобразует строку JSON в объект JavaScript путем создания и вызова функции
  return new Function("return " + string)();
};

console.log(parseByFuncConstructor(json));
