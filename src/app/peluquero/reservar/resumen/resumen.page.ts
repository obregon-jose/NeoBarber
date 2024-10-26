import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

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

  constructor(private navCtrl: NavController, private http: HttpClient, private route: ActivatedRoute) { } // Inyecta ActivatedRoute

  ngOnInit() {
    this.obtenerReserva();
  }

  obtenerReserva() {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
        this.reserva.barbero = params['barberName'];
        this.reserva.fecha = params['selectedDate'];
        this.reserva.hora = params['selectedTime'];
        this.reserva.servicios = JSON.parse(params['servicios']);
        this.reserva.precio = params['precio'];
    });
}

  confirmarReserva() {
    console.log('Reserva confirmada:', this.reserva);
    // Aquí puedes agregar la lógica para confirmar la reserva
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/servicio');
  }
}
