import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCard, IonProgressBar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BarbersService } from 'src/app/services/peluqueria/barbers/barbers.service';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seleccionarbarbero-peluquero',
  templateUrl: 'seleccionarbarbero.page.html',
  styleUrls: ['seleccionarbarbero.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonRow,
    IonCol,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar,
    RouterLink,
    IonButtons,
  ],

  schemas: [NO_ERRORS_SCHEMA],
})

export class SeleccionarBarberoPage {
  barbers: any[] = [];

  constructor(
    private _BarbersService: BarbersService,
    private _navCtrl: NavController,
  ) {
    this.mostrarBarberos();
  }

  async mostrarBarberos() {
    try {
      const data = await this._BarbersService.cargarBarberos();
      this.barbers = data;  // Asigna los datos al array
      console.log(this.barbers);  // Aquí tendrás los servicios cargados
    } catch (error) {
      console.error('Error al cargar los barberos', error);
    }
  }

  async selectBarber(barber: any) {
    try {
      // Obtener la reserva actual
      const { value } = await Preferences.get({ key: 'reserva' });
      const reserva = value ? JSON.parse(value) : {};

      reserva.barberId = barber.id;
      reserva.barberName = barber.name;

      // Guardar la reserva actualizada
      await Preferences.set({
        key: 'reserva',
        value: JSON.stringify(reserva),
      });

      this._navCtrl.navigateRoot(['/reservar/fechayhora']);

    } catch (error) {
      console.error('Error al guardar la reserva', error);
    }
  }

}
