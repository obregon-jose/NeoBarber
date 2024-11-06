import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _navCtrl: NavController,
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async RegistrarUsuario(data: any): Promise<void> {
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
        this._authService.login(data.email, data.password);
        // this._navCtrl.navigateRoot(['/login']);
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
  async agregarUsuario(data: any): Promise<void> {
    const token = await this._authService.getToken();
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
      if (response.status === 201) { 
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
