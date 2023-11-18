// Вычислить размер коллстэка в основных браузерах:
// Chrome, Firefox, Opera и Safari (если есть возможность).

let counter = 0; // cчетчик функций в стеке

// Объявляем функцию, которая будет увеличивать счетчик и рекурсивно вызывать себя же
const checkCallStack = () => {
  counter++;
  checkCallStack();
};

try {
  checkCallStack(); // вызываем функцию, и, при ошибке выдаем сообщение с результатом счетчика
} catch (err) {
  alert("maxStackSize = " + counter + "\n" + err); // и причиной ошибки
}

// Результаты в браузерах:

// Safari maxStackSize = 45633
// Chrome maxStackSize = 12567
// Firefox maxStackSize = 27810
// Opera maxStackSize = 12566
