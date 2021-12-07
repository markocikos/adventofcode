import lineReader from 'line-reader';

const inputs: Array<string> = [];

lineReader.eachLine('input.txt', function (line: string, last: string) {
	inputs.push(line);

	if (last) {
		run(inputs);
	}
});

interface ICount {
	ones: number;
	zeroes: number;
}

const run = (inputs: Array<string>) => {
	const counts: Array<ICount> = [];

	for (let i: number = 0; i < 12; i++) {
		counts.push({
			ones: 0,
			zeroes: 0,
		});
	}

	inputs.forEach((input) => {
		const bits: string[] = input.split('');

		for (let i: number = 0; i < 12; i++) {
			if (bits[i] === '0') {
				counts[i].zeroes += 1;
			} else {
				counts[i].ones += 1;
			}
		}
	});

	let gamma: number = 0;
	let epsilon: number = 0;

	for (let i: number = 11; i >= 0; i--) {
		const power = 11 - i;

		const count = counts[i];

		if (count.ones > count.zeroes) {
			gamma += Math.pow(2, power);
		} else {
			epsilon += Math.pow(2, power);
		}
	}

	console.log('Gamma * Epsilon = ' + gamma * epsilon);
};
