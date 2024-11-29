import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar, IonIcon, IonList, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Preferences } from '@capacitor/preferences';
import { DisponibilidadService } from 'src/app/services/peluqueria/disponibilidad/disponibilidad.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';


@Component({
  selector: 'app-fechayhora',
  templateUrl: 'fechayhora.page.html',
  styleUrls: ['fechayhora.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonList, IonIcon, 
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonProgressBar,
    FormsModule,
    RouterLink,
  ]
})
export class FechaYHoraPage implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  disponibilidad: any[] = [];
  // barberName: string = '';
  minDate: string;
  maxDate: string;
  showErrorMessage: boolean = false;

  constructor(
    private navCtrl: NavController, 
    private router: Router,
    private route: ActivatedRoute, 
    private alertController: AlertController, 
    private _alertService: ToastService,
    private toastService: ToastService,
    private _navCtrl: NavController,
    private _disponibilidadService: DisponibilidadService,
  ) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Ajuste de zona horaria
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // 7 días después de hoy

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = futureDate.toISOString().split('T')[0]; // Fecha máxima es 7 días después
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit(
    
  ) {
      addIcons({logOut});
    // const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    // this.barberName = reserva.barberName || 'Desconocido';
     
    // Llama a mostrarDisponibilidad para cargar los horarios del día actual al inicio
      this.mostrarDisponibilidad();
    
  }

  // async mostrarDisponibilidad() {
  //   try {
  //     const data = await this._disponibilidadService.cargarDisponibilidad();
  //     this.disponibilidad = data;
  //     console.log(this.disponibilidad);
  //   } catch (error) {
  //     console.error('Error al cargar los servicios', error);
  //   }
  // }
  
  async mostrarDisponibilidad() {
    if (this.selectedDate) {
      this.disponibilidad = await this._disponibilidadService.cargarDisponibilidad(this.selectedDate);
      console.log(this.disponibilidad);
    }
  }

  onDateChange(event: any) {
    const dateString = event.detail.value;
    if (dateString) {
      this.selectedDate = dateString.split('T')[0];
      this.mostrarDisponibilidad();
    } else {
      console.log("Fecha no válida");
    }
  }

  onTimeSelect(event: any) {
    this.selectedTime = event.detail.value;
    this.toastService.toastGreen(`Hora seleccionada: ${this.formatHour(this.selectedTime)}`);
  }

  async confirmSelection() {
    if (!this.selectedDate || !this.selectedTime) {
      this.showErrorMessage = true;
      this._alertService.toastYellow('Por favor seleccione una fecha y hora',);
    } else {
      this.showErrorMessage = false;
      // Obtener la reserva actual
      const { value } = await Preferences.get({ key: 'reserva' });
      const reserva = value ? JSON.parse(value) : {};

      reserva.selectedDate = this.selectedDate;
      reserva.selectedTime = this.selectedTime;

      // Guardar la reserva actualizada
      await Preferences.set({
        key: 'reserva',
        value: JSON.stringify(reserva),
      });

      this._navCtrl.navigateRoot(['/reservar/servicio']);

      // localStorage.setItem('reserva', JSON.stringify({ ...JSON.parse(localStorage.getItem('reserva') || '{}'), selectedDate: this.selectedDate, selectedTime: this.selectedTime }));
  
      // const currentUrl = this.router.url;
      // let newUrl = '';
  
      // if (currentUrl.includes('cliente')) {
      //   newUrl = 'cliente/reservar/servicio';
      // } else if (currentUrl.includes('peluquero')) {
      //   newUrl = 'peluquero/reservar/servicio';
      // }
  
      // this.navCtrl.navigateForward(newUrl);
    }
  }
  
  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }

  // volver() {
    // this._navCtrl.navigateRoot(['/reservar/seleccionarbarbero']);
    // const currentUrl = this.router.url;
    // let newUrl = '';

    // if (currentUrl.includes('cliente')) {
    //   newUrl = 'cliente/reservar/seleccionarbarbero';
    // } else if (currentUrl.includes('peluquero')) {
    //   newUrl = '/peluquero/reservar/seleccionarbarbero';
    // }

    // this.router.navigate([newUrl]);
  // }
}