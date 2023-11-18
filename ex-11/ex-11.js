// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию.
// Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции,
// даже после того, как внешняя функция завершила свое выполнение.

const editNote = () => {
  let note = "Old note";

  return (text) => (note = text);
};

const setNote = editNote();

console.log(setNote("New note")); // New note
console.log(setNote("Another new note")); // Another new note
