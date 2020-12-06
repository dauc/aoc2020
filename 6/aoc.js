// --- Day 6: Custom Customs ---
//
// As your flight approaches the regional airport where you'll switch to a much
// larger plane, customs declaration forms are distributed to the passengers.
//
// The form asks a series of 26 yes-or-no questions marked a through z. All you
// need to do is identify the questions for which anyone in your group answers
// "yes". Since your group is just you, this doesn't take very long.
//
// However, the person sitting next to you seems to be experiencing a language
// barrier and asks if you can help. For each of the people in their group, you
//  write down the questions for which they answer "yes", one per line. For
// example:
//
// abcx
// abcy
// abcz
//
// In this group, there are 6 questions to which anyone answered "yes": a, b, c,
// x, y, and z. (Duplicate answers to the same question don't count extra; each
// question counts at most once.)
//
// Another group asks for your help, then another, and eventually you've
// collected answers from every group on the plane (your puzzle input). Each
// group's answers are separated by a blank line, and within each group, each
// person's answers are on a single line. For example:
//
// abc
//
// a
// b
// c
//
// ab
// ac
//
// a
// a
// a
// a
//
// b
//
// This list represents answers from five groups:
//
//     The first group contains one person who answered "yes" to 3 questions: a, b, and c.
//     The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
//     The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
//     The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
//     The last group contains one person who answered "yes" to only 1 question, b.
//
// In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.
//
// For each group, count the number of questions to which anyone answered "yes".
// What is the sum of those counts?
//

const getGroups = (data) => {
  return data.trim().split('\n\n')
}

const getGroupCount = (group) => {
  const members = group.trim().split('\n')
  const reduce = members.join('')

  const set = new Set()
  for (let i = 0; i < reduce.length; i++) {
    set.add(reduce[i])
  }

  return set.size
}

const part1 = (input) => {
  const groups = getGroups(input)
  const counts = groups.map(x => getGroupCount(x))
  const sum = counts.reduce((acc, val) => acc + val)
  return sum
}

// --- Part Two ---
//
// As you finish the last group's customs declaration, you notice that you
// misread one word in the instructions:
//
// You don't need to identify the questions to which anyone answered "yes"; you
// need to identify the questions to which everyone answered "yes"!
//
// Using the same example as above:
//
// abc
//
// a
// b
// c
//
// ab
// ac
//
// a
// a
// a
// a
//
// b
//
// This list represents answers from five groups:
//
//     In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
//     In the second group, there is no question to which everyone answered "yes".
//     In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
//     In the fourth group, everyone answered yes to only 1 question, a.
//     In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
//
// In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.
//
// For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function intersection (setA, setB) {
  const _intersection = new Set()
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

const getGroupCount2 = (group) => {
  const listOfGroupMembersAnswers = group.trim().split('\n')

  // get a set of answers for each member of the group.
  const sets = listOfGroupMembersAnswers.map(x => {
    const set = new Set()
    for (let i = 0; i < x.length; i++) {
      set.add(x[i])
    }
    return set
  })

  // find the intersection of the answers for each member of the group.  these
  // are the answers that each member of the group had in common.
  // Just use sets[0] as a scratch space
  for (let i = 1; i < sets.length; i++) {
    sets[0] = intersection(sets[0], sets[i])
  }
  return sets[0].size
}

const part2 = (input) => {
  const groups = getGroups(input)
  const counts = groups.map(x => getGroupCount2(x))
  const sum = counts.reduce((acc, val) => acc + val)
  return sum
}

module.exports = {
  getGroupCount,
  part1,
  getGroupCount2,
  part2
}
