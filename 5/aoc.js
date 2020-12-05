// --- Day 5: Binary Boarding ---
//
// You board your plane only to discover a new problem: you dropped your
// boarding pass! You aren't sure which seat is yours, and all of the flight
// attendants are busy with the flood of people that suddenly made it through
// passport control.
//
// You write a quick program to use your phone's camera to scan all of the
// nearby boarding passes (your puzzle input); perhaps you can find your seat
// through process of elimination.
//
// Instead of zones or groups, this airline uses binary space partitioning to
// seat people. A seat might be specified like FBFBBFFRLR, where F means
// "front", B means "back", L means "left", and R means "right".
//
// The first 7 characters will either be F or B; these specify exactly one of
// the 128 rows on the plane (numbered 0 through 127). Each letter tells you
// which half of a region the given seat is in. Start with the whole list of
// rows; the first letter indicates whether the seat is in the front (0 through
// 63) or the back (64 through 127). The next letter indicates which half of
// that region the seat is in, and so on until you're left with exactly one row.
//
// For example, consider just the first seven characters of FBFBBFFRLR:
//
//     Start by considering the whole range, rows 0 through 127.
//     F means to take the lower half, keeping rows 0 through 63.
//     B means to take the upper half, keeping rows 32 through 63.
//     F means to take the lower half, keeping rows 32 through 47.
//     B means to take the upper half, keeping rows 40 through 47.
//     B keeps rows 44 through 47.
//     F keeps rows 44 through 45.
//     The final F keeps the lower of the two, row 44.
//
// The last three characters will be either L or R; these specify exactly one of
// the 8 columns of seats on the plane (numbered 0 through 7). The same process
// as above proceeds again, this time with only three steps. L means to keep the
// lower half, while R means to keep the upper half.
//
// For example, consider just the last 3 characters of FBFBBFFRLR:
//
//     Start by considering the whole range, columns 0 through 7.
//     R means to take the upper half, keeping columns 4 through 7.
//     L means to take the lower half, keeping columns 4 through 5.
//     The final R keeps the upper of the two, column 5.
//
// So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.
//
// Every seat also has a unique seat ID: multiply the row by 8, then add the
// column. In this example, the seat has ID 44 * 8 + 5 = 357.
//
// Here are some other boarding passes:
//
//     BFFFBBFRRR: row 70, column 7, seat ID 567.
//     FFFBBBFRRR: row 14, column 7, seat ID 119.
//     BBFFBBFRLL: row 102, column 4, seat ID 820.
//
// As a sanity check, look through your list of boarding passes. What is the
// highest seat ID on a boarding pass?
//

const parse = (data) => {
  const lines = data.trim().split('\n')
  const regex = /^(?<row>[BF]{7})(?<col>[LR]{3})$/
  const seatSpecs = lines.map(x => x.match(regex).groups)
  return seatSpecs
}

const getRow = (row) => {
  let range = 128
  let min = 0
  let max = range - 1
  for (let i = 0; i < row.length - 1; i++) {
    const ch = row[i]
    range /= 2
    switch (ch) {
      case 'F':
        max -= range
        break
      case 'B':
        min += range
        break
      default:
        console.log('What?  Bad row specifier ' + ch)
        break
    }
  }

  // already bored of switch, just do it.
  const ch = row[row.length - 1]
  if (ch === 'F') {
    return min
  } else { // "B"
    return max
  }
}

const getCol = (col) => {
  let range = 8
  let min = 0
  let max = range - 1
  for (let i = 0; i < col.length - 1; i++) {
    const ch = col[i]
    range /= 2
    switch (ch) {
      case 'L':
        max -= range
        break
      case 'R':
        min += range
        break
      default:
        console.log('What?  Bad col specifier ' + ch)
        break
    }
  }

  // already bored of switch, just do it.
  const ch = col[col.length - 1]
  if (ch === 'L') {
    return min
  } else { // "B"
    return max
  }
}

const getSeatId = (row, col) => {
  const c = getCol(col)
  const r = getRow(row)
  return 8 * r + c
}

const part1 = (input) => {
  let maxSeatId = 0
  for (const i in input) {
    const seatId = getSeatId(input[i].row, input[i].col)
    if (seatId > maxSeatId) {
      maxSeatId = seatId
    }
  }

  return maxSeatId
}

// --- Part Two ---
//
// Ding! The "fasten seat belt" signs have turned on. Time to find your seat.
//
// It's a completely full flight, so your seat should be the only missing
// boarding pass in your list. However, there's a catch: some of the seats at
// the very front and back of the plane don't exist on this aircraft, so they'll
// be missing from your list as well.
//
// Your seat wasn't at the very front or back, though; the seats with IDs +1 and
// -1 from yours will be in your list.
//
// What is the ID of your seat?
//

// Sort the array of seat ids and find the hole in the list by comparing index
// to seat id.
const part2 = (input) => {
  // pass a sort function to compare as numbers, otherwise it will be
  // alphabetized which isn't the right thing.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const ids = input.map(x => getSeatId(x.row, x.col)).sort((a, b) => a - b)
  const min = ids[0]
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== i + min) {
      return i + min
    }
  }
  console.log("couldn't find a seat")
  return 0
}

module.exports = {
  parse,
  getRow,
  getCol,
  getSeatId,
  part1,
  part2
}
