
  import { Routes } from '@angular/router';
  import { Home } from './pages/Home.component';
import { About } from './pages/About.component';

  export const routes: Routes = [
    { path: '', component: Home },
{ path: 'about', component: About },
  ];
  