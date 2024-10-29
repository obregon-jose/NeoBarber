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

  constructor(private navCtrl: NavController, private http: HttpClient) { } // Inyecta ActivatedRoute

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

  confirmarReserva() {
    console.log('Reserva confirmada:', this.reserva);
    // Aquí puedes agregar la lógica para confirmar la reserva
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/servicio');
  }
}
