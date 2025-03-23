import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)
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
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  // {
  //   path: 'reservar',
  //   loadComponent: () => import('./pages/reservar/reservar.page').then((m) => m.ReservarPage),
  // },
  {
    path: 'horario',
    loadComponent: () => import('./pages/peluqueria/peluquero/horario/horario.page').then( m => m.HorarioPage)
  },
  {
    path: 'reservar/seleccionarbarbero',
    loadComponent: () => import('./pages/reservar/seleccionbarbero/seleccionarbarbero.page').then((m) => m.SeleccionarBarberoPage),
  },
  {
    path: 'reservar/fechayhora',
    loadComponent: () => import('./pages/reservar/fechayhora/fechayhora.page').then((m) => m.FechaYHoraPage),
  },
  {
    path: 'reservar/servicio',
    loadComponent: () => import('./pages/reservar/servicio/servicio.page').then( m => m.ServicioPage)
  },
  {
    path: 'reservar/resumen', 
    loadComponent: () => import('./pages/reservar/resumen/resumen.page').then( m => m.ResumenPage)
  },
  {
    path: 'update-day',
    loadComponent: () => import('./pages/peluqueria/peluquero/update-day/update-day.page').then( m => m.UpdateDayPage)
  },

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
  //   path: 'client',
  //   loadComponent: () => import('./pages/home/client/client.page').then( m => m.ClientPage)
  // },
  // {
  //   path: 'owner',
  //   loadComponent: () => import('./pages/home/owner/owner.page').then( m => m.OwnerPage)
  // },
  // {
  //   path: 'root',
  //   loadComponent: () => import('./pages/home/root/root.page').then( m => m.RootPage)
  // },
  // {
  //   path: 'barber',
  //   loadComponent: () => import('./pages/home/barber/barber.page').then( m => m.BarberPage)
  // },
  // {
  //   path: 'admin',
  //   loadComponent: () => import('./pages/home/admin/admin.page').then( m => m.AdminPage)
  // },
  // {
  //   path: 'agregar-usuario',
  //   loadComponent: () => import('./pages/auth/agregar-usuario/agregar-usuario.page').then( m => m.AgregarUsuarioPage)
  // },



];
