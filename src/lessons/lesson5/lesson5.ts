console.log('Lesson 5');

// Keyword - this
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this
// https://learn.javascript.ru/object-methods
// https://habr.com/ru/company/ruvds/blog/419371/
// https://www.youtube.com/watch?v=aQkgUUmUJy4&list=PLqKQF2ojwm3l4oPjsB9chrJmlhZ-zOzWT

// А тут заходим и ставим лайк!!!
// https://www.youtube.com/watch?v=T1vJ8OdJq0o

// https://www.youtube.com/watch?v=xY-mwUzDjsk

// Keyword - new. Function-constructor
// https://learn.javascript.ru/constructor-new
// https://metanit.com/web/javascript/4.5.php
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new

// Call, Apply, Bind
// https://learn.javascript.ru/call-apply-decorators
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BE-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D1%85-apply-call-%D0%B8-bind-%D0%BD%D0%B5%D0%BE%D0%B1%D1%85%D0%BE%D0%B4%D0%B8%D0%BC%D1%8B%D1%85-%D0%BA%D0%B0%D0%B6%D0%B4%D0%BE%D0%BC%D1%83-javascript-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D1%83-ddd5f9b06290

// function f() {
//     console.log('this is a function declaration...', this);
//  }

// let obj = {
//     name: 'Eugene',
//     age: 32,
//     sayName() {
//         console.log(this.name);
//     }
// }

// Task 01
// Дан объект someObj, реализуйте функцию greeting и присвойте ее ключу объекта с аналогичным именем.
// Функция должна вернуть строку `My name is ${name}. I am ${age}`, где name и age берутся из свойств объекта

type someObjType = {
    name: string;
    age: number;
    greeting1?: () => void
    greeting2?: (name: string, age: number) => void
}

let someObj:someObjType = {
    name: 'Eugene',
    age: 32
}

// var1
//
function greetingFunc1(this: someObjType) {

    console.log(`My name is ${this.name}. I am ${this.age}`)
}

someObj.greeting1 = greetingFunc1

someObj.greeting1()

// var2
//
function greetingFunc2(name: string, age: number) {
    console.log(`My name is ${name}. I am ${age}`)
}

greetingFunc2.call(someObj, someObj.name, someObj.age)

// Task 02
// реализовать счетчик counter в виде объекта со следующими методами:
// get current count; - выводит текущее значение счетчика
// increment; - увеличивает значение счетчика на 1
// decrement; - уменьшает значение счетчика на 1
// set current count; - принимает и присваивает значение счетчику
// rest current count - устанавливает значение счетчика равным 0
// все методы должны ссылаться на сам объект

let counter1: any = {
    counter: 0,
    getCurrentCount() {
        console.log(`Current count is:  ${this.counter}`);
    },
    increment() {
        this.counter++
        console.log(`Counter incremented to:  ${this.counter}`);
    },
    decrement() {
        this.counter--
        console.log(`Counter decremented to:  ${this.counter}`);
    },
    setCurrentCount(setNumber: number) {
        this.counter = setNumber
        console.log(`You have set counter to:  ${this.counter}`);
    },
    resetCurrentCount() {
        this.counter = 0;
        console.log(`You have reset counter to:  ${this.counter}`);
    },
}

// Task 03
// переделайте код из Task 02, что бы сработал следующий код:
// counter.setCurrentCount(10).increment().increment().increment().decrement().getCurrentCount() // 12

let counter: any = {
    counter: 0,
    getCurrentCount() {
        console.log(`Current count is:  ${this.counter}`);
        return this
    },
    increment() {
        this.counter++
        console.log(`Counter incremented to:  ${this.counter}`);
        return this
    },
    decrement() {
        this.counter--
        console.log(`Counter decremented to:  ${this.counter}`);
        return this
    },
    setCurrentCount(setNumber: number) {
        this.counter = setNumber
        console.log(`You have set counter to:  ${this.counter}`);
        return this
    },
    resetCurrentCount() {
        this.counter = 0;
        console.log(`You have reset counter to:  ${this.counter}`);
        return this
    },
}

// Task 04
// Написать функцию конструктор myFirstConstructorFunc которая принимает 2 параметра name и age и возвращает объект
// у которого будут эти свойства и метод greeting из Task 01

function myFirstConstructorFunc(this: any, name: string, age: string) {
    this.name = name
    this.age = age
    this.greeting = () => { console.log(`My name is ${this.name}. I am ${this.age}`) }
}

// Task 05 есть 2 объекта One и Two. С помощью bind и метода sayHello заставьте поздороваться объект One

let One: OneType = { name: 'One' };
let Two = {name: 'Two', sayHello: function() {console.log(`Hello, my name is ${this.name}`)}};

type OneType = {
    name: string
    SayHello?: () => void
    hi?: () => void
}
//var1
//
let oneHello = Two.sayHello.bind(One)
oneHello()
//var2
//
One.SayHello = Two.sayHello.bind(One)
One.SayHello()
// Task 06
// создайте объект helperObj у которого есть следующие методы:
// changeName - меняет значение у свойства name объекта на полученное значение
// setAge - устанавливает полученное значение в свойство age объекта
// greeting - используется функция sayHello из Task 05
// можно использовать @ts-ignore

type helperObjType = {
    changeName: () => void
    setAge: () => void
    greeting?: () => void
    sayHello?: () => void
}

let helperObj: helperObjType = {
    //@ts-ignore
    changeName: function (name) { this.name = name },
    //@ts-ignore
    setAge: function (age) { this.age = age },
    //@ts-ignore
    sayHello: function () { console.log(`Hello, my name is ${this.name}, my age is ${this.age}`) }
}

// Bind
// 1) Дана функция sumTwoNumbers, реализовать функцию bindNumber которая принимает функцию sumTwoNumbers и число, и
// возвращает другую функцию, которое также принимает число и возвращает сумму этих чисел. Замыкание использовать нельзя

function sumTwoNumbers(a: number, b: number) { return a + b };

function bindNumber(func: Function, b: number) {
    return func.bind(func, b)
}

// let numberSix = bindNumber(sumTwoNumbers, 6)

// numberSix(6)

// 2) Напишите функцию которая принимает первым аргументом объект One, а вторым helperObj. Данная функция
// возвращает другую функцию которая принимает строку в качестве аргумента и устанавливает ее свойству name объекта One


// let One = { name: 'One' };

// let helperObj = {
//     changeName: function (name) { this.name = name },
//     setAge: function (age) { this.age = age },
//     sayHello: function () { console.log(`Hello, my name is ${this.name}, my age is ${this.age}`) }
// }

function myFunction(obj1: any, obj2: any) {
    return obj2.changeName.bind(obj1)
}

// let func = myFunction(One, helperObj)

// 3) Одной строкой установить с помощью helperObj объекту Two поле age в значение 30

helperObj.setAge.bind(Two, 30)()

// 4) Создать метод hi у объекта One, который всегда вызывает метод greeting объекта helperObj от имени Two

let One1: OneType = {
    name: 'One',
    // @ts-ignore
    hi() { helperObj.sayHello.bind(Two)() },

};

// Реализовать задачи 2-4 из Bind с помощью Call

// Задача 2

function myFunctionCall(obj1: any, obj2: any) {
    return function (string: string) { obj2.changeName.call(obj1, string) }
}

// Задача 3
// @ts-ignore
helperObj.setAge.call(Two, 30)

// Задача 4

let One2: OneType = {
    name: 'One',
    // @ts-ignore
    hi() { helperObj.sayHello.call(Two) },
};

// just a plug
export default () => {};