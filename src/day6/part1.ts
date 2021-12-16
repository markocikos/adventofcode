import lineReader from 'line-reader';

lineReader.eachLine('input.txt', function (line: string, last: string) {
	if (last) {
		run(line);
	}
});

const run = (input: string) => {
	const lanterns: Array<number> = input.split(',').map((lantern) => {
		return Number(lantern);
	});

	for (let day = 1; day <= 80; day++) {
		const startPopulation = lanterns.length;

		for (let i = 0; i < startPopulation; i++) {
			const lantern = lanterns[i];

			if (lantern > 0) {
				lanterns[i] = lantern - 1;
			} else {
				lanterns[i] = 6;

				lanterns.push(8);
			}
		}
	}

	console.log(`Population of lanterns = ${lanterns.length}`);
};
