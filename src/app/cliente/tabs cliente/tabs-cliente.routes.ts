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
      {
        path: 'reservas',
        loadComponent: () =>
          import('../reservas/reservas-cliente.page').then((m) => m.ReservasClientePage),
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
        redirectTo: '/cliente/reservas',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/cliente/reservas',
    pathMatch: 'full',
  },
];
