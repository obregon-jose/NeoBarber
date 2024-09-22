import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./peluquero/tabs peluquero/tabs-peluquero.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./auth/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro.page').then( m => m.RegistroPage)
  },
  



];
