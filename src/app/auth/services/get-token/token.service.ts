import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private _router:Router,
    private _alertService: AlertToastService,
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
        this._alertService.alertToastRed('Tenemos Problemas para verificar su identidad. Por favor, inicie sesión nuevamente.');
        this._router.navigate(['/login']);
      }
      return value;
    } catch (error) {
      this._alertService.alertToastRed('Ocurrió un error inesperado. Por favor, intente nuevamente. Si el problema persiste, inicie sesión nuevamente.');
      return null;
    }
  }

  // Limpiar todo el almacenamiento - PELIGROSO
  // clearPreferences = async () => {
  //   await Preferences.clear();
  // };

}