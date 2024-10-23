import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Injectable({
  providedIn: 'root'
})
export class RestablecerContraseñaService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _alert_loading_Service: AlertToastService,

  ) { }
  // Enviar código de restablecimiento de contraseña
  async sendResetCode(email: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/send-reset-code`,
      data: { email },
      headers: { 'Content-Type': 'application/json' },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try { console.log('options', options);
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { console.log('exitoso',response);
        this._alert_loading_Service.alertToastGreen(response.data.message);
        await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

  // Verificar código de restablecimiento
  async verifyCode(token: string, email: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/verify-reset-code`,
      data: { token, email },
      headers: { 'Content-Type': 'application/json' },
    };
    //const loading = await this._alert_loading_Service.presentLoading();
    try { console.log('options', options);
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { console.log('exitoso',response);
        this._alert_loading_Service.alertToastGreen(response.data.message);
      //  await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        //await loading.dismiss();
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      //await loading.dismiss();
    }

  }

  // Restablecer contraseña
  async resetPassword(email: string, Password: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/password/reset/update`,
      data: { email, Password },
      headers: { 'Content-Type': 'application/json' },
    };

    //const loading = await this._alert_loading_Service.presentLoading();
    try { console.log('options', options);
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) { console.log('exitoso',response);
        this._alert_loading_Service.alertToastGreen(response.data.message);
      //  await loading.dismiss();
      } else {console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        //await loading.dismiss();
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      //await loading.dismiss();
    }
  }
}
