import lineReader from "line-reader";

const inputs: Array<number> = [];

lineReader.eachLine("inputs", function (line: string, last: string) {
  inputs.push(parseInt(line, 10));

  if (last) {
    run(inputs);
  }
});

const run = (measurements: Array<number>) => {
  let increasesCount = 0;
  let lastWindow = Number.MAX_VALUE;

  for (let i = 0; i < measurements.length - 2; i++) {
    const window = measurements[i] + measurements[i + 1] + measurements[i + 2];

    if (window > lastWindow) {
      increasesCount++;
    }

    lastWindow = window;
  }

  console.log("Number of increases = " + increasesCount);
};
