import lineReader from 'line-reader';

const inputs: Array<string> = [];

lineReader.eachLine('input.txt', function (line: string, last: string) {
	inputs.push(line);

	if (last) {
		run(inputs);
	}
});

const run = (inputs: Array<string>) => {
	let aim: number = 0;
	let depth: number = 0;
	let horizontalPosition: number = 0;

	inputs.forEach((input) => {
		const [direction, amount]: string[] = input.split(' ');

		const change: number = parseInt(amount, 10);

		if (direction === 'forward') {
			horizontalPosition += change;

			depth += aim * change;
		} else if (direction === 'up') {
			if (change > aim) {
				aim = 0;
			} else {
				aim -= change;
			}
		} else if (direction === 'down') {
			aim += change;
		}
	});

	console.log('Depth * Horizontal Position = ' + depth * horizontalPosition);
};
