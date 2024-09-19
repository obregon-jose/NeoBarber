import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./peluquero/tabs peluquero/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./peluquero/login/login.page').then( m => m.LoginPage)
  },

];
