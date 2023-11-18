// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

const book = {
  title: "Grokking Algorithms",
  author: "Aditya Y. Bhargava",
  year: 2016,
  setTitle: function (t) {
    this.title = t;
  },
  setAuthor: function (a) {
    this.author = a;
  },
  setYear: function (y) {
    this.year = y;
  },
};

book.setTitle("Грокаем алгоритмы");
book.setAuthor("Адитья Бхаргава");
book.setYear(2020);

console.log(book);
