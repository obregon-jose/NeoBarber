import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { ServiciosService } from '../services/servicios/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { Subject, takeUntil } from 'rxjs';
import { addIcons } from 'ionicons';
import { add, createOutline, reload, trashOutline } from 'ionicons/icons';
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
    AlertToastService,

  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServiciosPage implements OnInit {
  private unsubscribe$ = new Subject<void>();
  services: any[] = [];

  constructor(
     private _serviciosServicie:ServiciosService,
     private _alertService: AlertToastService,
     private alertController: AlertController,
     private _loading: AlertToastService,

  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'add': add,
    });
  }
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

  async agregarServicio(data: any) {
    let serviceData = {
      name: data.nombre,
      price: data.precio,
    };
    const loading = await this._loading.presentLoading();
  
    this._serviciosServicie.crearServicio(serviceData).subscribe(
      async (response: any) => {
        if (!response.error) {
          this.mostrarServicios();
          this._alertService.alertToastGreen('Servicio agregado exitosamente', 'top');
          await loading.dismiss();
        } else {
          this._alertService.alertToastRed(response.error.message || 'Error al agregar el servicio', 'top');
        }
      },
      async (error: any) => {
        // Maneja errores en la petición HTTP
        this._alertService.alertToastRed(error.error?.message || 'Ocurrió un error inesperado', 'top');
        await loading.dismiss();
      }
    );
  }

  async editarServicio(data: any, id: number) {
    let serviceData = {
      id: id,
      name: data.nombre,
      price: data.precio,
    };
    const loading = await this._loading.presentLoading();

    this._serviciosServicie.editarServicios(serviceData).subscribe(
      async (response: any) => {
        if (!response.error) {
          this.mostrarServicios(); // Actualiza la lista de servicios
          this._alertService.alertToastGreen('Servicio editado con éxito');
          await loading.dismiss();
        } else {
          this._alertService.alertToastRed('Error al editar el servicio');
        }
      },
      async (error: any) => {
        this._alertService.alertToastRed(error.error?.message || 'Ocurrió un error inesperado', 'top');
        await loading.dismiss();
      }
    );
  }
  
  async eliminarServicio(id: number) {
    this._serviciosServicie.eliminarServicios(id).subscribe(
      (response: any) => {
        if (!response.error) {
          this.mostrarServicios(); 
          this._alertService.alertToastGreen('Servicio eliminado con éxito');
        } else {
          this._alertService.alertToastRed('Error al eliminar el servicio');
        }
      },
      (error: any) => {
        this._alertService.alertToastRed(error.error?.message || 'Ocurrió un error inesperado');
      }
    );
  }
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
          this._alertService.alertToastYellow('Debe llenar todos los campos', 'top');
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
  
/*----------------------EDITAR---------------------*/
async openEditAlert(service: any) {
  const alert = await this.alertController.create({
    header: 'Editar Servicio',
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: service.name // Prellenar el campo con el nombre actual
      },
      {
        name: 'precio',
        placeholder: 'Precio',
        value: this.formatPriceShow(service.price), // Prellenar el campo con el precio actual
        type: 'text',
        attributes: {
          inputmode: 'numeric',
          maxlength: 6,
          oninput: (event: any) => this.formatPrice(event)
        }
      }
    ],
    buttons: [
      {
        text: 'CANCELAR',
      },
      {
        text: 'GUARDAR',
        role: 'GUARDAR',
        handler: (data: any) => {
          if (data.nombre && data.precio) {
            data.precio = this.removeFormatting(data.precio);
            this.editarServicio(data, service.id); // Llama a la función para editar el servicio
            return true
          } else {
            this._alertService.alertToastYellow('Debe llenar todos los campos', 'top');
            return false;
          }
        }
      }
    ]
  });

  await alert.present();
}

/*-------------------------------------------*/
  formatPrice(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return input.value = value;
  }
  removeFormatting(value: string): number {
    return parseInt(value.replace(/\./g, ''), 10);
  }

  formatPriceShow(value: number): string {
    let stringValue = value.toString().replace(/\D/g, '');
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return stringValue;
  }

  getFormattedPrice(price: number): string {
    return this.formatPriceShow(price);
  }
  
}