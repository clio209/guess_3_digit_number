#!/usr/bin/env node

'use strict'

const answer = []
const rl = require('readline').createInterface(process.stdin, process.stdout)

// ランダムで被らない3桁の答えを生成
function createThreeNumbers () {
  const answer_1 = Math.floor(Math.random() * 10)
  answer.push(answer_1)
  
  let answer_2 = 0
  let answer_3 = 0
  
  do { answer_2 = Math.floor(Math.random() * 10) }
  while (answer_2 === answer_1)
  answer.push(answer_2)

  do { answer_3 = Math.floor(Math.random() * 10) }
  while (answer_3 === answer_1 || answer_3 === answer_2)
  answer.push(answer_3)
}

// 入力された数値が合っているか判定し、ヒントを返す
function findOutCorrect (replay_1, replay_2, replay_3) {
  const symbol = []
  const replays = [replay_1,replay_2,replay_3]

replays.forEach(function(replay,index){
  if (replay === answer[index]) {
        symbol.push('○')
      } else if (answer.includes(replay)) {
        symbol.push('△')
      } else { symbol.push('X') }
})

  const maru_count = symbol.filter(function (x) { return x === '○' }).length
  const sannkaku_count = symbol.filter(function (x) { return x === '△' }).length
  const batsu_count = symbol.filter(function (x) { return x === 'X' }).length

  if (maru_count === 3) {
    console.log("You're right! Congratulations!")
    process.exit()
  }

  console.log("I'm afraid not, sir.")
  console.log('hint  ○ =' + maru_count + ' △ =' + sannkaku_count + ' X =' + batsu_count)
  console.log(' ○..digit and number match \n △..only number match(digit is not match) \n X..neither digit nor number match')
}

(async function () {
  console.log(' Guess the 3-digit number within 5 times. \n Do not use the same number for the three digits. ')
  createThreeNumbers()
  const gets = () => new Promise(res => rl.once('line', res))
  let num = 0
  while (num < 5) {
    ++num
    console.log(`Enter a three-digit number that you think is the answer. ${num} time(s)`)
    rl.prompt()
    let str = await gets()
    str = str.split('')
    findOutCorrect(parseInt(str[0]), parseInt(str[1]), parseInt(str[2]))
  }
  console.log('You could not answer the question correctly within five times. \n You are finished. Please try again.')
  process.exit()
})()
