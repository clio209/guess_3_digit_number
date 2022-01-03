#!/usr/bin/env node

'use strict'

const answer = []
const rl = require('readline').createInterface(process.stdin, process.stdout)

// ランダムで被らない3桁の答えを生成
function create_three_numbers () {
  const answer_1 = Math.floor(Math.random() * 10)
  answer.push(answer_1)

  do { var answer_2 = Math.floor(Math.random() * 10) }
  while (answer_2 === answer_1)
  answer.push(answer_2)

  do { var answer_3 = Math.floor(Math.random() * 10) }
  while (answer_3 === answer_1 || answer_3 === answer_2)
  answer.push(answer_3)
}

// 入力された数値が合っているか判定し、ヒントを返す
function find_out_correct (replay_1, replay_2, replay_3) {
  const symbol = []

  if (replay_1 === answer[0]) {
    symbol.push('○')
  } else if (replay_1 === answer[1] || replay_1 === answer[2]) {
    symbol.push('△')
  } else { symbol.push('X') }

  if (replay_2 === answer[1]) {
    symbol.push('○')
  } else if (replay_2 === answer[0] || replay_2 === answer[2]) {
    symbol.push('△')
  } else { symbol.push('X') }

  if (replay_3 === answer[2]) {
    symbol.push('○')
  } else if (replay_3 === answer[0] || replay_3 === answer[1]) {
    symbol.push('△')
  } else { symbol.push('X') }

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
  create_three_numbers()
  const gets = () => new Promise(res => rl.once('line', res))
  let num = 0
  while (num < 5) {
    ++num
    console.log(`Enter a three-digit number that you think is the answer. ${num} time(s)`)
    let str = await gets()
    str = str.split('')
    find_out_correct(parseInt(str[0]), parseInt(str[1]), parseInt(str[2]))
  }
  console.log('You could not answer the question correctly within five times. \n You are finished. Please try again.')
  process.exit()
})()
