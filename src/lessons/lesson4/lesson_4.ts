console.log('lesson 4')

// http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

// Task 01
// Создайте промис, который постоянно находиться в состоянии pending.
// В конструкторе промиса выведите в консоль сообщение "Promise is created".

let myPromise1 = new Promise((res, rej) =>
  console.log('TASK01_Promise is created')
)

// Task 02
// Создайте промис, который после создания сразу же переходит в состояние resolve
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль

let mypromise2 = Promise.resolve('TASK02_Promise data').then(data =>
  console.log(data)
)

// Task 03
// Создайте промис, который после создания сразу же переходит в состояние rejected
// и возвращает строку 'Promise Error'
// Получите данные промиса и выведите их в консоль

let myPromse3 = Promise.reject('TASK03_Promise Error').catch(error =>
  console.log(error)
)

// Task 04
// Создайте промис, который переходит в состояние resolved через 3с.
// (Используйте setTimeout)
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль
let myPromise4 = new Promise(res => {
  setTimeout(() => {
    res('TASK04_Promise data')
  }, 3000)
}).then(data => console.log(data))

// Task 05
// Создайте литерал объекта handlePromise со следующими свойствами:
// promise, resolve, reject, onSuccess, onError
// Проинициализируйте первые три свойства null,
// а последние два функциями, которые принимают один параметр и выводят
// в консоль сообщения: первая - `Promise is resolved with data: ${paramName}`
// вторая - `Promise is rejected with error: ${paramName}`
// Создайте три обработчика события click для кнопок "Create Promise", "Resolve Promise", "Reject Promise".
// Первый обработчик, создает промис, заполняет первые три свойства,
// описаного выше объекта: свойство promise получает новый созданный промис,
// свойства resolve и reject получают ссылки на соответствующие функции
// resolve и reject. Следующие два обработчика запускают методы resolve и reject.
type TestObjType = {
  promise: null | Promise<any>
  resolve: null | Function
  reject: null | Function
  onSuccess: (paramName: string) => void
  onError: (paramName: string) => void
}

export let handlePromise: TestObjType = {
  promise: null,
  resolve: null,
  reject: null,
  onSuccess: (paramName: string) => {
    console.log(`Promise is resolved with data: ${paramName}`)
  },
  onError: (paramName: string) => {
    console.log(`Promise is rejected with error: ${paramName}`)
  }
}

export const createPromise = () => {
  const somePromise: Promise<any> = new Promise((res, rej) => {
    // делаем управляемый промис
    handlePromise.resolve = res
    handlePromise.reject = rej
  })
  handlePromise.promise = somePromise

  handlePromise.promise
    .then(res => handlePromise.onSuccess(res)) // это одинаковая запись
    .catch(handlePromise.onError) // это одинаковая запись, работатеть только если один аргумент

  console.log(handlePromise)
}
export const resolvepromise = () => {
  handlePromise.resolve && handlePromise.resolve('Success')
}

export const rejectPromise = () => {
  handlePromise.reject && handlePromise.reject('error')
}

//@ts-ignore
window.prom = handlePromise

// Task 06
// Создайте промис, который через 1 с возвращает строку "My name is".
// Создайте функцию onSuccess, которая получает один параметр,
// прибавляет к нему Ваше имя и возвращает новую строку из функции
// Создайте функцию print, которая выводит в консоль значение своего параметра
// Добавьте два метода then и передайте созданные функции.

let myPromise5 = new Promise((res, rej) => {
  setTimeout(() => {
    res('TASK06_ My name is...')
  }, 5000)
})

const onSuccess = (param: any): any => {
  return param + 'Vladimir'
}

const print = (param: any): void => {
  console.log(param)
}

myPromise5.then(data => onSuccess(data)).then(data => print(data))

// Task 7
// Создайте три промиса. Первый промис возвращает объект { name: "Anna" } через 2с,
// второй промис возвращает объект {age: 16} через 3 с, а третий {city: ''} через 4с.
// Получите результаты работы промисов, объедините свойства объектов
// и выведите в консоль {name, age, city}

let myPromise6 = new Promise((res, rej) => {
  setTimeout(() => {
    res({ name: 'Anna' })
  }, 2000)
})

let myPromise7 = new Promise((res, rej) => {
  setTimeout(() => {
    res({ age: 16 })
  }, 3000)
})

let myPromise8 = new Promise((res, rej) => {
  setTimeout(() => {
    res({ city: '' })
  }, 4000)
})

Promise.all([myPromise6, myPromise7, myPromise8]).then(data => {
  let arr = []
  // @ts-ignore
  arr = data.map(el => Object.entries(el)).map(el => el[0])
  let obj = Object.fromEntries(arr)
  console.log(obj)
})

// just a plug
export default () => { }

// задача возвращает  1 2 3. Надо переписать функцию sleep так, чтобы выводилось 3 2 1
// async function sleep (ms) {
//   setTimeout(() => {
//     console.log(ms)
//   }, ms * 100)
// }

// async function show () {
//   await sleep(3)
//   await sleep(2)
//   await sleep(1)
// }

// show()
// решение. Возвращает зарезолвленный промис
// async function sleep (ms) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       console.log(ms)
//       res(ms)
//     }, ms * 100)
//   })
// }

// async function show () {
//   await sleep(3) пока промис не зарезолвится, выполнение программы дальше не идет
//   await sleep(2) пока промис не зарезолвится, выполнение программы дальше не идет
//   await sleep(1) пока промис не зарезолвится, выполнение программы дальше не идет
// }

// show()
