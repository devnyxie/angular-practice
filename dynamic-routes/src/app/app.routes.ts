import { Routes } from '@angular/router';
import { RouteGeneratorService } from './route-generator.service';

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

export const routes: Routes =
  routeGeneratorService.generateRoutes(routesConfig);
