import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Type } from '@angular/core';

// if there are many components for one path, we will have to create wrapper component, import them,
// insert them in array of imports, and declare them in the template. We have server side for these actions.

class routeObj {
  path: string = '';
  component: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class RouteGeneratorService {
  constructor() {}

  generateRoutes(routesConfig: routeObj[]): Route[] {
    const routes: Route[] = [];

    routesConfig.forEach((routeConfig) => {
      const route: Route = {
        path: routeConfig.path,
        component: this.resolveComponents(routeConfig.component),
      };
      routes.push(route);
    });

    for (let i = 0; i < routes.length; i++) {
      console.log('routes: ', routes[i].path);
    }
    return routes;
  }

  resolveComponents(componentNames: string): any {
    // if (Array.isArray(componentNames)) {
    //   return componentNames.map((name) => this.getComponentByName(name));
    // } else {
    return this.getComponentByName(componentNames);
    // }
  }

  getComponentByName(name: string): Type<any> {
    switch (name) {
      case 'Component1':
        return Component1Component;
      case 'Component2':
        return Component2Component;
      // Add cases for other components...
      default:
        throw new Error(`Component ${name} not found.`);
    }
  }
}
