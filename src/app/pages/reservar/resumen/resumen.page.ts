import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonProgressBar,AlertController } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importa ActivatedRoute
import { Router } from '@angular/router'; // Importa Router para la navegación
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Preferences } from '@capacitor/preferences';
import { ReservarService } from 'src/app/services/reservar/reservar.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    RouterLink,
  ]
})
export class ResumenPage implements OnInit {
  reserva: any = {
    barbero_id: 0,
    barbero: '',
    fecha: '',
    hora: '',
    servicios: [],
    precio: 0
  };

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController, 
    private _alertService: ToastService,
    private _reserva: ReservarService 
  ) { } // Inyecta ActivatedRoute

  ngOnInit() {
    this.obtenerReserva();
  }

  async obtenerReserva() {
    // Obtener la reserva actual
    const { value } = await Preferences.get({ key: 'reserva' });
    const reserva = value ? JSON.parse(value) : {};

    // // Guardar la reserva actualizada
    // await Preferences.set({
    //   key: 'reserva',
    //   value: JSON.stringify(reserva),
    // });

    // this._navCtrl.navigateRoot(['/reservar/servicio']);


    // const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');

    this.reserva.barbero_id = reserva.barberId ;
    this.reserva.barbero = reserva.barberName ;
    this.reserva.fecha = reserva.selectedDate ;
    this.reserva.hora = reserva.selectedTime ;
    this.reserva.servicios = reserva.servicios ;
    this.reserva.precio = reserva.precio;
  }

  async confirmarReserva() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};

    let reservaData ={
      barber_id: this.reserva.barbero_id,
      client_id:  userAuth.id, //
      date: this.reserva.fecha,
      time: this.reserva.hora,
      service_details: this.reserva.servicios,
      total_paid: this.reserva.precio,
    };
    console.log('Reserva confirmada:', reservaData);
    await this._reserva.crearReserva(reservaData); // espera a que el servicio sea creado
    //await this.mostrarReserva(); // luego recarga los servicios

    // this._alertService.toastGreen('Tu reserva ha sido realizada con éxito.', 'top');
    // // Muestra el mensaje de éxito
    // const alert = await this.alertController.create({
    //   header: 'Reserva Confirmada',
    //   message: 'Tu reserva ha sido realizada con éxito.',
    //   buttons: ['OK']
    // });
    // await alert.present();
  }

  // volver() {
  //   // this.navCtrl.navigateBack('/peluquero/reservar/servicio');

  //   const currentUrl = this.router.url;
  //   let newUrl = '';

  //   if (currentUrl.includes('cliente')) {
  //     newUrl = 'cliente/reservar/servicio';
  //   } else if (currentUrl.includes('peluquero')) {
  //     newUrl = '/peluquero/reservar/servicio';
  //   }

  //   this.router.navigate([newUrl]);
  // }
}
