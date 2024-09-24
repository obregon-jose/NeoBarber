import { Routes } from '@angular/router';
import { TabsPeluqueroPage } from './tabs-peluquero.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPeluqueroPage,
    children: [
      {
        path: 'fila',
        loadComponent: () =>
          import('../fila/fila.page').then((m) => m.FilaPage),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('../servicios/servicios.page').then((m) => m.ServiciosPage),
      },
      {
        path: 'reservas',
        loadComponent: () =>
          import('../reservas/reservas-peluquero.page').then((m) => m.ReservasPeluqueroPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil-peluquero.page').then((m) => m.PerfilPeluqueroPage),
      },
      {
        path: '',
        redirectTo: '/peluquero/fila',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/peluquero/fila',
    pathMatch: 'full',
  },
];
