import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthUser, UserLogin } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiUrl;

  constructor(
    private navCtrl: NavController,
    private _toastService: ToastService,
    private _storageService: StorageService,
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
          const authUser: AuthUser = response.data;
          this._storageService.setData('authUser', authUser);
          // this._storageService.setSecureData('authUser', authUser);
          this.navCtrl.navigateRoot([`/tabs/home`]);
          await this.userAuthenticated();
        } else {
          this._toastService.toastRed('Error de inicio de sesión, comuníquese con soporte.');
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


  // // Eliminar el token con manejo de errores
  // async deleteToken(): Promise<void> {
  //   try {
  //     await Preferences.remove({ key: 'token' });
  //   } catch (error) {
  //     console.error('Error eliminando el token:', error);
  //   }
  // }



  async userAuthenticated(): Promise<HttpResponse>  {
    const token = await this._storageService.getTokenData(); 

    const options = {
      url: `${this.apiURL}/user`, 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    const existingAuthUser = await this._storageService.getData<AuthUser>('authUser');
    const updatedAuthUser: AuthUser = { ...existingAuthUser, ...response.data };
    this._storageService.setData('authUser', updatedAuthUser);
    return response.data;
  }

}