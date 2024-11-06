import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const _navCtrl = inject(NavController);
  const role = await authService.getRole();
  if (role) {
    _navCtrl.navigateRoot(['/tabs']);  
    return false;
  }

  return true;
};
