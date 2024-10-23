import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'peluquero',
    loadChildren: () => import('./peluquero/tabs peluquero/tabs-peluquero.routes').then( m => m.routes)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/tabs cliente/tabs-cliente.routes').then( m => m.routes)
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
  {
    path: 'passrecovery',
    loadComponent: () => import('./auth/passrecovery/passrecovery.page').then( m => m.PassrecoveryPage)
  },
  {
    path: 'codeconfirmation',
    loadComponent: () => import('./auth/passrecovery/codeconfirmation/codeconfirmation.page').then( m => m.CodeconfirmationPage)
  },
  {
    path: 'changepassword',
    loadComponent: () => import('./auth/passrecovery/changepassword/changepassword.page').then( m => m.ChangepasswordPage)
  },
  {
    path: 'registropeluquero',
    loadComponent: () => import('./root/registropeluquero/registropeluquero.page').then( m => m.RegistropeluqueroPage)
  },
  {
    path: 'irregistro',
    loadComponent: () => import('./root/irregistro/irregistro.page').then( m => m.IrregistroPage)
  },
 







];
