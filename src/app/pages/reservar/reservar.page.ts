import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardSubtitle, 
  IonCardTitle, IonCardHeader, IonCard, IonBadge, IonItem, IonCardContent, 
  IonLabel, IonIcon, IonFabButton, IonFab, IonList, IonPopover, AlertController
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { SeleccionarBarberoPage } from "./seleccionbarbero/seleccionarbarbero.page"; // Importa Router para la navegación
import { ResumenPage } from './resumen/resumen.page';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { Preferences } from '@capacitor/preferences';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, calendar, alarm, person, ellipsisVertical, createOutline, trashOutline, ellipsisHorizontal } from 'ionicons/icons';


@Component({
  selector: 'app-reservar-peluquero',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [    IonList, IonFab, IonFabButton, IonIcon, IonLabel, IonCardContent, IonItem, IonBadge, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonPopover, RouterLink, CommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReservarPage  implements OnInit  {
  reservas: any[] = [];



  constructor(
    private _reservarService:ReservarService,
    private alertController: AlertController,
  ) {
    addIcons({ellipsisHorizontal,createOutline,trashOutline,add,person,alarm,calendar,ellipsisVertical});
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
      const reservasPendientes = data.filter((reserva: any) => reserva.status === 'pending')
       .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Ordena pendientes por más recientes;
      const reservasCompletadas = data.filter((reserva: any) => reserva.status === 'completed') 
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Ordena completadas por más recientes;
      
      // Concatenar primero las pendientes y luego las completadas
      this.reservas = [...reservasPendientes, ...reservasCompletadas];
  
      // this.reservas.sort((a, b) => b.id - a.id); // Ordena las reservas por id de forma descendente
      console.log('reservas cliente pendientes y completadas',this.reservas);
       
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }





  async cancelarReserva(data: any) {
    let ReservationData = {
      id: data.id,
      barber_id: data.barber_id,
    };
    await this._reservarService.cancelarReserva(ReservationData); // espera la edición
    await this.mostrarReservas(); // luego recarga los servicios
    
  }


  async cancelarAlert(data: any) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea cancelar la reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Cancelar reserva',
          handler: () => {
            this.cancelarReserva(data);
          }
        },
      ]
    });
    await alert.present();
  }
  
}
    