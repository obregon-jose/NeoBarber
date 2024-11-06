import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/auth/services/get-token/token.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = environment.apiUrl;

  constructor(
    // 
    private _tokenService: TokenService,
    private _alert_loading_Service: AlertToastService
  ) { }

  async cargarHorarios(id: number): Promise<any[]> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/${id}/horario`,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      console.log('exitoso', response);
      await loading.dismiss();
      return response.data.horario || [];
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.alertToastRed('La conexión al servidor fue rechazada');
      await loading.dismiss();
      return [];
    }
  }

  ////CREAR////////
  async crearHorario(data: any): Promise<void> {
    const token = await this._tokenService.getToken();
    const options = {
      url: `${this.apiUrl}/${data.id}/horario/createTimeSlots`,
      data: {
        //variable backend: variable data.frontend
        horas_inicio: data.horas_inicio,
        dias: data.dias,
      },
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
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


  
}