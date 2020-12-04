const aoc = require('./aoc')

const input = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\n\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929\n\nhcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm\n\nhcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in\n'

test('parse', () => {
  const parsed = aoc.parse(input)
  expect(parsed).toHaveLength(4)
})

test('isPassportValid', () => {
  const parsed = aoc.parse(input)
  expect(aoc.isPassportValid(parsed[0])).toBe(true)
  expect(aoc.isPassportValid(parsed[1])).toBe(false)
  expect(aoc.isPassportValid(parsed[2])).toBe(true)
  expect(aoc.isPassportValid(parsed[3])).toBe(false)
})

test('part1', () => {
  const parsed = aoc.parse(input)
  expect(aoc.part1(parsed)).toBe(2)
})

test('isPassportValid2', () => {
  const invalid = '\neyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n\niyr:2019\nhcl:#602927 eyr:1967 hgt:170cm\necl:grn pid:012533040 byr:1946\n\nhcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n\nhgt:59cm ecl:zzz\neyr:2038 hcl:74454a iyr:2023\npid:3556412378 byr:2007\n'
  const invalidParsed = aoc.parse(invalid)
  expect(aoc.isPassportValid2(invalidParsed[0])).toBe(false)
  expect(aoc.isPassportValid2(invalidParsed[1])).toBe(false)
  expect(aoc.isPassportValid2(invalidParsed[2])).toBe(false)
  expect(aoc.isPassportValid2(invalidParsed[3])).toBe(false)

  const valid = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f\n\neyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n\nhcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022\n\niyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719\n'
  const validParsed = aoc.parse(valid)
  expect(aoc.isPassportValid2(validParsed[0])).toBe(true)
  expect(aoc.isPassportValid2(validParsed[1])).toBe(true)
  expect(aoc.isPassportValid2(validParsed[2])).toBe(true)
  expect(aoc.isPassportValid2(validParsed[3])).toBe(true)
})

// These all start with the following valid passport
// 'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719'
test('isPassportValid2-byr', () => {
  const valid = aoc.parse('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:2002 eyr:2021 pid:093154719')[0]
  const invalid = aoc.parse('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:2003 eyr:2021 pid:093154719')[0]

  expect(aoc.isPassportValid2(valid)).toBe(true)
  expect(aoc.isPassportValid2(invalid)).toBe(false)
})

test('isHgtValid', () => {
  expect(aoc.isHgtValid('60in')).toBe(true)
  expect(aoc.isHgtValid('190cm')).toBe(true)
  expect(aoc.isHgtValid('190in')).toBe(false)
  expect(aoc.isHgtValid('190')).toBe(false)
})
