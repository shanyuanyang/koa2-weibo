setImmediate(() => {
  console.log('immediate')
})

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('settimeout')
}, 0)

async1();

new Promise((resolve, reject) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

process.nextTick(() => {
  console.log('nexttick')
})

console.log('script end')