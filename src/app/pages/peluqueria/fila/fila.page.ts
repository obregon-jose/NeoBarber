import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
import { ReservarService } from 'src/app/services/reservar/reservar.service';


@Component({
  selector: 'app-fila',
  templateUrl: './fila.page.html',
  styleUrls: ['./fila.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, IonAccordionGroup, IonAccordion
  ],
})
export class FilaPage implements OnInit {
  reservas: any[] = [];

  constructor(
    private _reservarService:ReservarService,
  ) {
    // addIcons({
    //   chevronDownOutline,
    // });
      addIcons({chevronDownOutline});
  }
  // items: { title: string; content: string }[] = [
  //   { title: 'Corte de Pelo', content: 'Servicio de corte de pelo, precio: $20.000' },
  //   { title: 'Barba', content: 'Servicio de arreglo de barba, precio: $15.000' },
  //   { title: 'Lavado y Secado', content: 'Servicio de lavado y secado, precio: $10.000' },
  //   { title: 'Coloración', content: 'Servicio de coloración de cabello, precio: $25.000' }
  // ];
  ngOnInit() {
    this.mostrarReservas();
  }

  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    try {
      const data = await this._reservarService.cargarReservasPeluquero(userAuth.id);
      this.reservas = data;  
      console.log('reservas pendientes peluquero',this.reservas);  
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }
}