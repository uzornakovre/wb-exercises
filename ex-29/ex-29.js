// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы
// на веб-странице и выполняет определенные действия с этими данными, например, отправляет
// их на сервер или отображает всплывающее окно с результатами.

const form = document.querySelector(".form");
const emailElement = form.querySelector(".email");
const passwordElement = form.querySelector(".password");
const tooltip = document.querySelector(".tooltip");

// В данном задании я использую POST-запрос на выполнение авторизации
// на один из моих учебных проектов.
// Чтобы протестировать успешный вариант, можно отправить следующий данные:
// EMAIL: tony_stark@mail.com ПАРОЛЬ: kkkk
// В таком случае в консоли появится токен авторизации

// Универсальная проверка статуса ответа
const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

// запрос на логин, отправляем email и пароль
const login = (email, password) => {
  return fetch("https://api.mesto-project.website/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkStatus)
    .then((data) => data);
};

// обработчик сабмита формы
const handleSubmitForm = (evt) => {
  evt.preventDefault();
  login(emailElement.value, passwordElement.value)
    .then((res) => {
      tooltip.classList.add("visible"); // если логин успешен
      tooltip.classList.remove("red"); // то появится соответвующее
      tooltip.textContent = `Вход выполнен. Ваш токен: ${res.token}`; // сообщение
    })
    .catch((err) => {
      tooltip.classList.add("visible", "red"); // в противном случае
      tooltip.textContent = err; // появится сообщение об ошибке
    });
};

form.addEventListener("submit", handleSubmitForm);
