import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService,
  ) { }
  

  async cargarUsuario(): Promise<any> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/user`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      // console.log('exitoso', response.data);
      await loading.dismiss();
      return response.data
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }


  async editarPerfil(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/user-details/${data.id}`,
      data: {
        name: data.name,
        nickname: data.nickname, 
        phone: data.phone,       
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 200) {console.log('exitoso', response);
        this._alert_loading_Service.alertToastGreen(response.data.message );
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

 
}
