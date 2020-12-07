// --- Day 7: Handy Haversacks ---
//
// You land at the regional airport in time for your next flight. In fact, it
// looks like you'll even have time to grab some food: all flights are currently
// delayed due to issues in luggage processing.
//
// Due to recent aviation regulations, many rules (your puzzle input) are being
// enforced about bags and their contents; bags must be color-coded and must
// contain specific quantities of other color-coded bags. Apparently, nobody
// responsible for these regulations considered how long they would take to
// enforce!
//
// For example, consider the following rules:
//
// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
//
// These rules specify the required contents for 9 bag types. In this example,
// every faded blue bag is empty, every vibrant plum bag contains 11 bags (5
// faded blue and 6 dotted black), and so on.
//
// You have a shiny gold bag. If you wanted to carry it in at least one other
// bag, how many different bag colors would be valid for the outermost bag? (In
// other words: how many colors can, eventually, contain at least one shiny
// gold bag?)
//
// In the above rules, the following options would be available to you:
//
//     A bright white bag, which can hold your shiny gold bag directly.
//     A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
//     A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
//     A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
//
// So, in this example, the number of bag colors that can eventually contain
// at least one shiny gold bag is 4.
//
// How many bag colors can eventually contain at least one shiny gold bag? (The
// list of rules is quite long; make sure you get all of it.)
//

const splitInputIntoRules = (input) => {
  return input.trim().split('\n')
}

const parseRulesFromInput = (input) => {
  const ruleStrings = splitInputIntoRules(input)
  const rulesParsed = ruleStrings.map(parseRule2)
  const rules = {}
  for (let i = 0; i < rulesParsed.length; i++) {
    const r = rulesParsed[i]
    rules[r[0]] = r[1]
  }
  return rules
}

//  muted yellow bags => "muted yellow"
const parseColorFirst = (s) => {
  const regex = /^(?<color>[a-z ]+) (bags|bag)$/
  const match = regex.exec(s)
  return match.groups.color
}

//  "1 bright white bag" or "no other bags."
// returns [key, value]
// [ "bright white",  1 ] or null
// We threw away the comma separator but we still need to look for the trailing
// period
const parseColor2 = (s) => {
  const regex = /^(?<number>[0-9]|[no]+) (?<color>[a-z ]+) (bags|bag)([.])?$/
  const match = regex.exec(s)
  if (match.groups.number === 'no') {
    return null
  } else {
    return [match.groups.color, match.groups.number]
  }
}

// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// return [key, value] where key is the color of the rule and value is
// ["muted yellow": ["shiny gold: 2, "faded blue": 9]]
const parseRule2 = (rule) => {
  const split = rule.split(/(contain|,)/)
  const filtered = split.filter((a, i) => i % 2 === 0)
  const color = parseColorFirst(filtered[0].trim())
  const counts = filtered.slice(1).map(x => x.trim()).map(parseColor2).filter(x => x !== null)
  const ret = [color, counts]
  return ret
}

// Given a desiredColot, a color for inspection color and a set of rules, can th
// the desired color be eventually contained in a `color`?
// {
//   'light red': [ [ 'bright white', '1' ], [ 'muted yellow', '2' ] ],
//   'dark orange': [ [ 'bright white', '3' ], [ 'muted yellow', '4' ] ],
//   'bright white': [ [ 'shiny gold', '1' ] ],
//   'muted yellow': [ [ 'shiny gold', '2' ], [ 'faded blue', '9' ] ],
//   'shiny gold': [ [ 'dark olive', '1' ], [ 'vibrant plum', '2' ] ],
//   'dark olive': [ [ 'faded blue', '3' ], [ 'dotted black', '4' ] ],
//   'vibrant plum': [ [ 'faded blue', '5' ], [ 'dotted black', '6' ] ],
//   'faded blue': [],
//   'dotted black': []
// }
const canHoldGoldBag = (desired, color, rules) => {
  if (desired === color) return true

  // Check if the the desired color can be contained in a color.  If not, check
  // if the desired color can be contained by any of the colors in the current
  // color.
  const rule = rules[color]
  for (let i = 0; i < rule.length; i++) {
    if (rule[i][0] === color) continue
    if (canHoldGoldBag(desired, rule[i][0], rules) === true) {
      return true
    }
  }
  return false
}

const part1 = (input) => {
  const rules = parseRulesFromInput(input)

  let count = 0
  for (const color in rules) {
    if (color === 'shiny gold') continue
    if (canHoldGoldBag('shiny gold', color, rules)) {
      count++
    }
  }

  return count
}

// --- Part Two ---
//
// It's getting pretty expensive to fly these days - not because of ticket
// prices, but because of the ridiculous number of bags you need to buy!
//
// Consider again your shiny gold bag and the rules from the above example:
//
//     faded blue bags contain 0 other bags.
//     dotted black bags contain 0 other bags.
//     vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
//     dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
//
// So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags
// within it) plus 2 vibrant plum bags (and the 11 bags within each of those):
// 1 + 1*7 + 2 + 2*11 = 32 bags!
//
// Of course, the actual rules have a small chance of going several levels
// deeper than this example; be sure to count all of the bags, even if the
// nesting becomes topologically impractical!
//
// Here's another example:
//
// shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.
//
// In this example, a single shiny gold bag must contain 126 other bags.
//
// How many individual bags are required inside your single shiny gold bag?

const bagsContainedBy = (color, rules) => {
  const rule = rules[color]
  let sum = 1
  for (let i = 0; i < rule.length; i++) {
    sum += rule[i][1] * bagsContainedBy(rule[i][0], rules)
  }
  return sum
}

const part2 = (input) => {
  const rules = parseRulesFromInput(input)
  return bagsContainedBy('shiny gold', rules) - 1
}

module.exports = {
  parseColor2,
  parseRule2,
  part1,
  bagsContainedBy,
  part2
}
