import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthService } from '../../../auth/auth.service';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class UpdateDayService {
  private apiUrl = environment.apiUrl;
  public variableCompartida: string = '';

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async cargarDisponibilidad(selectedDate: string): Promise<any[]> {
    try {
      const { value: userValue } = await Preferences.get({ key: 'user' });
      const userAuth = userValue ? JSON.parse(userValue) : {};
      const barberId= userAuth.id;

      const options = {
        url: `${this.apiUrl}/barbero/${barberId}/disponibilidad/${selectedDate}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this._authService.getToken()}`
        },
      };

      const loading = await this._alert_loading_Service.presentLoading();
      const response: HttpResponse = await CapacitorHttp.get(options);
      await loading.dismiss();
      return response.data.franjas || [];
    } catch (error) {
      this._alert_loading_Service.toastRed();
      return [];
    }
  }

  async actualizarHorario(data: any,id:number,fecha:string): Promise<void> {
    const token = await this._authService.getToken(); 
    const options = {
      data: data,
      url: `${this.apiUrl}/barbero/${id}/horarios/${fecha}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.put(options);
      if (response.status === 200) { console.log('exitoso',response);
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