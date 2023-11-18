// Задача на классы и наследование: создайте базовый класс Shape (фигура),
// который имеет методы для расчета площади и периметра.
// Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник,
// круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

// Базовый класс Shape
class Shape {
  // Метод для расчета площади (абстрактный метод)
  calculateArea() {
    throw new Error("Abstract method 'calculateArea' must be implemented");
  }

  // Метод для расчета периметра (абстрактный метод)
  calculatePerimeter() {
    throw new Error("Abstract method 'calculatePerimeter' must be implemented");
  }
}

// Подкласс для прямоугольника
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }

  // метод для расчета площади прямоугольника
  calculateArea() {
    return this._width * this.height;
  }

  // метод для расчета периметра прямогольника
  calculatePerimeter() {
    return 2 * (this._width + this._height);
  }
}

// Подкласс для круга
class Circle extends Shape {
  constructor(radius) {
    super();
    this._radius = radius;
  }

  // метод для расчета площади круга
  calculateArea() {
    return Math.PI * this._radius * this._radius;
  }

  // метод для расчета периметра круга
  calculatePerimeter() {
    return 2 * Math.PI * this._radius;
  }
}

// Подкласс для треугольника
class Triangle extends Shape {
  constructor(sideA, sideB, sideC) {
    super();
    this._sideA = sideA;
    this._sideB = sideB;
    this._sideC = sideC;
  }

  // метод для расчета площади треугольника по формуле Герона
  calculateArea() {
    const s = (this._sideA + this._sideB + this._sideC) / 2;
    return Math.sqrt(
      s * (s - this._sideA) * (s - this._sideB) * (s - this._sideC)
    );
  }

  // метод для расчета периметра треугольника
  calculatePerimeter() {
    return this._sideA + this._sideB + this._sideC;
  }
}

// Пример использования классов
const rectangle = new Rectangle(5, 10);
console.log("Rectangle Area:", rectangle.calculateArea());
console.log("Rectangle Perimeter:", rectangle.calculatePerimeter());

const circle = new Circle(7);
console.log("Circle Area:", circle.calculateArea());
console.log("Circle Perimeter:", circle.calculatePerimeter());

const triangle = new Triangle(3, 4, 5);
console.log("Triangle Area:", triangle.calculateArea());
console.log("Triangle Perimeter:", triangle.calculatePerimeter());
