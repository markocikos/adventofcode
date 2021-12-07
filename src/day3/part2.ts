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
	const searchOxygen = (bitIndex: number, inputs: Array<string>): string => {
		if (inputs.length === 1) {
			return inputs[0];
		}

		const count: ICount = {
			ones: 0,
			zeroes: 0,
		};

		const onesArray: Array<string> = [];
		const zeroesArray: Array<string> = [];

		inputs.forEach((input) => {
			const bits: string[] = input.split('');

			if (bits[bitIndex] === '0') {
				count.zeroes += 1;

				zeroesArray.push(input);
			} else {
				count.ones += 1;

				onesArray.push(input);
			}
		});

		return searchOxygen(
			bitIndex + 1,
			count.ones >= count.zeroes ? onesArray : zeroesArray
		);
	};

	const oxygen: string = searchOxygen(0, inputs);

	const searchScrubber = (
		bitIndex: number,
		inputs: Array<string>
	): string => {
		if (inputs.length === 1) {
			return inputs[0];
		}

		const count: ICount = {
			ones: 0,
			zeroes: 0,
		};

		const onesArray: Array<string> = [];
		const zeroesArray: Array<string> = [];

		inputs.forEach((input) => {
			const bits: string[] = input.split('');

			if (bits[bitIndex] === '0') {
				count.zeroes += 1;

				zeroesArray.push(input);
			} else {
				count.ones += 1;

				onesArray.push(input);
			}
		});

		return searchScrubber(
			bitIndex + 1,
			count.ones >= count.zeroes ? zeroesArray : onesArray
		);
	};

	const scrubber: string = searchScrubber(0, inputs);

	console.log(
		'Life Support = ' + parseInt(oxygen, 2) * parseInt(scrubber, 2)
	);
};
