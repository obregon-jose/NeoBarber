import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservarService {
  private apiUrl = environment.apiUrl

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService,
  ) { }

  // async crearReserva(id:number,barbero:string,fecha:string,hora:string, servicios:[],precio:number): Promise<void> {
  //   const token = await this._authService.getToken();
  //   const options = {
  //     url: `${this.apiUrl}+/reservations`,
  //     data: {
  //       name: data.
  //       price: data.price,
  //     },
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //   };
  //   const loading = await this._alert_loading_Service.presentLoading();
  //   try {
  //     const response: HttpResponse = await CapacitorHttp.post(options);
  //     if (response.status === 201) { console.log('exitoso',response);
  //       this._alert_loading_Service.toastGreen(response.data.message);
  //       await loading.dismiss();
  //     } else {console.log('fallido', response);
  //       this._alert_loading_Service.toastYellow(response.data.message);
  //       await loading.dismiss();
  //     }
  //   } catch (error) {
  //     console.log('fallido-2');
  //     this._alert_loading_Service.toastRed();
  //     await loading.dismiss();
  //   }
  // }
}
