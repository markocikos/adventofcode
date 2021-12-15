import lineReader from 'line-reader';

const inputs: Array<string> = [];

lineReader.eachLine('input.txt', function (line: string, last: string) {
	inputs.push(line);

	if (last) {
		run(inputs);
	}
});

const run = (inputs: Array<string>) => {
	// 'x-y': 2
	interface IVents {
		[key: string]: number;
	}

	const vents: IVents = {};

	const increaseVent = (key: string) => {
		const ventCount = vents[key];

		vents[key] = !ventCount ? 1 : ventCount + 1;
	};

	inputs.forEach((input) => {
		const [start, end] = input.split(' -> ');

		const [startXstr, startYstr] = start.split(',');
		const [endXstr, endYstr] = end.split(',');

		const startX = Number(startXstr);
		const startY = Number(startYstr);
		const endX = Number(endXstr);
		const endY = Number(endYstr);

		// vertical lines
		if (startX === endX) {
			const minY = Math.min(startY, endY);
			const maxY = Math.max(startY, endY);

			for (let i = minY; i <= maxY; i++) {
				increaseVent(`${startX}-${i}`);
			}
		}

		// horizontal lines
		if (startY === endY) {
			const minX = Math.min(startX, endX);
			const maxX = Math.max(startX, endX);

			for (let i = minX; i <= maxX; i++) {
				increaseVent(`${i}-${startY}`);
			}
		}

		// down right lines
		if (endX - startX === endY - startY) {
			const minX = Math.min(startX, endX);
			const maxX = Math.max(startX, endX);

			const minY = Math.min(startY, endY);

			for (let i = minX, j = minY; i <= maxX; i++, j++) {
				increaseVent(`${i}-${j}`);
			}
		}

		// up right lines
		if (endX - startX === startY - endY) {
			const minX = Math.min(startX, endX);
			const maxX = Math.max(startX, endX);

			const maxY = Math.max(startY, endY);

			for (let i = minX, j = maxY; i <= maxX; i++, j--) {
				increaseVent(`${i}-${j}`);
			}
		}
	});

	// count overlaps
	const overlap = Object.values(vents).filter(
		(entry: number) => entry > 1
	).length;

	console.log(`Number of overlaping vents = ${overlap}`);
};
