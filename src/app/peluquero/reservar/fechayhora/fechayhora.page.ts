import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AlertToastService } from 'src/app/shared/alert-toast.service';

@Component({
  selector: 'app-fechayhora',
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
    FormsModule,
  ]
})
export class FechaYHoraPage implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';
  barberName: string = '';
  minDate: string;
  maxDate: string;
  showErrorMessage: boolean = false;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private alertController: AlertController, private _alertService: AlertToastService) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // 7 días después de hoy

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = futureDate.toISOString().split('T')[0]; // Fecha máxima es 7 días después
    this.selectedDate = today.toISOString();
  }

  ngOnInit() {
    const reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    this.barberName = reserva.barberName || 'Desconocido';
  }

  onDateChange(event: any) {
    const dateString = event.detail.value;
    if (dateString) {
      this.selectedDate = dateString;
    } else {
      console.log("Fecha no válida");
    }
  }

  confirmSelection() {
    if (!this.selectedDate || !this.selectedTime) {
      this.showErrorMessage = true;
      this._alertService.alertToastYellow('Por favor seleccione una fecha y hora', 'top');
    } else {
      this.showErrorMessage = false;
      localStorage.setItem('reserva', JSON.stringify({ ...JSON.parse(localStorage.getItem('reserva') || '{}'), selectedDate: this.selectedDate, selectedTime: this.selectedTime }));
      this.navCtrl.navigateForward('/peluquero/reservar/servicio');
    }
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/seleccionarbarbero');
  }
}
