import { bench } from '@lib';
import { inputs } from '.';
import { range } from './functions/range.generator';
import { Coord } from './model/coord.class';

export const runner = (input: number): string => {
	const map: Map<string, number> = new Map();

	for (const coord of range({ from: 1, to: 300 }, { from: 1, to: 300 })) {
		const rackID = coord.x + 10;
		let powerLevel = rackID * coord.y;
		powerLevel += input;
		powerLevel *= rackID;
		powerLevel = Math.floor((powerLevel % 1000) / 100);
		powerLevel -= 5;
		map.set(coord.toString(), powerLevel);
	}

	const max = [...range({ from: 1, to: 298 }, { from: 1, to: 298 })].reduce(
		(acc, next) => {
			const sum = [...next].map(c => map.get(c.toString()) || 0).reduce((a, n) => (a += n), 0);
			if (sum > acc.sum) {
				acc.coord = next;
				acc.sum = sum;
			}
			return acc;
		},
		{ coord: (undefined as unknown) as Coord, sum: -Infinity }
	);
	return `${max.coord} (${max.sum})`;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(() => inputs.one.input, runner)}`))(); // 21,37 (30) ~165ms
}
