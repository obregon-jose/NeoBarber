import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _alert_loading_Service: ToastService,
    private _navCtrl: NavController,
    private _authService: AuthService,
  ) { }
  // Enviar código de restablecimiento de contraseña
  async sendResetCode(email: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/send-reset-code`,
      data: { 
        email 
      },
      headers: { 'Content-Type': 'application/json' },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { 
        this._alert_loading_Service.toastGreen(response.data.message);
        await loading.dismiss();
        this._navCtrl.navigateRoot(['/verify-code'], { queryParams: { email } });
      } else {console.log('fallido', response);
        this._alert_loading_Service.toastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }

  // Verificar código de restablecimiento
  async verifyCode(token: string, email: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/verify-reset-code`,
      data: { 
        token, 
        email 
      },
      headers: { 'Content-Type': 'application/json' },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try { 
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { 
        this._alert_loading_Service.toastGreen('Código verificado correctamente');
        this._navCtrl.navigateRoot(['/password-new'], { queryParams: { email, token } });
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

  // Restablecer contraseña
  async resetPassword(token: string, email: string, password: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/reset-update`,
      data: { 
        token,
        email, 
        password 
      },
      headers: { 'Content-Type': 'application/json' },
    };

    const loading = await this._alert_loading_Service.presentLoading();
    try { 
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { 
        this._alert_loading_Service.toastGreen(response.data.message);
        this._authService.login(email, password);
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
}
