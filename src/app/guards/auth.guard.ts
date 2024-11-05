import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { NavController } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const _navCtrl = inject(NavController);
  const role = await authService.getRole();
  if (role) {
    _navCtrl.navigateRoot(['/dashboard']);  
    return false;
  }

  return true;
};
