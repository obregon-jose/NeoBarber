import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonProgressBar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NavController ,AlertController} from '@ionic/angular';
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
  barberId: string = '';
  showErrorMessage: boolean = false;


  constructor(private navCtrl: NavController, private route: ActivatedRoute ,  private alertController: AlertController, private _alertService: AlertToastService) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // 7 días después de hoy
    
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = futureDate.toISOString().split('T')[0]; // Fecha máxima es 7 días después
    this.selectedDate = today.toISOString();

    
    //this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
     // Inicializar selectedDate con la fecha actual en formato ISO para que muestre el año y la fecha actual
     //const currentDate = new Date();
     //this.selectedDate = currentDate.toISOString();
   
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.barberName = params['barberName'] || 'Desconocido';
      console.log(
        'Id del barbero:', this.barberId,
        'Barbero seleccionado:', this.barberName,
        
      );
    });
  }

  onDateChange(event: any) {
    const dateString = event.detail.value;
    
    if (dateString) {
      this.selectedDate = dateString;
    } else {
      console.log("Fecha no válida");
    }
  }

 /*  confirmSelection() {
    console.log('Fecha seleccionada:', this.selectedDate);
    console.log('Hora seleccionada:', this.selectedTime);
    console.log('Barbero seleccionado:', this.barberName);
    this.navCtrl.navigateForward('/peluquero/reservar/servicio', {
      queryParams: { barberName: this.barberName, selectedDate: this.selectedDate, selectedTime: this.selectedTime }
    });
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/seleccionarbarbero');
  }
} */

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Campos requeridos',
      message: 'Por favor, selecciona una fecha y una hora para continuar.',
      buttons: ['OK']
    });

    await alert.present();
  }


  confirmSelection() {
    if (!this.selectedDate || !this.selectedTime) {
      this.showErrorMessage = true;
      //console.log(alert("selecione todos los campos"))
      // this.presentAlert();
      this._alertService.alertToastYellow('Por favor seleccione una fecha y hora', 'top');

  
    } else {
      this.showErrorMessage = false;
      console.log('Fecha seleccionada:', this.selectedDate);
      console.log('Hora seleccionada:', this.selectedTime);
      console.log('Barbero seleccionado:', this.barberName);
      this.navCtrl.navigateForward('/peluquero/reservar/servicio', {
        queryParams: { barberName: this.barberName, selectedDate: this.selectedDate, selectedTime: this.selectedTime }
      });
    }
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/seleccionarbarbero');
  }
}