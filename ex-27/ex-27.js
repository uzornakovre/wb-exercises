// Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет
// анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.

const firstSquare = document.querySelector("#square_1");
const secondSquare = document.querySelector("#square_2");
const firstCircle = document.querySelector("#circle_1");
const secondCircle = document.querySelector("#circle_2");
const thirdCircle = document.querySelector("#circle_3");

// функция для трансформации элемента, принимает сам элемент
const transform = (item) => {
  let deg = 0; // начальный градус 0
  let size = 1; // начальный размер 1 к 1

  // метод поворота, в который можно передать отклонение
  const rotateRight = (def = 0) => {
    deg++;
    item.style.transform = `translate(-50%, -50%) rotate(${deg + def}deg)`;
  };

  // метод увеличения размера
  const increaseScale = () => {
    size += 0.1;
    if (size > 30) {
      size = 1; // если размер превышен в 30 раз, начинаем все сначала
      // увеличиваем z-index, чтобы перекрыть другой объект
      item.style.zIndex = Number(item.style.zIndex) + 2;
    }
    // периодически сбрасываем z-index, чтобы он не разрастался до бесконечности
    if (item.style.zIndex > 9999) {
      item.style.zIndex = 1;
    }

    item.style.transform = `translate(-50%, -50%) scale(${size})`;
  };
  return { rotateRight, increaseScale };
};

const rotatefirstSquare = transform(firstSquare).rotateRight;
const rotateSecondSquare = transform(secondSquare).rotateRight;
const scaleFirstCircle = transform(firstCircle).increaseScale;
const scaleSecondCircle = transform(secondCircle).increaseScale;
const scaleThirdCircle = transform(thirdCircle).increaseScale;

// используем setInterval и setTimeout для анимации
setInterval(() => rotatefirstSquare(), 12);
setInterval(() => rotateSecondSquare(45), 12);
setInterval(() => scaleFirstCircle(), 24);
setTimeout(() => {
  setInterval(() => scaleSecondCircle(), 24);
}, 2000);
setTimeout(() => {
  setInterval(() => scaleThirdCircle(), 24);
}, 4000);
