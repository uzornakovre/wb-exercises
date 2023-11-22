// Разработайте страницу, отображающую таблицу с данными.
// Данные необходимо подгружать из этого источника:
const url =
  "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";
// Требования:
// - данные должны загружаться при загрузке страницы
// - необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// - необходимо реализовать клиентскую пагинацию (50 элементов на странице)

const filter = document.querySelector("#filter");
const table = document.querySelector("#table");
const content = document.querySelector("#content");
const loader = document.querySelector("#loader");
const pagination = document.querySelector("#pagination");

let fullList = null; // сюда будем записывать весь массив данных
let currentList = null; // здесь будет хранится массив текущей страницы
const filterOptions = {
  mode: null, // режим сортировки (по возрастанию / по убыванию)
  key: null, // ключ категории, по которой будем сортировать
};

// универскальная функция для проверки ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

// получение данных с сервера
const getDataBase = async () => {
  return fetch(url).then((res) => checkResponse(res));
};

// отрисовка элементов в виде рядов таблицы
const renderRows = (list) => {
  content.innerHTML = "";

  list.forEach((item) => {
    let tableRow = `<tr>
      <td>${item.fname}</td>
      <td>${item.lname}</td>
      <td>${item.tel}</td>
      <td>${item.address}</td>
      <td>${item.city}</td>
      <td>${item.state}</td>
      <td>${item.zip}</td>
    </tr>`;

    content.innerHTML += tableRow;
  });
};

// отрисовка кнопок пагинации
const renderPagination = () => {
  pagination.innerHTML = "";

  const pagesCount = Math.ceil(fullList.length / 50);

  for (let i = 1; i <= pagesCount; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.page = i;
    button.textContent = i;
    button.className = i === 1 && "active";
    pagination.append(button);
  }
};

// функция, вызываемая при перерисовке контента
const renderContent = () => {
  loader.textContent = ""; // убираем сообщение о загрузке

  renderRows(currentList); // отрисовываем элементы
  renderPagination(); // отрисовываем пагинацию

  // вешаем слушатели клика на все кнопки пагинации
  Array.from(pagination.getElementsByTagName("button")).forEach((button) => {
    button.addEventListener("click", handlePaginationButtonClick);
  });
};

// функция сортировки массива, принимает массив, ключ и режим
const sortArray = (array, key, mode) => {
  return array.sort((a, b) => {
    const valA = String(a[key]).toLowerCase();
    const valB = String(b[key]).toLowerCase();

    switch (mode) {
      case "asc": {
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      }
      case "desc": {
        if (valA < valB) return 1;
        if (valA > valB) return -1;
        return 0;
      }
    }
  });
};

// обработчик клика по кнопке пагинации
const handlePaginationButtonClick = (evt) => {
  const { page } = evt.target.dataset; // достаем свойство page
  currentList = fullList.slice((page - 1) * 50, page * 50); // изменяем отображаемый список
  renderContent();

  // переносим активное состояние текущей кнопке пагинации
  Array.from(pagination.getElementsByTagName("button")).forEach((button) => {
    button.classList.contains("active") && button.classList.remove("active");
    button.dataset.page === page && button.classList.add("active");
  });
};

// обработчик сабмита формы сортировки
const handleFilterApply = (evt) => {
  evt.preventDefault();
  filterOptions.mode = evt.target.mode.value; // записываем значение полей формы
  filterOptions.key = evt.target.key.value; // в объект filterOptions

  fullList = sortArray(fullList, filterOptions.key, filterOptions.mode); // сортируем
  currentList = fullList.slice(0, 50);

  renderContent(); // отрисовываем контент
};

// получаем базу данных, записываем в переменную
getDataBase().then((dataBase) => {
  fullList = sortArray(dataBase, filterOptions.key, filterOptions.mode);
  currentList = fullList.slice(0, 50); // получаем текущий список из первых 50 элементов

  renderContent(); // отрисовываем контент
});

// вешаем слушатель на сабмит формы сортировки
filter.addEventListener("submit", handleFilterApply);
