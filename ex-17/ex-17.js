const API_KEY = "57e30b9b-1b09-4ea1-b5dd-76afb8730df1";
const BASE_URL = "https://geocode-maps.yandex.ru/1.x/";
const HEADERS = { "Content-Type": "application/json" };

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

// Универсальная функция проверки ответа на запрос
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

// Запрос на получение списка адресов
const getItemsList = async () => {
  return fetch(
    `${BASE_URL}?apikey=${API_KEY}&geocode=${inputElement.value}&format=json
  `,
    { headers: HEADERS }
  )
    .then((res) => checkResponse(res))
    .then((data) => data.response);
};

// Обработчик поиска
const handleSearch = () => {
  // если поле ввода не пустое
  if (inputElement.value) {
    getItemsList().then((res) => {
      // получаем список адресов
      const list = res.GeoObjectCollection.featureMember;
      // создаем элемент списка для каждого адреса
      const html = list.reduce((markup, item) => {
        return `${markup}<li class="search-result">${`${item.GeoObject.name}${
          item.GeoObject.description ? `, ${item.GeoObject.description}` : ""
        }`}</li>`;
      }, ``);
      searchResults.innerHTML = html;
      // на каждый элемент вешаем слушатель клика
      document.querySelectorAll(".search-result").forEach((result) => {
        result.addEventListener("click", () => {
          // меняем значение поля ввода на выбранное значение
          inputElement.value = result.textContent;
          handleSearch();
        });
      });
    });
  } else {
    searchResults.textContent = "";
  }
};

// создаем HOC для дебаунса, через который будем пропускать обработчик поиска
const debounce = (callee, timeoutMs) => {
  // возвращаем другую функцию
  return function () {
    let previousCall = this.lastCall; // временная метка предыдущего вызова
    this.lastCall = Date.now(); // временная метка нынешнего момента

    // Если разница между вызовами меньше, чем указанный интервал, то очищаем таймаут
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => callee(), timeoutMs);

    // Если таймаут был очищен, вызова не произойдёт
    // если он очищен не был, то callee вызовется.
    // Таким образом мы как бы «отодвигаем» вызов callee
    // до тех пор, пока «снаружи всё не подуспокоится».
  };
};

const deboucedSearch = debounce(handleSearch, 1000);

inputElement.addEventListener("input", deboucedSearch);
formElement.addEventListener("submit", (evt) => evt.preventDefault());
