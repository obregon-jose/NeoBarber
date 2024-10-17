import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ServiciosService } from '../services/servicios/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: 'servicios.page.html',
  styleUrls: ['servicios.page.scss'],
  standalone: true,
  imports: [IonLabel, IonListHeader, IonTabButton, IonTabBar, IonTabs, IonFab, IonCheckbox, IonItem, IonIcon, IonFabButton, IonList, IonHeader, IonToolbar, IonTitle, IonContent, NgFor,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers:[
    ServiciosService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServiciosPage implements OnInit {
  // precio: number=0;
  // nombre: string='';
  services: any[] = [];

  constructor(
     private _serviciosServicie:ServiciosService,
     private alertController:AlertController,
  ) {}
  ngOnInit() {
    this.mostrarServicios();
  }

  showAlert(header: string, message: string){
    this.alertController.create({
      header:header,
      message:message,
    buttons: ['OK']
    }).then(alert=>alert.present());
  }

  mostrarServicios(){
    this._serviciosServicie.cargarServicios().subscribe(Response=>{
      this.services = Response.services;
    },
    error=>{
      console.log('error')
    })
  }


  async agregarServicio(data: any){
    let serviceData = {
      name: data.nombre,
      price: data.precio,
    }

    this._serviciosServicie.crearServicio(serviceData).subscribe(
      async (response: any) => {
        if (!response.error) {
          console.log(response);
          this.mostrarServicios();
          await this.showAlert('Notificación', response.message);
          return;
        } else{
          console.log('error',response);
        }

      },
      async (error: any) => {
        console.log(error);
        await this.showAlert('Error', error.error.message || 'Ocurrió un error inesperado');
      }
    );
  }


  // --------------------------------------
  public alertButtons = [
    {
      text: 'CANCELAR',
    },
    {
      text: 'GUARDAR',
      role: 'GUARDAR',
      handler: (data: any) => {
        if (data.nombre && data.precio) {
          data.precio = this.removeFormatting(data.precio);
          this.agregarServicio(data);
          return true; 
        } else {
          this.showAlert('Error', 'Debe llenar todos los campos');
          return false;
        }
      },
    },
    ];
  
  public alertInputs = [
    {
      name: 'nombre',
      placeholder: 'Nombre',
    },
    {
      name: 'precio',
      placeholder: 'Precio',
      type: 'text',

      attributes: {
        inputmode: 'numeric',
        maxlength: 6, 
        oninput: (event: any) => this.formatPrice(event)
      }
    }
    
  ];

  formatPrice(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    input.value = value;
  }
  removeFormatting(value: string): number {
    return parseInt(value.replace(/\./g, ''), 10);
  }
  
}
