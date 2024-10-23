import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _router:Router,
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService
  ) { }

  async registroUser(data: any): Promise<void> {
    const options = {
      url: `${this.apiUrl}/users`,
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) { console.log('exitoso',response);
        this._alert_loading_Service.alertToastGreen(response.data.message);
        this._router.navigate(['/login']);
        await loading.dismiss();
      } else if(response.status === 429){
        this._alert_loading_Service.alertToastYellow('Demasiados intentos');
        await loading.dismiss();
      }else {console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {console.log('fallido-2', error);
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

  // /*
  // -------- REGISTRO DE USUARIO CON ROL --------
  // */
  async crearUsuarioConRol(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/register`,
      data: {
        name: data.name,
        email: data.email,
        role_id: data.role_id,
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
        this._alert_loading_Service.alertToastGreen(response.data.message);
        await loading.dismiss();
      } else if(response.status === 429){
        this._alert_loading_Service.alertToastYellow('Demasiados intentos');
        await loading.dismiss();
      }else {console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

}
