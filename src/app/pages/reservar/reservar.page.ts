import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonBadge, IonItem, IonCardContent, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { SeleccionarBarberoPage } from "./seleccionbarbero/seleccionarbarbero.page"; // Importa Router para la navegación
import { ResumenPage } from './resumen/resumen.page';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-reservar-peluquero',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
  imports: [IonIcon, IonLabel, IonCardContent, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    RouterLink,
  ],
})
export class ReservarPage  implements OnInit  {
  reserva: any;
  reservas: any[] = [];

  constructor(
    private _reservarService:ReservarService,
  ) {
    
    // Inicializa la reserva con datos de ejemplo
    this.reserva = {
      nombre: 'Juan Pérez',
      fecha: '2023-10-01',
      hora: '10:00 AM'
    };
  }

  ngOnInit() {
    this.mostrarReservas();
  }

  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    try {
      const data = await this._reservarService.cargarReservasCliente(userAuth.id);
      this.reservas = data; 
      console.log('reservas cliente pendientes, canceladas y completadas',this.reservas); 
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }
}
    