import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then( m => m.ProfilePage),

      },
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then( m => m.HomePage),
      },
      {
        path: 'add-user',
        loadComponent: () => import('../auth/add-user/add-user.page').then( m => m.AddUserPage)
      },
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
];
