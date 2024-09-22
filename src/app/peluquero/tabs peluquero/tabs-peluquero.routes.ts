import { Routes } from '@angular/router';
import { TabsPage } from './tabs-peluquero.page';

export const routes: Routes = [
  {
    path: 'peluquero',
    component: TabsPage,
    children: [
      {
        path: 'fila',
        loadComponent: () =>
          import('../fila/fila.page').then((m) => m.FilaPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../servicios/servicios.page').then((m) => m.ServiciosPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../reservas/reservas-peluquero.page').then((m) => m.ReservasPeluqueroPage),
      },
      {
        path: 'tab4',
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
