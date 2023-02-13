const fs = require("fs");

const [inputFile, outputFile] = process.argv.slice(2);

fs.readFile(inputFile, "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");
  const header = lines.shift();

  const filteredLines = lines.filter(line => {
    const columns = line.split(",");
    return columns[2] !== "yes";
  });

  const output = [header, ...filteredLines].join("\n");

  fs.writeFile(outputFile, output, err => {
    if (err) throw err;

    console.log(`Data written to ${outputFile}`);
  });
});