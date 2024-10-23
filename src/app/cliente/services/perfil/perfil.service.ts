import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl+'/user';
  constructor(
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService
  ) { }
  

  async cargarUsuario(): Promise<any[]> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      console.log('exitoso', response);
      await loading.dismiss();
      return response.data.users || [];
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
      return [];
    }
  }
}
