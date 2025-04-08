import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthService } from '../../auth/auth.service';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from 'src/app/shared/services/storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  // async cargarDisponibilidad(): Promise<any[]> {
  //   const token = await this._storageService.getTokenData(); 
  //   const options = {
  //     url: ${this.apiUrl}/barbero/6/disponibilidad/2024-12-10,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': Bearer ${token}
  //     },
  //   };
  //   const loading = await this._alert_loading_Service.presentLoading();
  //   try {
  //     const response: HttpResponse = await CapacitorHttp.get(options);
  //     await loading.dismiss();
  //     return response.data || [];
  //   } catch (error) {
  //     this._alert_loading_Service.toastRed();
  //     await loading.dismiss();
  //     return [];
  //   }
  // }
  async cargarDisponibilidad(selectedDate: string): Promise<any[]> {
    try {
      const { value } = await Preferences.get({ key: 'reserva' });
      const reserva = value ? JSON.parse(value) : {};
      const barberId = reserva.barberId;

      const options = {
        url: `${this.apiUrl}/barbero/${barberId}/disponibilidad/${selectedDate}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this._storageService.getTokenData()}`
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
}