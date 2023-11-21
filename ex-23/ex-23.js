// Анализатор сложности пароля: создайте функцию, которая оценивает сложность
// введенного пользователем пароля. Необходимо анализировать длину пароля,
// использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения,
// если пароль слишком слабый.

const form = document.querySelector(".form");
const passwordInput = form.querySelector(".input");
const tooltip = form.querySelector(".tooltip");

// функция проверки сложности. принимает текстовое значение и элемент для вывода результата
const checkPasswordDifficulity = (password, output) => {
  let difficulity = 0; // задаем начальную сложность

  const lowerCaseLetters = /[a-z]/; // регулярка латинских букв в нижнем регистре
  const upperCaseLetters = /[A-Z]/; // регулярка латинских букв в верхнем регистре
  const digits = /[0-9]/; // регулярка цифр
  const specialChars = // регулярка спецсимволов
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;
  const validChars = // регулярка всех валидных символов
    /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;

  // проверяем состояния пароля
  let hasLowerCaseLetter = lowerCaseLetters.test(password); // имеет букву в нижнем регистре
  let hasUpperCaseLetter = upperCaseLetters.test(password); // имеет букву в верхнем регистре
  let hasDigit = digits.test(password); // имеет цифру
  let hasSpecialChars = specialChars.test(password); // имеет спецсимвол
  let hasInvalidChars = !validChars.test(password); // имеет недопустимые символы
  let hasEnoughChars = password.length >= 6; // имеет достаточно символов

  // функция, генерирующая текст подсказки при валидном пароле
  const setTooltip = (dif, output) => {
    const difLevels = {
      1: "простой",
      2: "нормальный",
      3: "сложный",
      4: "эксперт",
    };

    // в зависимости от ситуации меняем текст совета
    const advice = `Вы можете повысить уровень сложности, добавив ${
      (!hasUpperCaseLetter && "латинские буквы в верхнем регистре") ||
      (!hasLowerCaseLetter && "латинские буквы в нижнем регистре") ||
      (!hasDigit && "цифры") ||
      (!hasSpecialChars && "спецсимволы")
    }`;

    // возвращаем текст подсказки. если сложность меньше 4, показываем совет
    return `Уровень сложности: ${difLevels[dif]}. ${dif === 4 ? "" : advice}`;
  };

  // при валидном пароле прибавляем + 1 к сложности за каждый тип символа
  if (hasEnoughChars && !hasInvalidChars) {
    hasLowerCaseLetter && difficulity++;
    hasUpperCaseLetter && difficulity++;
    hasDigit && difficulity++;
    hasSpecialChars && difficulity++;

    output.textContent = setTooltip(difficulity, output); // устанавливаем текст подсказки
  } else if (hasEnoughChars && hasInvalidChars) {
    // устанавливаем подсказки в случаях, когда пароль не валиден
    output.textContent = "Допустимы только латиница, цифры и спецсимволы";
  } else {
    output.textContent = "Минимальная длина пароля - 6 символов";
  }
};

// обработчик сабмита формы
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  alert(tooltip.textContent);
};

// листенеры инпута и формы
passwordInput.addEventListener("input", () => {
  checkPasswordDifficulity(passwordInput.value, tooltip);
});

form.addEventListener("submit", handleFormSubmit);
