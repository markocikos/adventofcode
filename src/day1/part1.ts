import lineReader from "line-reader";

let increasesCount: number = 0;
let lastDepth: number = Number.MAX_VALUE;

lineReader.eachLine("inputs", function (line: string, last: string) {
  const depth: number = parseInt(line, 10);

  if (depth > lastDepth) {
    increasesCount++;

    console.log(depth + " (increased) - count: " + increasesCount);
  } else {
    console.log(depth + " (decreased)");
  }

  lastDepth = depth;

  if (last) {
    console.log("Number of increases = " + increasesCount);
  }
});
