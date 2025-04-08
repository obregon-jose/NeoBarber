import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth/auth.guard';

export const routes: Routes = [   // PONER AUTHGUARD ⬇
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage),
  },
  {
    path: 'recover-password',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/auth/recover-password/recover-password.page').then( m => m.RecoverPasswordPage),
  },
  {
    path: 'verify-code',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/auth/recover-password/verify-code/verify-code.page').then( m => m.VerifyCodePage),
  },
  {
    path: 'new-password',
    canActivate: [publicGuard],
    loadComponent: () => import('./pages/auth/recover-password/new-password/new-password.page').then( m => m.NewPasswordPage),
  },
  /*Revisado hasta aqui*/
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    },
  
  // {
  //   path: 'reservar',
  //   loadComponent: () => import('./pages/reservar/reservar.page').then((m) => m.ReservarPage),
  // },
  // {
  //   path: 'horario',
  //   canActivate: [authGuard],
  //   loadComponent: () => import('./pages/peluqueria/peluquero/horario/horario.page').then( m => m.HorarioPage),
  //   },
  // {
  //   path: 'reservar/seleccionarbarbero',
  //   loadComponent: () => import('./pages/reservar/seleccionbarbero/seleccionarbarbero.page').then((m) => m.SeleccionarBarberoPage),

  // },
  // {
  //   path: 'reservar/fechayhora',
  //   loadComponent: () => import('./pages/reservar/fechayhora/fechayhora.page').then((m) => m.FechaYHoraPage),
  // },
  // {
  //   path: 'reservar/servicio',
  //   loadComponent: () => import('./pages/reservar/servicio/servicio.page').then( m => m.ServicioPage)
  // },
  // {
  //   path: 'reservar/resumen', 
  //   loadComponent: () => import('./pages/reservar/resumen/resumen.page').then( m => m.ResumenPage)
  // },
  // {
  //   path: 'update-day',
  //   loadComponent: () => import('./pages/peluqueria/peluquero/update-day/update-day.page').then( m => m.UpdateDayPage)
  // },


  // {
  //   path: 'agenda',
  //   loadComponent: () => import('./pages/peluqueria/peluquero/agenda/agenda.page').then( m => m.AgendaPage)
  // },

  
  // {
  //   path: 'home',
  //   loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  // },
  // {
  //   path: 'perfil',
  //   loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  // },
  // {
  //   path: 'agregar-usuario',
  //   loadComponent: () => import('./pages/auth/agregar-usuario/agregar-usuario.page').then( m => m.AgregarUsuarioPage)
  // },



];
