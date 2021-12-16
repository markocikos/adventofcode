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

	const lanternGroups: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	for (let i = 0; i < lanterns.length; i++) {
		const lantern = lanterns[i];

		lanternGroups[lantern] = ++lanternGroups[lantern];
	}

	for (let day = 1; day <= 256; day++) {
		const firstLanternGroup = lanternGroups[0];

		for (let i = 1; i < lanternGroups.length; i++) {
			lanternGroups[i - 1] = lanternGroups[i];
		}

		lanternGroups[8] = firstLanternGroup;

		lanternGroups[6] = lanternGroups[6] + firstLanternGroup;
	}

	const population = lanternGroups.reduce(
		(acc: number, cur: number) => acc + cur
	);

	console.log(`Population of lanterns = ${population}`);
};
