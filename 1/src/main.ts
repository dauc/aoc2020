import { parseData, part1, part2 } from "./aoc01"
const fs = require('fs')

fs.readFile(__dirname + '/../input', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsed = parseData(data)
  console.log(part1(parsed))
  console.log(part2(parsed))
})
