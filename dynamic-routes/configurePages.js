import { parse, stringify } from "yaml";
import fs from "fs";

function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function log(...args) {
  console.log(`[configure-pages-process]`, ...args);
}

// pages.yaml config parsing
const pagesConfig = parse(fs.readFileSync("./pages.yaml", "utf8"));

try {
  //Create empty pages directory
  const pagesDirPath = "./src/app/pages";
  if (fs.existsSync(pagesDirPath)) {
    fs.rmSync(pagesDirPath, { recursive: true });
  }
  fs.mkdirSync(pagesDirPath, { recursive: true });

  //Generate Pages
  log("Crafting Pages...");
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
  log("Spawning Router...");
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
} catch (error) {
  //break app
  console.error(`Error executing script: ${error}`);
  process.exit(1);
} finally {
  //start angular app
  log("Executed successfully");
  process.exit(0);
}
