const fs = require("fs");

console.log("[PreBuild/PreStart]: Creating file...");

// Your file content
const fileContent = "This is the content of the file.";

// Write content to file
fs.writeFileSync("file.txt", fileContent);

console.log("File created successfully.");
