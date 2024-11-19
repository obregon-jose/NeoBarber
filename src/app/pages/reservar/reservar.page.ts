import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonBadge, IonItem, IonCardContent, IonLabel, IonIcon, IonFabButton, IonFab, IonList } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { SeleccionarBarberoPage } from "./seleccionbarbero/seleccionarbarbero.page"; // Importa Router para la navegación
import { ResumenPage } from './resumen/resumen.page';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, calendar, alarm, person } from 'ionicons/icons';



@Component({
  selector: 'app-reservar-peluquero',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonList, IonFab, IonFabButton, IonIcon, IonLabel, IonCardContent, IonItem, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    RouterLink,CommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReservarPage  implements OnInit  {
  reservas: any[] = [];

  constructor(
    private _reservarService:ReservarService,
  ) {
    addIcons({add,person,alarm,calendar,});
  }

  ngOnInit() {
    this.mostrarReservas();
  }
  
  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }

  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    try {
      const data = await this._reservarService.cargarReservasCliente(userAuth.id);
      this.reservas = data; 
      this.reservas.sort((a, b) => b.id - a.id); // Ordena las reservas por id de forma descendente
      console.log('reservas cliente pendientes, canceladas y completadas',this.reservas);
       
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }
}
    