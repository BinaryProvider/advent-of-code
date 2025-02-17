import { bench, read } from '@lib';
import { directionMarkerAssociations } from '@lib/model/direction-marker-associations.const';
import { Vec2 } from '@lib/model/vec2.class';
import { day, year } from '.';

export const runner = async (input: string) =>
	input.split(``).reduce(
		(acc, next) => {
			const c = acc.isRobot ? acc.roboCurrent : acc.current;
			c.addMut(directionMarkerAssociations[next]);
			const cs = c.toString();
			acc.locations.set(cs, (acc.locations.get(cs) || 0) + 1);
			acc.isRobot = !acc.isRobot;
			return acc;
		},
		{
			locations: new Map<string, number>([[new Vec2(0, 0).toString(), 2]]),
			current: new Vec2(0, 0),
			roboCurrent: new Vec2(0, 0),
			isRobot: false
		}
	).locations.size;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2631 ~2.8ms
}
