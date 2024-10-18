import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

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
    FormsModule // Añade FormsModule aquí
  ]
})
export class FechaYHoraPage {
  selectedDate: string = '';
  selectedTime: string = '';

  constructor() {}

  confirmSelection() {
    // Lógica para manejar la selección de fecha y hora
    console.log('Fecha seleccionada:', this.selectedDate);
    console.log('Hora seleccionada:', this.selectedTime);
    // Aquí puedes redirigir a otra página o realizar otra acción
  }
}
