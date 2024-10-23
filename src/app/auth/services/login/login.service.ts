import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
  
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _router: Router,
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService,
  ) 
  {}
  
  async login(email: string, password: string): Promise<void> {
    const options = {
      url: `${this.apiUrl}/login`,
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) {
        console.log('login exitoso');
        if (response.data.role == 'cliente') {
          this._router.navigate(['/cliente']);
        } else if (response.data.role == 'peluquero') {
          this._router.navigate(['/peluquero']);
        } else if (response.data.role == 'administrador') {
          // Redirigir según sea necesario
        } else if (response.data.role == 'dueño') {
          // Redirigir según sea necesario
        } else if (response.data.role == 'root') {
          this._router.navigate(['/irregistro']);
        } else {
          this._alert_loading_Service.alertToastRed('No se ha podido identificar el usuario');
        }
        await loading.dismiss();
        this._tokenService.saveToken(response.data.token);
      } else {
        console.log('fallido', response);
        this._alert_loading_Service.alertToastYellow(response.data.message);
        await loading.dismiss();
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

  async logout(): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
        url: `${this.apiUrl}/logout`, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    try {
        const response: HttpResponse = await CapacitorHttp.post(options);
        if (response.status === 200) {
          this._alert_loading_Service.alertToastGreen(response.data.message);
          // Redirigir a la página de inicio de sesión
          this._router.navigate(['/login']);
          // Eliminar el token del almacenamiento local
          this._tokenService.deleteToken();
        } else {
            // Si la respuesta no es 200, manejar el error
        }
    } catch (error) {
        // Manejar errores de la petición HTTP
    }
  }

}