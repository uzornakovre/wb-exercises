// Реализовать функцию конвертации JSON в строку
// В данном задании я реализую аналог JSON.stringify(). В задании 10 есть решение для JSON.parse()

const object = { 
  name: "Jack", 
  age: 18, 
  info: {
    married: true
  },
  languages: ['English', 'Spanish']
};

function stringify(obj) {
  let result = ""; // задаем пустую строку, которую наполним результатом

  const renderValue = (val) => {
    // если значения являются числом, булевым или null
    if (typeof val === 'number' || typeof val === 'boolean' || typeof val === 'null') {
      result += val // добавляем к результату значение без изменений
      // Если значение - массив, то каждый элемент пропускаем через stingify и добавляем в строку через запятую
    } else if (Array.isArray(val)) {
      result += `[${val.map(i => stringify(i)).join(',')}]` // добавляем строку в результат
      // если значение - строка
    } if (typeof val === 'string') {
      result += `"${val}"` // добавляем к результату значение в кавычках
      // если значение - объект и не является массивом
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      const arr = []; // создаем пустой массив в который будем складывать значения
      for (key in val) {
        // каждый ключ заключаем в кавычки, а значение прогоняем через stringify
        arr.push(`"${key}":${stringify(val[key])}`)
      }
      result += `{${arr.join(',')}}`; // добавляем к результату элементы массива, в виде строк через запятую
    }
  }

  renderValue(obj); // прогоняем объект через обработчик
  return result; // возвращаем конечный результат
}

console.log(stringify(object))


