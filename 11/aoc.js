// https://adventofcode.com/2020/day/11

const exists = (row, col, ar) => {
  if ((row < 0 || row >= ar.length || col < 0 || col >= ar[0].length)) {
    return false
  } else {
    return true
  }
}

const isOccupied = (row, col, ar) => {
  return ar[row][col] === '#'
}

const isUnOccupiedSeat = (row, col, ar) => {
  return ar[row][col] === 'L'
}

const countAdjacentOccupied = (row, col, ar) => {
  const moves = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ]

  let occupiedCount = 0
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    if (exists(row + move[0], col + move[1], ar) && isOccupied(row + move[0], col + move[1], ar)) {
      occupiedCount++
    }
  }

  return occupiedCount
}

const round = (input) => {
  const ret = Array(input.length).fill(0).map(x => Array(input[0].length).fill(0))
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const seat = input[row][col]
      switch (seat) {
        case '.': // floor
          ret[row][col] = '.'
          break

        // If a seat is empty (L) and there are no occupied seats adjacent to
        // it, the seat becomes occupied.
        case 'L': // empty
          ret[row][col] = countAdjacentOccupied(row, col, input) === 0 ? '#' : 'L'
          break

        // If a seat is occupied (#) and four or more seats adjacent to it are
        // also occupied, the seat becomes empty.
        case '#': // occupied
          ret[row][col] = countAdjacentOccupied(row, col, input) >= 4 ? 'L' : '#'
          break
      }
    }
  }

  return ret
}

const part1 = (input) => {
  let ar = input.trim().split('\n').map(x => [...x])

  let next
  for (;;) {
    next = round(ar)
    if (JSON.stringify(next) === JSON.stringify(ar)) {
      break
    }
    ar = next
  }

  const flat = [].concat(...next)
  return flat.filter(x => x === '#').length
}

const countAdjacentOccupiedForever = (row, col, ar) => {
  const moves = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
  ]

  let occupiedCount = 0
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    for (let j = 1; ; j++) {
      if (exists(row + (j * move[0]), col + (j * move[1]), ar) === false) break

      // If we see an unoccupied seat; stop looking (because we can't see
      // through seats)
      if (isUnOccupiedSeat(row + (j * move[0]), col + (j * move[1]), ar)) break
      if (isOccupied(row + (j * move[0]), col + (j * move[1]), ar)) {
        occupiedCount++
        break
      }
    }
  }

  return occupiedCount
}

const round2 = (input) => {
  const ret = Array(input.length).fill(0).map(x => Array(input[0].length).fill(0))
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const seat = input[row][col]
      switch (seat) {
        case '.': // floor
          ret[row][col] = '.'
          break

        // If a seat is empty (L) and there are no occupied seats adjacent to
        // it, the seat becomes occupied.
        case 'L': // empty
          ret[row][col] = countAdjacentOccupiedForever(row, col, input) === 0 ? '#' : 'L'
          break

        // If a seat is occupied (#) and four or more seats adjacent to it are
        // also occupied, the seat becomes empty.
        case '#': // occupied
          ret[row][col] = countAdjacentOccupiedForever(row, col, input) >= 5 ? 'L' : '#'
          break
      }
    }
  }

  return ret
}

const part2 = (input) => {
  let ar = input.trim().split('\n').map(x => [...x])

  let next
  for (;;) {
    next = round2(ar)
    if (JSON.stringify(next) === JSON.stringify(ar)) {
      break
    }
    ar = next
  }

  const flat = [].concat(...next)
  return flat.filter(x => x === '#').length
}

module.exports = {
  part1,
  part2
}
