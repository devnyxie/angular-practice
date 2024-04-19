import { Routes } from '@angular/router';
import { RouteGeneratorService } from './route-generator.service';

// import fs from 'fs';

// const pagesConfig = parse(fs.readFileSync('./pages.yaml', 'utf8'));

const routeGeneratorService = new RouteGeneratorService();

const routesConfig = [
  {
    path: '',
    component: 'Component1',
  },
  {
    path: 'rrr',
    component: 'Component2',
  },
];
// pagesConfig.forEach((page: { path: any; component: any; title: any; }) => {
//   if(page.component < 2){
//     routesConfig.push({
//       path: page.path,
//       component: page.component,
//       data: {
//         title: page.title
//       }
//     });
//   } else {
//     routesConfig.push({
//       path: page.path,
//       component: page.component,
//       data: {
//         title: page.title
//       }
//     });
//   }

// });

//
//

// Get the absolute path to the pages directory

//
//
export const routes: Routes =
  routeGeneratorService.generateRoutes(routesConfig);

