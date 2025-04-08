import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;
 
  constructor(
    private _storageService: StorageService,
    private _alert_loading_Service: ToastService
  ) { }

  // Método para cargar Roles
  async cargarRoles(): Promise<any[]> {
    const token = await this._storageService.getTokenData();
    const options = {
      url: `${this.apiUrl}/roles`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    // const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      // await loading.dismiss();
      return response.data.roles || [];
    } catch (error) {
      this._alert_loading_Service.toastRed();
      // await loading.dismiss();
      return [];
    }
  }
}
