import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): string | undefined => {
	const lineCache: string[] = [];
	for (const line of input.split(/\r?\n/)) {
		for (const cachedLine of lineCache) {
			let matchingChars = 0;
			let notMatchingPos = -1;
			for (let i = 0; i < cachedLine.length; i++) {
				if (line.charAt(i) === cachedLine.charAt(i)) {
					matchingChars++;
				} else {
					notMatchingPos = i;
				}
			}
			if (matchingChars + 1 === cachedLine.length) {
				return line.slice(0, notMatchingPos) + line.slice(notMatchingPos + 1, line.length + 1);
			}
		}
		lineCache.push(line);
	}
	return undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // megsdlpulxvinkatfoyzxcbvq ~9.6ms
}
