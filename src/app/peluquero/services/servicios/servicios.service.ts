import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = environment.apiUrl+'/services';

  constructor(
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService
  ) { }

  // Método para cargar servicios
  async cargarServicios(): Promise<any[]> {
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
      return response.data.services || [];
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
      return [];
    }
  }

  // mostrarUnServicio(data: any){}
  
  // Crear un servicio
  async crearServicio(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}`,
      data: {
        name: data.name,
        price: data.price,
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

  //Editar un servicio
  async editarServicios(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/${data.id}`,
      data: {
        name: data.name,
        price: data.price,
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

  //Eliminar servicio
  async eliminarServicios(id: number): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.delete(options);
      if (response.status === 200) { console.log('exitoso', response);
        this._alert_loading_Service.alertToastGreen(response.data.message );
        await loading.dismiss();
      } else { console.log('fallido');
        this._alert_loading_Service.alertToastYellow(response.data.message);
        await loading.dismiss();
        // Si la respuesta no es 200, manejar el error
      }
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
    }
  }

}
