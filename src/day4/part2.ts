import lineReader from 'line-reader';

const inputs: Array<string> = [];

lineReader.eachLine('input.txt', function (line: string, last: string) {
	inputs.push(line);

	if (last) {
		run(inputs);
	}
});

const run = (inputs: Array<string>) => {
	const boards: Array<Array<Array<string | number>>> = [];

	let board: Array<Array<string | number>> = [];

	// load inputs to boards data structure

	let bingoBoards: Array<boolean> = [];

	for (let i: number = 2; i < inputs.length; i++) {
		let input: string = inputs[i];

		input = input.replace(/\s+/g, ' ').trim();

		const j = i - 2;

		if (j % 6 === 0) {
			board = [input.split(' ')];
		} else if (j % 6 > 0 && j % 6 < 5) {
			board.push(input.split(' '));
		}

		if (j % 6 === 4) {
			boards.push(board);

			bingoBoards.push(false);
		}
	}

	interface IBingo {
		board: Array<Array<string | number>>;
		draw: string;
	}

	const bingo = (config: IBingo) => {
		console.log(config.board);

		let unmarkedSum: number = 0;

		config.board.forEach((row) => {
			row.forEach((cell) => {
				if (typeof cell === 'string') {
					unmarkedSum += parseInt(cell, 10);
				}
			});
		});

		console.log('Final score = ' + parseInt(config.draw) * unmarkedSum);

		return;
	};

	const draws: Array<string> = inputs[0].split(',');

	for (let h: number = 0; h < draws.length; h++) {
		const draw = draws[h];

		for (let i: number = 0; i < boards.length; i++) {
			const board: Array<Array<string | number>> = boards[i];

			let bingoColumns = [true, true, true, true, true];

			for (let j: number = 0; j < board.length; j++) {
				const row: Array<string | number> = board[j];

				let bingoRow = true;

				for (let k: number = 0; k < row.length; k++) {
					const number: string | number = row[k];

					if (number === draw) {
						row[k] = parseInt(number, 10);
					}

					if (typeof row[k] === 'string') {
						bingoRow = false;

						bingoColumns[k] = false;
					}
				}

				if (bingoRow) {
					// BINGO!
					bingoBoards[i] = true;

					let last: boolean = true;

					bingoBoards.forEach((bingo) => {
						if (!bingo) {
							last = false;
						}
					});

					if (last) {
						bingo({board, draw});

						return;
					}
				}
			}

			for (let l: number = 0; l < bingoColumns.length; l++) {
				if (bingoColumns[l]) {
					// BINGO!
					bingoBoards[i] = true;

					let last: boolean = true;

					bingoBoards.forEach((bingo) => {
						if (!bingo) {
							last = false;
						}
					});

					if (last) {
						bingo({board, draw});

						return;
					}
				}
			}
		}
	}
};
