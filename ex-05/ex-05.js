// Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект,
// представляющий из себя односвязный список.

const mockData = [
  { name: "Bohn", age: 25 },
  { name: "Sohn", age: 30 },
  { name: "John", age: 20 },
  { name: "Rohn", age: 30 },
  { name: "Aohn", age: 25 },
];

// экземпляр узла списка
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// зкзкмпляр списка
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    // Создаём новый узел, который будет новым head,
    // при создании передаем второй аргумент, который указывает
    // что его "next" будет текущий head,
    // так как новый узел будет стоять перед текущем head.
    const newNode = new LinkedListNode(value, this.head);

    // Переназначаем head на новый узел
    this.head = newNode;

    // Если ещё нет tail, делаем новый узел tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    // Возвращаем весь список.
    return this;
  }
}

// функция-конвертер
const convert = (obj) => {
  const list = new LinkedList();

  obj.forEach((o) => {
    list.prepend(o);
  });

  return list;
};

console.log(convert(mockData));
