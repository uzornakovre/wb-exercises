// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.
// Когда говорится "промис разрешается с данными об изображении", это означает,
// что промис должен быть успешно выполнен (resolved) с данными об изображении после того,
// как изображение будет загружено.

const IMAGE_URL =
  "https://repository-images.githubusercontent.com/267052867/acfbf000-a14c-11ea-9b40-fff635388b32";
const wrapper = document.querySelector(".img");

const loadImage = (url) => {
  // возвращаем промис
  return new Promise((res, rej) => {
    const image = new Image(); // создаем экземпляр <img>
    // при успешной загрузке разрешаем промис с данными об изображении
    image.addEventListener("load", () => res(image));

    image.src = url; // записываем utl в атрибут src

    image.onerror = (err) => rej(err); // при неудаче отправим ошибку в reject
  });
};

loadImage(IMAGE_URL)
  .then((img) => wrapper.appendChild(img))
  .catch((err) =>
    console.log("Ошибка при загрузке изображения: " + JSON.stringify(err))
  );
