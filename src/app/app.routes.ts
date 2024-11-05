import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage),
    canActivate: [authGuard]
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage),
    canActivate: [authGuard]
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./pages/auth/recover-password/recover-password.page').then( m => m.RecoverPasswordPage),
    canActivate: [authGuard]
  },
  {
    path: 'verify-code',
    loadComponent: () => import('./pages/auth/recover-password/verify-code/verify-code.page').then( m => m.VerifyCodePage),
    canActivate: [authGuard]
  },
  {
    path: 'password-new',
    loadComponent: () => import('./pages/auth/recover-password/password-new/password-new.page').then( m => m.PasswordNewPage),
    canActivate: [authGuard]
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
  {
    path: 'service',
    loadComponent: () => import('./pages/barbershop/service/service.page').then( m => m.ServicePage)
  },
];
