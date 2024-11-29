import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then( m => m.HomePage),
      },
      {
        path: 'reservar',
        loadComponent: () => import('../reservar/reservar.page').then((m) => m.ReservarPage),
      },

      {
        path: 'fila',
        loadComponent: () => import('../peluqueria/fila/fila.page').then((m) => m.FilaPage),
      },
      {
        path: 'servicios',
        loadComponent: () => import('../peluqueria/servicios/servicios.page').then((m) => m.ServiciosPage),
      },

      {
        path: 'horario',
        loadComponent: () => import('../peluqueria/peluquero/horario/horario.page').then( m => m.HorarioPage)
      },
      {
        path: 'update-day',
        loadComponent: () => import('../peluqueria/peluquero/update-day/update-day.page').then( m => m.UpdateDayPage)
      },
      {
      path: 'modal',
        loadComponent: () => import('../peluqueria/peluquero/update-day/horario-modal/horario-modal.component').then( m => m.HorarioModalComponent)
      },
    

      // {
      //   path: 'reservar/seleccionarbarbero',
      //   loadComponent: () => import('../reservar/seleccionbarbero/seleccionarbarbero.page').then((m) => m.SeleccionarBarberoPage),
      // },
      // {
      //   path: 'reservar/fechayhora',
      //   loadComponent: () => import('../reservar/fechayhora/fechayhora.page').then((m) => m.FechaYHoraPage),
      // },
      // {
      //   path: 'reservar/servicio',
      //   loadComponent: () => import('../reservar/servicio/servicio.page').then( m => m.ServicioPage)
      // },
      // {
      //   path: 'reservar/resumen', 
      //   loadComponent: () => import('../reservar/resumen/resumen.page').then( m => m.ResumenPage)
      // },

      {
        path: 'agregar-usuario',
        loadComponent: () => import('../auth/agregar-usuario/agregar-usuario.page').then( m => m.AgregarUsuarioPage)
      },

      {
        path: 'perfil',
        loadComponent: () => import('../perfil/perfil.page').then( m => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
