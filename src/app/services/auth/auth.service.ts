import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiUrl;

  constructor(
    private _navCtrl: NavController,
    private _toastAlertService: ToastService,
  ) { }

  async login(email: string, password: string): Promise<void> {
    const options = {
      url: `${this.apiURL}/login`,
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const loading = await this._toastAlertService.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) {
        this.saveRole(response.data.role);
        if (response.data.role) {
            this._navCtrl.navigateRoot([`/tabs/home`]);
        } else {
          this._toastAlertService.toastRed('No se ha podido identificar el usuario, por favor comuníquese con soporte.');
        }
        await loading.dismiss();
        this.saveToken(response.data.token);
      } else {
        console.log('fallido', response);
        this._toastAlertService.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._toastAlertService.toastRed();
      await loading.dismiss();
    }
  }

  async logout(): Promise<void> {
    const token = await this.getToken();
    const options = {
      url: `${this.apiURL}/logout`, 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
    };

    try {
      this.deleteToken();
      this.removeRole();
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 204) {
        this._navCtrl.navigateRoot(['/login']);
        this.removeReserva();
        // this.deleteToken();
        // this.removeRole();
      }
    } catch (error) {
      this._toastAlertService.toastRed();
    }
  }

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
        this._navCtrl.navigateRoot(['/login']);
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

  async saveRole(role: string): Promise<void> {
    await Preferences.set({ key: 'role', value: role });
  }
  async getRole() {
    const { value } = await Preferences.get({ key: 'role' });
    return value;
  }
  async removeRole() {
    await Preferences.remove({ key: 'role' });
  }

  async removeReserva() {
    await Preferences.remove({ key: 'reserva' });
  }
}
