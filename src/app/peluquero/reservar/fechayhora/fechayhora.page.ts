import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-seleccionarbarbero-peluquero',
  templateUrl: 'fechayhora.page.html',
  styleUrls: ['fechayhora.page.scss'],
  standalone: true,
  imports: [
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
    FormsModule
  ]
})
export class FechaYHoraPage {
  selectedDate: string = '';
  selectedTime: string = '';
  disableDates: string[] = [];

  constructor(private navCtrl: NavController) { // Inyecta NavController
    this.disableRemainingDays();
  }

  disableRemainingDays() {
    const currentMonth = new Date().getMonth();
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();

    for (let day = 8; day <= daysInMonth; day++) {
      this.disableDates.push(new Date(year, currentMonth, day).toISOString());
    }
  }

  confirmSelection() {
    console.log('Fecha seleccionada:', this.selectedDate);
    console.log('Hora seleccionada:', this.selectedTime);
    this.navCtrl.navigateForward('/peluquero/reservar/servicio'); // Redirige a la nueva ruta
  }
  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/seleccionarbarbero');
  }
}
