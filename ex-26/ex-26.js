// Задача: Рекурсивный обход дерева DOM: Напишите функцию, которая рекурсивно обходит дерево DOM,
// начиная с указанного элемента, и выполняет определенное действие с каждым узлом
// (например, выводить информацию о теге в консоль).

const firstElement = document.querySelector(".first");
const formElement = document.querySelector(".form");

// функция для вывода названия класса элемента
const getClassName = (element) => {
  if (element.className) console.log(element.className);
};

// функция для получения инфорамации о потомках элемента
const getChildNodesInfo = (element) => {
  for (let i = 0; i < element.childNodes.length; i++) {
    let currentNode = element.childNodes[i];

    getClassName(currentNode);

    // если текущий узел имеет дочерние, рекурсивно проходим по ним
    if (currentNode.childNodes) {
      getChildNodesInfo(currentNode);
    }
  }
};

getChildNodesInfo(document.body);
getChildNodesInfo(firstElement);
getChildNodesInfo(formElement);
