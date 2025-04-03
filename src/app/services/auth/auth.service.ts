import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { UserLogin } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiUrl;

  constructor(
    private navCtrl: NavController,
    private _toastService: ToastService,
  ) { }

  async login(user: UserLogin): Promise<HttpResponse> {
    const options = {
      url: `${this.apiURL}/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      },
    };

      const response: HttpResponse = await CapacitorHttp.post(options);

      if (response.status === 200) {
        if (response.data.role) {
          this.navCtrl.navigateRoot([`/tabs/home`]);
          //organizar
          this.saveRole(response.data.role);
          this.saveToken(response.data.token);
          await this.userAuthenticated();
        } else {
          this._toastService.toastRed('No se ha podido identificar el usuario, por favor comuníquese con soporte.');
        }
      }

      return response;
    
  }

  
  async logout(): Promise<void> {
  //   const token = await this.getToken();
  //   const options = {
  //     url: `${this.apiURL}/logout`, 
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     // this.deleteToken();
  //     // this.removeRole();
  //     await Preferences.clear();
  //     this.navCtrl.navigateRoot(['/login']);
  //     const response: HttpResponse = await CapacitorHttp.post(options);
  //     if (response.status === 200) {
  //       // this.removeReserva();
  //       // this.removeUserAuth();
  //       // this.deleteToken();
  //       // this.removeRole();
  //     }
  //   } catch (error) {
  //     this._toastService.toastRed();
  //   }
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

  // // Eliminar el token con manejo de errores
  // async deleteToken(): Promise<void> {
  //   try {
  //     await Preferences.remove({ key: 'token' });
  //   } catch (error) {
  //     console.error('Error eliminando el token:', error);
  //   }
  // }

  // Obtener el token de manera segura con manejo de errores
  async getToken(): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key: 'token' });
      if (!value) {
        this._toastService.toastRed('Tenemos Problemas para verificar su identidad. Por favor, inicie sesión nuevamente.');
        this.navCtrl.navigateRoot(['/login']);
      }
      return value;
    } catch (error) {
      this._toastService.toastRed('Ocurrió un error inesperado. Por favor, intente nuevamente. Si el problema persiste, inicie sesión nuevamente.');
      return null;
    }
  }


  async userAuthenticated() {
    const token = await this.getToken();
    const options = {
      url: `${this.apiURL}/user`, 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    // Obtener
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};

    userAuth.id = response.data.id;
    userAuth.name = response.data.name;
    userAuth.email = response.data.email;
    
    // Guardar
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(userAuth),
    });

  }

  // async removeUserAuth() {
  //   await Preferences.remove({ key: 'user' });
  // }

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
