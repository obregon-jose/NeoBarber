import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router:Router,
    private _toastAlertService: ToastService,
  ) { }

  // Guardar un token de manera segura y con manejo de errores
  async saveToken(token: string): Promise<void> {
    try {
      if (!token) {
        throw new Error('Token inválido'); // Verificar que el token es válido
      }
      await Preferences.set({
        key: 'token',
        value: token,
      });
    } catch (error) {
      console.error('Error guardando el token:', error);
    }
  }

  // Eliminar el token con manejo de errores
  async deleteToken(): Promise<void> {
    try {
      await Preferences.remove({ key: 'token' });
    } catch (error) {
      console.error('Error eliminando el token:', error);
    }
  }

   // Obtener el token de manera segura con manejo de errores
  async getToken(): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key: 'token' });
      if (!value) {
        this._toastAlertService.toastRed('Tenemos Problemas para verificar su identidad. Por favor, inicie sesión nuevamente.');
        this._router.navigate(['/login']);
      }
      return value;
    } catch (error) {
      this._toastAlertService.toastRed('Ocurrió un error inesperado. Por favor, intente nuevamente. Si el problema persiste, inicie sesión nuevamente.');
      return null;
    }
  }

  // Limpiar todo el almacenamiento - PELIGROSO
  // clearPreferences = async () => {
  //   await Preferences.clear();
  // };
}
