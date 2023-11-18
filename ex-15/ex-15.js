// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения.

const funcArray = [
  () => new Promise((res) => setTimeout(() => res("Function 1"), 1000)),
  () => new Promise((res) => setTimeout(() => res("Function 2"), 800)),
  () => new Promise((res) => setTimeout(() => res("Function 3"), 200)),
  () => new Promise((res) => setTimeout(() => res("Function 4"), 1100)),
  () => new Promise((res) => setTimeout(() => res("Function 5"), 500)),
];

const asyncFunc = async () => {
  await funcArray[4]().then(res => console.log(res));
  await funcArray[3]().then(res => console.log(res));
  await funcArray[2]().then(res => console.log(res));
  await funcArray[1]().then(res => console.log(res));
  return funcArray[0]().then(res => console.log(res));
}

asyncFunc();