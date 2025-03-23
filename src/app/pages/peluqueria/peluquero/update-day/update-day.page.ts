import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,IonButtons, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar, IonIcon, IonList, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { UpdateDayService } from 'src/app/services/peluqueria/peluquero/update-day/update-day.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-update-day',
    templateUrl: './update-day.page.html',
    styleUrls: ['./update-day.page.scss'],
    imports: [IonCardContent, IonCard, IonList, IonIcon,
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonButtons,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonDatetime,
        IonProgressBar,
        FormsModule,
        RouterLink,
        UpdateDayPage,]
})
export class UpdateDayPage implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  disponibilidad: any[] = [];
  fecha:string = '';
  minDate: string;
  showErrorMessage: boolean = false;

  constructor(
    private UpdateDayService: UpdateDayService,
    private alertController: AlertController
  ) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Ajuste de zona horaria
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // 7 días después de hoy

    this.minDate = today.toISOString().split('T')[0];
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit(
    
  ) {
    this.selectedDate = this.minDate;
      this.mostrarDisponibilidad();
    
  }


  async mostrarDisponibilidad() {
    if (this.selectedDate) {
      this.disponibilidad = await this.UpdateDayService.cargarDisponibilidad(this.selectedDate);
      console.log(this.disponibilidad);
    }
  }

  async onDateChange(event: any) {
    const dateString = event.detail.value; // Obtiene el valor de la fecha seleccionada
    if (dateString) {
      this.selectedDate = dateString.split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
      this.UpdateDayService.variableCompartida = dateString.split('T')[0];
      console.log('Fecha seleccionada:', this.selectedDate);
      await this.mostrarDisponibilidad(); // Actualiza la disponibilidad para la nueva fecha
    } else {
      console.error('Fecha no válida');
    }
  }
  

  async actualizar(horario:any){
    const { value: userValue } = await Preferences.get({ key: 'user' });
    const userAuth = userValue ? JSON.parse(userValue) : {};

  
    if (Object.keys(horario).length > 0) {
        const data = {        
        "horarios":horario,
      };
      const id= userAuth.id;
      const fecha=this.UpdateDayService.variableCompartida;
      
  
      // Mostrar los datos en consola para verificar que la estructura es correcta
      console.log('Datos que se enviarán al backend:', data);
  
      // Llamamos al servicio para guardar el horario
      await this.UpdateDayService.actualizarHorario(data,id,fecha);
    } else {
      await this.mostrarAlerta('Error', 'No se ha seleccionado ningún horario para guardar.', 'danger');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string, color: string = 'success') {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: `alert-${color}`
    });

    await alert.present();
  }

  detenerPropagacion(event: Event) {
    event.stopPropagation();
  }

  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }

}