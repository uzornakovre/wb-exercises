// Задача о сортировке объектов:
// у вас есть массив объектов вида { name: 'John', age: 25 }.
// Напишите код, который сортирует этот массив по возрастанию возраста,
// а при равных возрастах сортирует по алфавиту по полю name.

const mockData = [
  { name: "Bohn", age: 25 },
  { name: "Sohn", age: 30 },
  { name: "John", age: 20 },
  { name: "Rohn", age: 30 },
  { name: "Aohn", age: 25 },
];

// Вариант 1

function sortArray(array) {
  // используем метод sort
  return array.sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    } else {
      const nameA = a.name.toLowerCase(); // понижаем регистр для сравнения
      const nameB = b.name.toLowerCase();

      // Если name первого объекта меньше name второго,
      // то первый объект должен идти раньше.
      if (nameA < nameB) {
        return -1;
      }
      // Если name первого объекта больше, то он должен идти позже
      if (nameA > nameB) {
        return 1;
      }
      // Если имена равны, порядок объектов не важен.
      return 0;
    }
  });
}

// Вариант 2

function sortArrayWithLocaleCompare(array) {
  return array.sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    } else {
      return a.name.localeCompare(b.name); // используем метод localeCompare для сравнения
    }
  });
}

console.log(sortArray(mockData));
console.log(sortArrayWithLocaleCompare(mockData));
