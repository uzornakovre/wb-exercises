// Задача на модули и использование внешних библиотек: напишите модуль, 
// который экспортирует функцию для работы с датами. 
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

const moment = require("moment/moment");

class DateFormatter {
  constructor() {
    this._moment = moment().locale('ru') // задаем локальный формат для России
  }

  getTime() {
    return this._moment.format("LT"); // возвращаем текущее время в формате ЧЧ:ММ
  }

  getDate() {
    return this._moment.format("LL"); // возвращаем текущуб дату в формате ДД месяц ГГГГ
  }

  getDay() {
    return this._moment.format('dddd') // возвращаем текущий день недели 
  }

  getFullDate() {
    return `${this.getDay()}, ${this.getDate()}, ${this.getTime()}`// возвращаем полную дату
  }
}

export default DateFormatter;