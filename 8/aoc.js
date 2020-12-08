// https://adventofcode.com/2020/day/8

class Program {
  constructor (input) {
    this.program = input.trim().split('\n').map(x => x.split(' '))
    this.ip = 0
    this.acc = 0
    this.terminated = false
  }

  reset () {
    this.ip = 0
    this.acc = 0
  }

  step () {
    const ins = this.program[this.ip]
    switch (ins[0]) {
      case 'acc':
        this.acc += Number(ins[1])
        this.ip += 1
        break

      case 'jmp':
        this.ip += Number(ins[1])
        break

      case 'nop':
        this.ip += 1
        break
    }

    if (this.ip === this.program.length) {
      this.terminated = true
    }
  }
}

// Run a program and see if we're reached any instructions before.
const doesProgLoop = (prog) => {
  const trace = []
  while (1) {
    if (trace[prog.ip] === true) {
      return [true, prog.acc]
    }
    trace[prog.ip] = true

    prog.step()

    if (prog.terminated) {
      return [false, prog.acc]
    }
  }
}

const part1 = input => {
  const prog = new Program(input)
  return doesProgLoop(prog)[1]
}

const part2 = (input) => {
  const prog = new Program(input)

  const swapInstr = (prog, i) => {
    if (prog.program[i][0] === 'nop') {
      prog.program[i][0] = 'jmp'
    } else if (prog.program[i][0] === 'jmp') {
      prog.program[i][0] = 'nop'
    }
  }

  for (let i = 0; i < prog.program.length; i++) {
    swapInstr(prog, i)

    prog.reset()
    const loops = doesProgLoop(prog)
    if (loops[0] === false) {
      return loops[1]
    }

    swapInstr(prog, i)
  }
}

module.exports = {
  part1,
  part2
}
