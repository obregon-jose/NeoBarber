import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarbersService {
  private apiUrl = environment.apiUrl+'/barbers';

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService
  ) { }

  async cargarBarberos(): Promise<any[]> {
    const token = await this._authService.getToken();
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
      await loading.dismiss();
      return response.data || [];
    } catch (error) {
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
      return [];
    }
  }

}
