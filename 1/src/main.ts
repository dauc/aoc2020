import { Day1 } from "./aoc01"
const fs = require('fs')

fs.readFile(__dirname + '/../input', 'utf8', (err : any, data : string) => {
  if (err) {
    console.error(err)
    return
  }

  let day = new Day1(data)
  console.log(day.part1())
  console.log(day.part2())
})
