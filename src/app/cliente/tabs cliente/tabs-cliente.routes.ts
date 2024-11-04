import { Routes } from '@angular/router';
import { TabsClientePage } from './tabs-cliente.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsClientePage,
    children: [
      // {
      //   path: 'fila',
      //   loadComponent: () =>
      //     import('../fila/fila.page').then((m) => m.FilaPage),
      // },
      // {
      //   path: 'tab2',
      //   loadComponent: () =>
      //     import('../servicios/servicios.page').then((m) => m.ServiciosPage),
      // },
      // {
      //   path: 'reservas',
      //   loadComponent: () =>
      //     import('../reservas/reservas-cliente.page').then((m) => m.ReservasClientePage),
      // },

      {
        path: 'reservar',
        loadComponent: () =>
          import('../../shared/reservar/reservar.page').then((m) => m.ReservarPage),
      },
      {
        path: 'reservar/seleccionarbarbero',
        loadComponent: () =>
          import('../../shared/reservar/seleccionbarbero/seleccionarbarbero.page').then((m) => m.SeleccionarBarberoPage),
      },
      {
        path: 'reservar/fechayhora',
        loadComponent: () =>
          import('../../shared/reservar/fechayhora/fechayhora.page').then((m) => m.FechaYHoraPage),
      },
      {
        path: 'reservar/servicio',
        loadComponent: () => import('../../shared/reservar/servicio/servicio.page').then( m => m.ServicioPage)
      },
      {
        path: 'reservar/resumen',
        loadComponent: () => import('../../shared/reservar/resumen/resumen.page').then( m => m.ResumenPage)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil-cliente.page').then((m) => m.PerfilClientePage),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      // {
      //   path: 'tab4',
      //   loadComponent: () =>
      //     import('../perfil/perfil-peluquero.page').then((m) => m.PerfilPeluqueroPage),
      // },
      {
        path: '',
        redirectTo: '/cliente/home',
        pathMatch: 'full',
      },
    ],
  },
  
];
