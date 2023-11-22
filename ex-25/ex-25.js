// Задача: Создать и добавить стиль для элемента: Напишите функцию,
// которая создает новый элемент, добавляет его в DOM и устанавливает
// для него стиль с помощью CSS.

// функция принимает название тега, содержимое, стили и контейнер, в который будем помещать
const createElement = (tag, content, style, container) => {
  const element = document.createElement(tag); // создаем элемент
  element.textContent = content; // задаем содержимое
  element.setAttribute("style", style); // задаем стили
  container.append(element); // добавляем в контейнер
};

const topContainer = document.querySelector("#container_top");
const bottomContainer = document.querySelector("#container_bottom");

createElement("h1", "Title", "color: red", topContainer);
createElement("p", "Subtitle", "border-top: 1px solid grey", bottomContainer);
