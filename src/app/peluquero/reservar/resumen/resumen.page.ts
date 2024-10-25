import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule] // Añade HttpClientModule aquí
})
export class ResumenPage implements OnInit {
  reserva: any = {
    barbero: '',
    fecha: '',
    servicios: [],
    precio: 0
  };

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.obtenerReserva();
  }

  obtenerReserva() {
    // Aquí debes reemplazar la URL con la de tu API
    this.http.get('https://tu-api.com/reserva/actual').subscribe((data: any) => {
      this.reserva = data;
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }

  confirmarReserva() {
    // Aquí puedes agregar la lógica para confirmar la reserva
    console.log('Reserva confirmada:', this.reserva);
    // Redirigir a otra página si es necesario
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/servicio'); // Redirige a la vista anterior
  }
}

