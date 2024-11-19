import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async cargarDisponibilidad(id: number, fecha: string): Promise<any[]> {
    const token = await this._authService.getToken();
    const options = {
      url: `${this.apiUrl}/barber-agenda/${id}/${fecha}`,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      await loading.dismiss();
      return response.data.agenda || [];
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
      return [];
    }
  }
}
