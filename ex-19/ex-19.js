// Реализовать виджет, отображающий список постов из любого паблика в VK
// (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. //
// Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных:
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать
// все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять
// данные загруженные первыми.

const SERVICE_KEY =
  "4b3924654b3924654b39246544482f40d744b394b3924652e673e4f3ec8695f91eec691";
const BASE_URL = "https://api.vk.com/";
const GET_METHOD = "wall.get";
const OWNER_ID = "-81574241";
// const OWNER_ID = "-205359325";
const COUNT = 15;

let wallPosts = [];
const storedPosts = localStorage.getItem("list");
const postList = document.querySelector(".post-list");

// Чтобы осуществлять кроссдоменные запросы к VK API, предлагается использовать протокол JSONP.
// JSONP или «JSON with padding» (JSON с набивкой) — это дополнение к базовому формату JSON.
// Он предоставляет способ запросить данные с сервера, находящегося в другом домене — операцию,
// запрещённую в типичных веб-браузерах из-за политики ограничения домена.
// Для этого необходимо подключать к документу скрипт с адресом запроса в src.
// Запрос должен содержать дополнительный параметр callback c именем функции,
// которая будет вызвана при получении результата.

const getWall = (ownerId, offset) => {
  const script = document.createElement("script");
  script.src = `${BASE_URL}method/${GET_METHOD}?owner_id=${ownerId}&access_token=${SERVICE_KEY}&v=5.191&count=${COUNT}&offset=${offset}&callback=callbackFunc`;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const callbackFunc = (result) => {
  const { items } = result.response; // достаем список постов из response
  items.forEach((item) => wallPosts.push(item)); // каждый элемент помещаем в массив wallPosts
  refreshLocalStorage(wallPosts); // обновляем localStorage
  renderItems(items); // отрисовываем элементы
};

// обновление localStorage
const refreshLocalStorage = (data) => {
  let dataString = JSON.stringify(data); // записываем в переменную данные в виде строки JSON
  try {
    localStorage.setItem("list", dataString); // записываем в хранилище
  } catch {
    // в случае ошибки срезаем начало массива постов на количество подгружаемых, чтобы хватило места
    wallPosts = wallPosts.slice(COUNT);
    refreshLocalStorage(wallPosts); // рекурсивно вызываем обновление хранилища
  }
};

// функция создания поста из шаблоно
const createPostFromTemplate = () => {
  const post = document
    .querySelector("#post-template")
    .content.querySelector(".post")
    .cloneNode(true);

  return post;
};

// функция заполнения поста данными
const fillPost = (data) => {
  const { text, likes, attachments } = data;
  const post = createPostFromTemplate();
  post.querySelector(".text").textContent = text;
  post.querySelector(".like-counter").textContent = likes.count;

  // в зависимости от типа вложений, создаем разные элементы
  attachments.forEach((item) => {
    if (item.type === "link") {
      const link = document.createElement("a");
      link.href = item.link.url;
      link.textContent = item.link.title;
      link.className = "link";
      post.prepend(link);
    }
    if (item.type === "photo") {
      const image = document.createElement("img");
      image.src =
        item.photo.sizes.find((s) => s.type === "y")?.url ||
        item.photo.sizes.find((s) => s.type === "q")?.url;
      image.alt = item.photo.text;
      image.className = "image";
      post.prepend(image);
    }
  });

  postList.append(post);
};

// функция отрисовки постов
const renderItems = (items) => {
  items.forEach((item) => fillPost(item));
};

// обработчик скролла
const handleScroll = () => {
  // если до нижнего края остается меньше 801px (высота контейнера)..
  if (postList.scrollHeight - postList.scrollTop < 801) {
    // отправляем новый запрос со смещением, равным длине текущего массива
    getWall(OWNER_ID, wallPosts.length);
  }
};

postList.addEventListener("scroll", handleScroll); // слушатель скролла

// если в хранилище есть данные, то рендерим их
if (storedPosts) {
  wallPosts = JSON.parse(storedPosts);
  renderItems(wallPosts);
} else getWall(OWNER_ID, 0); // или начинаем все с нуля
