import { parse, stringify } from "yaml";
import fs from "fs";

function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// pages.yaml config parsing
const pagesConfig = parse(fs.readFileSync("./pages.yaml", "utf8"));

//Generate Pages
console.log("[PreBuild/PreStart]: Crafting Pages...");
for (const page of pagesConfig.pages) {
  // Create a file for each page
  fs.writeFileSync(
    `./src/app/pages/${page.name}.component.ts`,
    `
    import { Component } from '@angular/core';
   
    ${page.components
      .map((component) => {
        return `import { ${capitalizeFirstChar(
          `${component}Component`
        )} } from '../${component.toLowerCase()}/${component.toLowerCase()}.component';`;
      })
      .join("\n")}      

    @Component({
    selector: 'app-${page.name}-page',
    standalone: true,
    imports: [${page.components.map((component) => {
      return `${capitalizeFirstChar(`${component}Component`)}`;
    })}],
    template: \`${page.components
      .map((component) => {
        return `<${`app-${component.toLowerCase()}`}></${`app-${component.toLowerCase()}`}>`;
      })
      .join("\n")}\`,
    })
    export class ${page.name} {}
    `
  );
}

//Generate app.router.ts
console.log("[PreBuild/PreStart]: Spawning Router...");
fs.writeFileSync(
  `./src/app/app.routes.ts`,
  `
  import { Routes } from '@angular/router';
  ${pagesConfig.pages
    .map((page) => {
      return `import { ${page.name} } from './pages/${page.name}.component';`;
    })
    .join("\n")}

  export const routes: Routes = [
    ${pagesConfig.pages
      .map((page) => {
        return `{ path: '${page.path ?? ""}', component: ${page.name} },`;
      })
      .join("\n")}
  ];
  `
);

// Your file content
const fileContent = "This is the content of the file.";

// Write content to file
fs.writeFileSync("file.txt", fileContent);

console.log("File created successfully.");
