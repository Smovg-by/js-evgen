console.log('Lesson 6')

// Class
// https://learn.javascript.ru/classes
// https://medium.com/front-stories/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%8E%D1%82-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D1%8B-%D0%B2-javascript-7978c0003f1d
// https://www.typescriptlang.org/docs/handbook/classes.html
// https://www.youtube.com/watch?v=BASquaxab_w
// https://www.youtube.com/watch?v=uLY9GXGMXaA

// class Test {
//   name: string // типизация делается внутри класса
//   constructor(name: string) {
//     this.name = name
//     // this.sayHi = function () { }
//   }
//   sayHi() { }
// }

// class Test2 extends Test {
//   //@ts-ignore
//   constructor(name) {
//     super(name)
//   }
//   sayBye() { }
// }
// class Test3 extends Test2 {
//   //@ts-ignore
//   constructor(name, age) {
//     super(name)
//     //@ts-ignore
//     this.age = age
//   }
//   sayBye() {
//     super.sayBye()
//    }
//   sayNo() { }
// }

// let testObj = new Test3('Mike', 30)
// class Helper {
//   helperMethod1() { }
//   helperMethod2() { }
// }
// class SuperHelper extends Helper {
//   helperMethod3() { }
// }

// let obj = new SuperHelper()

// class Test {
//   private param = 10
//   constructor(public name: string) {
//     this.name = name
//   }
//   private sayHi() { }
//   showParam() { this.param }
// }

// class Test {
//   private param = 10
//   constructor(public name: string) {
//     this.name = name
//   }
//   showParam() {
//     console.log(this.param);
//     console.log(Test.staticParam);
//   }
//   static staticParam = 58 // переменной не будет в инстансе
//   static testMethod() {
//     this.staticParam
//   } // метода не будет в инстансе
// }

interface Itest {
  name: string
  sayHi: Function
}
interface Itest2 {
  name: string
  sayNo: Function
}
class Test implements Itest, Itest2 {
  // из интерфейса берeтся только поля, не типизация
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi() { }
  sayNo() { }
}

// Task 01
// Создайте структуру с именем student, содержащую поля: имя и фамилия, номер группы, успеваемость (массив из пяти элементов).
// Создать массив из десяти элементов такого типа, упорядочить записи по возрастанию среднего балла.
// Добавить возможность вывода фамилий и номеров групп студентов, имеющих оценки, равные только 4 или 5.

interface Istudent {
  name: string
  surname: string
  groupNumber: number
  progress: Array<number>
  averageMark: number
}

class Student implements Istudent {
  // name: string
  // surname: string
  // groupNumber: number
  // progress: Array<number>
  averageMark: number

  // constructor(name: string, surname: string, groupNumber: number, progress: Array<number>) {
  constructor(
    public name: string,
    public surname: string,
    public groupNumber: number,
    public progress: Array<number>
  ) {
    this.name = name
    this.surname = surname
    this.groupNumber = groupNumber
    this.progress = progress
    this.averageMark =
      this.progress.reduce((sum, mark) => sum + mark) / this.progress.length
  }

  // сортировка по среднему баллу

  private static sortStudent(s1: Istudent, s2: Istudent) {
    // 'колл-бек для сортировки', метод инкапсулирован
    if (s1.averageMark > s2.averageMark) {
      return 1
    } else if (s1.averageMark < s2.averageMark) {
      return -1
    } else {
      return 0
    }
  }

  static sort(arr: Array<Istudent>) {
    // метод для сортировки, принимает в аргумент инкапсулированную функцию
    const temp = [...arr]
    return temp.sort(this.sortStudent)
  }

  // фильтр по оценкам
  private static isAllMarksEqual(marks: Array<number>, mark: number) {
    // проверим студента, все ли у него такие оценки
    return marks.every(mk => mk === mark)
  }
  private static filterStudent(arr: Array<Istudent>) {
    const result: Array<Istudent> = []
    arr.forEach(s => {
      if (
        this.isAllMarksEqual(s.progress, 4) ||
        this.isAllMarksEqual(s.progress, 5)
      ) {
        result.push(s)
      }
    })
    return result
  }

  // выводим всех студентов
  static printGoodStudents(arr: Array<Istudent>) {
    this.filterStudent(arr).forEach(s => console.log(`Student: ${s.surname}, group: ${s.groupNumber}`))
  }
}

let students = []

students.push(new Student("Mike", 'Smith', 3214, [4, 4, 5, 5]))
students.push(new Student("Dan", 'Petrov', 3215, [3, 4, 5, 5]))
students.push(new Student("Nick", 'Johnson', 3216, [4, 5, 5, 5]))
students.push(new Student("Ann", 'Koka', 3217, [4, 4, 2, 5]))

console.log(students);

console.log(Student.sort(students)) // выводим всех студентов

Student.printGoodStudents(students) // выводим только хороших студентов


// Task 02
// Создать класс с двумя переменными. Добавить конструктор с входными параметрами и инициализирующий члены класса по умолчанию.
// Можно ли создать метод на экземпляре класса который будет удалять сам экземпляр класса?
// Можно ли создать метод класса который будет удалять экземпляр класса?

class AnyClass {
  a: number
  b: number
  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }
}

// Task 03
// Составить описание класса для представления времени. Предусмотреть возможности установки времени и изменения его отдельных
// полей (час, минута, секунда) с проверкой допустимости вводимых значений. В случае недопустимых значений полей выбрасываются исключения.
// Создать методы изменения времени на заданное количество часов, минут и секунд.
// Создать метод выводящий время в строке формата HH:MM:SS
// Создать класс по вышеуказанному описанию

class Clock {

  constructor(public date: any, public hours: number, public minutes: number, public seconds: number) {
    this.date = new Date()
  }
}

// Task 04
// Класс Покупатель: Фамилия, Имя, Адрес, Номер банковского счета;
// Методы: установка значений атрибутов, получение значений атрибутов, вывод информации.
// Создать массив объектов данного класса.
// Вывести список покупателей в алфавитном порядке и список покупателей, у которых номер кредитной карточки находится в заданном диапазоне.

// Task 05
// Создать класс машина - имеющий марку, число цилиндров, мощность. Определить конструктор и функцию печати.
// Создать производный класс – грузовик, имеющий грузоподъемность кузова.
// Определить функции переназначения марки и грузоподъемности.

// just a plug
export default () => { }
