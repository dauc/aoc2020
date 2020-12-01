const aoc01 = require('./aoc01')
const fs = require('fs')

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const expenses = data.split('\n').map(x => +x)
  console.log(aoc01.part1(expenses))
  console.log(aoc01.part2(expenses))
})
