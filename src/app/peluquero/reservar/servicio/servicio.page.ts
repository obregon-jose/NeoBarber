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
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonButtons, IonFooter, IonItem, IonLabel, IonListHeader, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, CommonModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     CommonModule,
     

  ],
  providers:[
    ServiciosService,
    AlertToastService,

  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServicioPage implements OnInit {
  private unsubscribe$ = new Subject<void>();
  // services = [
  //   { name: 'Cote de pelo', price: 20000, selected: false },
  //   { name: 'Tintura', price: 20000, selected: false },
  //   { name: 'Barba', price: 20000, selected: false },
  //   { name: 'Cejas', price: 20000, selected: false },
  //   // Agrega más servicios si es necesario
  // ];
  services: any[] = [];

  constructor(
    private navCtrl: NavController,
    private _serviciosServicie:ServiciosService,
    private _alertService: AlertToastService,
    private alertController: AlertController,
    private _loading: AlertToastService,

  ) { }

  ngOnInit() {
    this.mostrarServicios();
  }

  async mostrarServicios() {
    const loading = await this._loading.presentLoading();
    this._serviciosServicie.cargarServicios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: async (response) => {
          this.services = response.services;
          await loading.dismiss();
        },
        error: () => {
          this._alertService.alertToastRed('Error al cargar los servicios', 'top');
        }
      });
  }

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/fechayhora');
  }

  siguiente() {
    const serviciosSeleccionados = this.services.filter(service => service.selected);
    console.log(serviciosSeleccionados);
  }
}