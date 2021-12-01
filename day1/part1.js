import lineReader from "line-reader";

let increasesCount = 0;
let lastDepth = Number.MAX_VALUE;

lineReader.eachLine("inputs", function (line, last) {
  const depth = parseInt(line, 10);

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
