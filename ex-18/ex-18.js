// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

const calculateLocalStorageSize = () => {
  const output = document.querySelector(".output"); // сюда будем выводить данные

  let length = 0; // здесь будет значение длины строки в хранилище
  let currentLength = localStorage.list?.length || 0; // текущая длина хранилища

  // функция, отвечаюзая за уменьшение шага прибавления длины строки для точности расчета
  const reduceStep = async (step) => {
    try {
      while (step > 0) {
        length += step; // пока шаг больше 0 увеличиваем длину на шаг
        localStorage.setItem("test", new Array(length).join("a")); // записываем строку в хранилище
      }
    } catch {
      length -= step; // при возникновени ошибки вычитам последний шаг из длины
      step = Number(String(step).slice(0, -1)); // отрезаем от шага последнюю цифру
      reduceStep(step); // рекурсивно вызываем эту же функцию
    }
    return length;
  };

  if (localStorage) {
    reduceStep(1000000000).then((l) => {
      localStorage.removeItem("test"); // после вычисления удаляем значение из хранилища
      // и сообщаем размер хранилища в КБ (длина из расчетов + длина уже занятого места * 2)
      // т.к. 1 символ = 2 байта (UTF-16)
      output.textContent = `Размер хранилища: ${Math.floor(
        (l + currentLength) * 2 * 0.001
      )} КБ`;
    });
  }
};

calculateLocalStorageSize();
