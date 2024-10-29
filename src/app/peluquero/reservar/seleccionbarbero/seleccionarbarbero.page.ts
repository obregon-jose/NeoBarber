import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCard, IonProgressBar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { BarbersService } from '../../services/barbers/barbers.service';

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
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    BarbersService,
    AlertToastService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class SeleccionarBarberoPage {
  barbers: any[] = [];
  progressValue: number = 0.33;

  constructor(
    private router: Router,
    private _BarbersService: BarbersService
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

  selectBarber(barber: any) {
    // Guarda el barbero seleccionado en el objeto de reserva
    localStorage.setItem('reserva', JSON.stringify({ ...JSON.parse(localStorage.getItem('reserva') || '{}'), barberName: barber.name }));
    this.router.navigate(['/peluquero/reservar/fechayhora']);
  }
}
