import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async cargarHorarios(id: number): Promise<any[]> {
    const token = await this._authService.getToken();
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
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
      return [];
    }
  }

  ////CREAR////////
  async crearHorario(data: any,id:number): Promise<void> {
    const token = await this._authService.getToken(); 
    const options = {
      data: data,
      url: `${this.apiUrl}/${id}/horario/createTimeSlots`,
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
      console.log('fallido-2');
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
    }
  }


  
}