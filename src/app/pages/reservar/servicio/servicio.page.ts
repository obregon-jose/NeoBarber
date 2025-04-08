import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonFooter, IonButtons, IonButton, IonCheckbox, IonProgressBar } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/peluqueria/servicios/servicios.service';
import { AlertController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importa ActivatedRoute
import { Router } from '@angular/router'; // Importa Router para la navegación
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';

@Component({
    selector: 'app-servicio',
    templateUrl: './servicio.page.html',
    styleUrls: ['./servicio.page.scss'],
    imports: [
    IonProgressBar,
    IonButton,
    IonItem,
    IonLabel,
    IonListHeader,
    IonList,
    IonContent,
    IonHeader,
    IonCheckbox,
    CommonModule,
    FormsModule,
    RouterLink
],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ServicioPage implements OnInit {
  private unsubscribe$ = new Subject<void>();
  services: any[] = [];
  //barberName: string = ''; // Propiedad para el nombre del barbero
  //selectedDate: string = ''; // Propiedad para la fecha seleccionada
  //selectedTime: string = ''; // Propiedad para la hora seleccionada

  constructor(
    private _navCtrl: NavController,
    private router: Router,
    private _serviciosServicie: ServiciosService,
    private _alertService: ToastService,
    private alertController: AlertController,
    private _loading: ToastService,
    private route: ActivatedRoute, // Inyección de ActivatedRoute
  ) {
    addIcons({logOut});
   }

  ngOnInit() {
    // const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    // this.barberName = reserva.barberName || '';
    // this.selectedDate = reserva.selectedDate || '';
    // this.selectedTime = reserva.selectedTime || '';
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

  // volver() {
  //   // this.navCtrl.navigateBack('/peluquero/reservar/fechayhora');

  //   const currentUrl = this.router.url;
  //   let newUrl = '';

  //   if (currentUrl.includes('cliente')) {
  //     newUrl = 'cliente/reservar/fechayhora';
  //   } else if (currentUrl.includes('peluquero')) {
  //     newUrl = '/peluquero/reservar/fechayhora';
  //   }

  //   this.router.navigate([newUrl]);
  // }

  async siguiente() {
    const serviciosSeleccionados = this.services.filter(service => service.selected);
    console.log('Servicios seleccionados:', serviciosSeleccionados);
  
    if (serviciosSeleccionados.length > 0) {
      const totalPrecio = serviciosSeleccionados.reduce((total, service) => total + service.price, 0);
      const serviciosParaResumen = serviciosSeleccionados.map(service => ({
        nombre: service.name, // Ajusta según el nombre exacto de la propiedad en tu JSON
        precio: service.price
      }));

      // Obtener la reserva actual
      const { value } = await Preferences.get({ key: 'reserva' });
      const reserva = value ? JSON.parse(value) : {};

      reserva.servicios = serviciosParaResumen;
      reserva.precio = totalPrecio;

      // Guardar la reserva actualizada
      await Preferences.set({
        key: 'reserva',
        value: JSON.stringify(reserva),
      });

      this._navCtrl.navigateRoot(['/reservar/resumen']);
  
      // localStorage.setItem('reserva', JSON.stringify({ ...JSON.parse(localStorage.getItem('reserva') || '{}'), servicios: serviciosParaResumen, precio: totalPrecio }));
  
      // const currentUrl = this.router.url;
      // let newUrl = '';
  
      // if (currentUrl.includes('cliente')) {
      //   newUrl = 'cliente/reservar/resumen';
      // } else if (currentUrl.includes('peluquero')) {
      //   newUrl = 'peluquero/reservar/resumen';
      // }
  
      // this.navCtrl.navigateForward(newUrl);
    } else {
      this._alertService.toastYellow('Por favor selecciona al menos un servicio');
    }
  }
}
