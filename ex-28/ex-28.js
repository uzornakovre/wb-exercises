// Задача: Создать и добавить элемент с использованием шаблонов:
// Напишите функцию, которая создает новый элемент с использованием шаблонов
// (например, с помощью тега <template>) и добавляет его в DOM.

const userList = ["John", "Smith", "Ben", "Timothy", "Gregor"];
const listElement = document.querySelector(".list");

// создаем класс, отвечающий за рендер секции с элементами
class Section {
  // конструктр принимает функцию, оответственную за отрисовку конкретного элемента и селектор контейнера
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    // данный метод принимает на вход массив, который нужно отрисовать в секции
    items.forEach((item) => {
      this._item = this._renderer(item);
      this._addItem(this._item);
    });
  }

  _addItem(item) {
    // приватный метод, который добавляет готовый элемент в контейнер
    this._container.append(item);
  }
}

// создаем экземпляр секции
const usersSection = new Section(
  {
    renderer: (itemData) => {
      return createListItem(itemData);
    },
  },
  listElement
);

// функция, отвечающая ща то, каким будет элемент
// в данном случае мы будем просто присваивать элементам списка текст - имена из массива
const createListItem = (item) => {
  const userName = document
    .querySelector("#template")
    .content.querySelector(".item")
    .cloneNode(true);

  userName.textContent = item;
  return userName;
};

usersSection.renderItems(userList); // Вызываем публичный метод renderItems и передаем в него массив
