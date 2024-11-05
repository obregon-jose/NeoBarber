import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ServiceService } from 'src/app/services/barbershop/service/service.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ServicePage implements OnInit {
  services: any[] = [];

  constructor(
     private _serviciosService: ServiceService,
     private _alert_loading_Service: ToastService,
     private alertController: AlertController,
  ) {
    addIcons({
      createOutline,
      trashOutline,
      add,
    });
  }
  ngOnInit() {
    this.mostrarServicios();
  }

  async mostrarServicios() {
    try {
      const data = await this._serviciosService.cargarServicios();
      this.services = data;  // Asigna los datos al array
      console.log(this.services);  // Aquí tendrás los servicios cargados
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  agregarServicio(data: any) {
    let serviceData = {
      name: data.nombre,
      price: data.precio,
    };
    this._serviciosService.crearServicio(serviceData);
    this.mostrarServicios();
  }

  editarServicio(data: any, id: number) {
    let serviceData = {
      id: id,
      name: data.nombre,
      price: data.precio,
    };
    this._serviciosService.editarServicios(serviceData);
    this.mostrarServicios();
  }
  
  eliminarServicio(id: number) {
    this._serviciosService.eliminarServicios(id)
    this.mostrarServicios();
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
          this._alert_loading_Service.toastYellow('Debe llenar todos los campos');
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
            this._alert_loading_Service.toastYellow('Debe llenar todos los campos');
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
