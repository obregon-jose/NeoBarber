import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ReservarService {
  private apiUrl = environment.apiUrl

  constructor(
    private _authService: AuthService,
    private _alert_loading_Service: ToastService,
    private navCtrl: NavController,
  ) { }

  async crearReserva(data:any): Promise<void> {
    const token = await this._authService.getToken();
     const options = {
      url: `${this.apiUrl}/reservations`,
      data: {
        client_name : data.client_name ,
        barber_id: data.barber_id,
        service_details: JSON.stringify(data.service_details),
        total_paid: data.total_paid,
        //reserva
        client_id: data.client_id,
        date: data.date,
        time: data.time,
        // end_time  : 'required|date_format:H:i',
        // status : 'sometimes|in:1,pending',
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    console.log('Reserva:', options);
     const loading = await this._alert_loading_Service.presentLoading();
     try {
       const response: HttpResponse = await CapacitorHttp.post(options);
       if (response.status === 201) { console.log('exitoso',response);
         this._alert_loading_Service.toastGreen(response.data.message);
         this.navCtrl.navigateRoot(['/tabs/reservar']);
         await loading.dismiss();
       } else {console.log('fallido', response);
         this._alert_loading_Service.toastYellow(response.data.message);
         await loading.dismiss();
       }
     } catch (error) {
       this._alert_loading_Service.toastRed();
       await loading.dismiss();
     }
  }

  // Método para cargar reservas del cliente
  async cargarReservasCliente(id: number): Promise<any[]> {
    const token = await this._authService.getToken();
    const options = {
      url: `${this.apiUrl}/reservations-client/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const loading = await this._alert_loading_Service.presentLoading();
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      await loading.dismiss();
      return response.data.reservations || [];
    } catch (error) {
      console.log('fallido-2');
      this._alert_loading_Service.toastRed();
      await loading.dismiss();
      return [];
    }
  }

    // Método para cargar reservas del peluquero
    async cargarReservasPeluquero(id: number): Promise<any[]> {
      const token = await this._authService.getToken();
      const options = {
        url: `${this.apiUrl}/reservations-barber/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      const loading = await this._alert_loading_Service.presentLoading();
      try {
        const response: HttpResponse = await CapacitorHttp.get(options);
        await loading.dismiss();
        return response.data.reservationsPending || [];
      } catch (error) {
        console.log('fallido-2');
        this._alert_loading_Service.toastRed();
        await loading.dismiss();
        return [];
      }
    }

}
