import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { NavController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiURL;

  constructor(
    private _navCtrl: NavController,
    private _tokenService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async registerUser(data: any): Promise<void> {
    const options = {
      url: `${this.apiUrl}/users`,
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) { 
        this._alert_loading_Service.toastGreen(response.data.message);
        this._navCtrl.navigateRoot(['/login']);
        await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }

  // /*
  // -------- REGISTRO DE USUARIO CON ROL --------
  // */
  async addUser(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/register`,
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) { console.log('exitoso',response);
        this._alert_loading_Service.toastGreen(response.data.message);
        await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }

}
