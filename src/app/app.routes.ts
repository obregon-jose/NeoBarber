import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)
  },
  
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'client',
    loadComponent: () => import('./pages/home/client/client.page').then( m => m.ClientPage)
  },
  {
    path: 'owner',
    loadComponent: () => import('./pages/home/owner/owner.page').then( m => m.OwnerPage)
  },
  {
    path: 'root',
    loadComponent: () => import('./pages/home/root/root.page').then( m => m.RootPage)
  },
  {
    path: 'barber',
    loadComponent: () => import('./pages/home/barber/barber.page').then( m => m.BarberPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/home/admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'add-user',
    loadComponent: () => import('./pages/auth/add-user/add-user.page').then( m => m.AddUserPage)
  },


];
