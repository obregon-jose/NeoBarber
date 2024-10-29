import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonFooter, IonButtons, IonButton, IonCheckbox, IonProgressBar } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/peluquero/services/servicios/servicios.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { AlertController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: true,
  imports: [
    IonProgressBar,
    IonButton,
    IonButtons,
    IonFooter,
    IonItem,
    IonLabel,
    IonListHeader,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCheckbox,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ServiciosService,
    AlertToastService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServicioPage implements OnInit {
  private unsubscribe$ = new Subject<void>();
  services: any[] = [];
  barberName: string = ''; // Propiedad para el nombre del barbero
  selectedDate: string = ''; // Propiedad para la fecha seleccionada
  selectedTime: string = ''; // Propiedad para la hora seleccionada

  constructor(
    private navCtrl: NavController,
    private _serviciosServicie: ServiciosService,
    private _alertService: AlertToastService,
    private alertController: AlertController,
    private _loading: AlertToastService,
    private route: ActivatedRoute, // Inyección de ActivatedRoute
  ) { }

  ngOnInit() {
    const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    this.barberName = reserva.barberName || '';
    this.selectedDate = reserva.selectedDate || '';
    this.selectedTime = reserva.selectedTime || '';
    this.mostrarServicios();
  }

  async mostrarServicios() {
    try {
      const data = await this._serviciosServicie.cargarServicios();
      this.services = data;  
      console.log(this.services);  
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/fechayhora');
  }

  siguiente() {
    const serviciosSeleccionados = this.services.filter(service => service.selected);
    console.log('Servicios seleccionados:', serviciosSeleccionados);

    if (serviciosSeleccionados.length > 0) {
      const totalPrecio = serviciosSeleccionados.reduce((total, service) => total + service.price, 0);
      const serviciosParaResumen = serviciosSeleccionados.map(service => ({
        nombre: service.name, // Ajusta según el nombre exacto de la propiedad en tu JSON
        precio: service.price
      }));

      localStorage.setItem('reserva', JSON.stringify({ ...JSON.parse(localStorage.getItem('reserva') || '{}'), servicios: serviciosParaResumen, precio: totalPrecio }));

      this.navCtrl.navigateForward('/peluquero/reservar/resumen');
    } else {
      this._alertService.alertToastYellow('Por favor selecciona al menos un servicio', 'top');
    }
  }
}
