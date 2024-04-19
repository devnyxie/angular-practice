const fs = require("fs");

// Your file content
const fileContent = "This is the content of the file.";

// Write content to file
fs.writeFileSync("file.txt", fileContent);

console.log("File created successfully.");
