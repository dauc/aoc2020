import { Day9 } from "./aoc";
import { AocClient } from 'advent-of-code-client';

const main = async () => {
  const client = new AocClient({
    year: 2020,
    day: 9,
    token: process.env.AOC_SESSION
  });

  const input = await client.getInput();
  let day = new Day9(input)

  const p1 = day.part1()
  await client.submit(1, p1);
  await client.submit(2,  day.part2(p1));
}

main()
