import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonProgressBar,AlertController } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule]
})
export class ResumenPage implements OnInit {
  reserva: any = {
    barbero: '',
    fecha: '',
    hora: '',
    servicios: [],
    precio: 0
  };

  constructor(private navCtrl: NavController, private http: HttpClient,private alertController: AlertController,  private router: Router, private _alertService: AlertToastService,) { } // Inyecta ActivatedRoute

  ngOnInit() {
    this.obtenerReserva();
  }

  obtenerReserva() {
    const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    this.reserva.barbero = reserva.barberName || '';
    this.reserva.fecha = reserva.selectedDate || '';
    this.reserva.hora = reserva.selectedTime || '';
    this.reserva.servicios = reserva.servicios || [];
    this.reserva.precio = reserva.precio || 0;
  }

  async confirmarReserva() {
    console.log('Reserva confirmada:', this.reserva);

    this._alertService.alertToastGreen('Tu reserva ha sido realizada con éxito.', 'top');
    // // Muestra el mensaje de éxito
    // const alert = await this.alertController.create({
    //   header: 'Reserva Confirmada',
    //   message: 'Tu reserva ha sido realizada con éxito.',
    //   buttons: ['OK']
    // });
    // await alert.present();
  }

  volver() {
    // this.navCtrl.navigateBack('/peluquero/reservar/servicio');

    const currentUrl = this.router.url;
    let newUrl = '';

    if (currentUrl.includes('cliente')) {
      newUrl = 'cliente/reservar/servicio';
    } else if (currentUrl.includes('peluquero')) {
      newUrl = '/peluquero/reservar/servicio';
    }

    this.router.navigate([newUrl]);
  }
}
