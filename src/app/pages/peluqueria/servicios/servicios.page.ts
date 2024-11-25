import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { ServiciosService } from '../../../services/peluqueria/servicios/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { add, createOutline, reload, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ChangeDetectorRef } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [IonLabel, IonListHeader, IonTabButton, IonTabBar, IonTabs, IonFab, IonCheckbox, IonItem, IonIcon, IonFabButton, IonList, IonHeader, IonToolbar, IonTitle, IonContent, NgFor,
    CommonModule,
    FormsModule
  ],

  schemas: [NO_ERRORS_SCHEMA],
})
export class ServiciosPage implements OnInit {
  services: any[] = [];

  constructor(
     private _serviciosService:ServiciosService,
     private _alert_loading_Service: ToastService,
     private alertController: AlertController,
     private cdr: ChangeDetectorRef
  ) {
    addIcons({
      createOutline,
      trashOutline,
      add,
    });
  }
  
  ngOnInit() {
    this.mostrarServicios();
    this.configurarPusher();
  //   this.mostrarServicios().then(() => {
  //     this.configurarPusher();
  // });
  }

configurarPusher() {
  Pusher.logToConsole = true;

  const pusher = new Pusher('678d8b96033d6d19e407', {
    cluster: 'mt1',
    forceTLS: true,
  });

  const channel = pusher.subscribe('servicios');

  channel.bind('servicio-actualizado', (data: any) => {
    console.log('Evento recibido:', data);
    this.manejarEvento(data);
  });

  channel.bind('pusher:subscription_succeeded', () => {
    console.log('Suscripción al canal "servicios" exitosa.');
  });

  channel.bind('pusher:subscription_error', (status: any) => {
    console.error('Error en la suscripción al canal:', status);
  });
}

manejarEvento(data: any) {
  const { action, serviceDelete, servicio } = data;

  switch (action) {
    // case 'update':
    //   this.actualizarServiciosPusher(servicio);
    //   break;

    case 'delete':
      this.eliminarServicioPusher(serviceDelete);
      //this.mostrarServicios()
      break;

    default:
      this.actualizarServiciosPusher(servicio);
      // console.warn('Acción desconocida recibida:', action);
  }
}
actualizarServiciosPusher(service: any) {
  const index = this.services.findIndex(s => s.id === service.id);
  if (index !== -1) {
      // Actualiza el servicio existente
      this.services[index] = { ...this.services[index], ...service };
  } else {
      // Agrega un nuevo servicio si no existe
      this.services.push(service);
  }

  //console.log('Lista actualizada:', this.services);
  // Forzar actualización de la vista
  this.cdr.detectChanges(); // Asegura que Angular refleje los cambios
}
eliminarServicioPusherA(service: any) {
  const index = this.services.findIndex(s => s.id === service.id);
  if (index !== -1) {
      // Elimina el servicio existente
      this.services.splice(index, 1);
  } else {
      // Opcional: manejar caso de que el servicio no exista
      console.warn(`El servicio con ID ${service.id} no existe en la lista.`);
  }

  // Forzar actualización de la vista
  this.cdr.detectChanges(); // Asegura que Angular refleje los cambios
}
eliminarServicioPusher(service: any) {
  console.log('Intentando eliminar servicio:', service);
  const index = this.services.findIndex(s => s.id === service.id);
  if (index !== -1) {
      this.services.splice(index, 1);
      console.log('Servicio eliminado. Lista actualizada:', this.services);
  } else {
      console.warn(`El servicio con ID ${service.id} no existe.`);
  }

  this.cdr.detectChanges();
}

// eliminarServicioPusher(serviceId: number) {
//   const index = this.services.findIndex(s => s.id === serviceId);
//   if (index !== -1) {
//     this.services.splice(index, 1); // Elimina el servicio
//     this.cdr.detectChanges(); // Refresca la vista
//   }
// }
// eliminarServicioPusher(serviceId: number) {
//   if (!serviceId) {
//     console.error('ServiceId inválido:', serviceId);
//     return;
//   }

//   // Encuentra el índice del servicio a eliminar
//   const index = this.services.findIndex(s => s.id === serviceId);
//   if (index !== -1) {
//     // Elimina el servicio del arreglo
//     this.services.splice(index, 1);
//     console.log(`Servicio con ID ${serviceId} eliminado.`);
//   } else {
//     console.warn(`No se encontró un servicio con ID ${serviceId}.`);
//   }

//   // Refresca la vista para asegurar que Angular detecte el cambio
//   this.cdr.detectChanges();
// }

// actualizarServicios(service: any) {
//     // Lógica para actualizar la lista local de servicios
//     const index = this.services.findIndex(s => s.id === service.id);
//     if (index !== -1) {
//         this.services[index] = service; // Actualiza el servicio existente
//     } else {
//         this.services.push(service); // Agrega el nuevo servicio
//     }
//     this.cdr.detectChanges(); // Actualiza la vista
// }

  // ionViewWillEnter() {
  //   this.mostrarServicios(); // Llamamos a mostrarServicios aquí para actualizar la lista cada vez que la página es visible
  // }

  async mostrarServicios() {
    try {
      this.services = await this._serviciosService.cargarServicios();// Asigna los datos al array
      console.log('mostrarS',this.services);  // Aquí tendrás los servicios cargados
      //this.cdr.detectChanges(); // Forzar la actualización de la vista
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  async agregarServicio(data: any) {
    let serviceData = {
      name: data.nombre,
      price: data.precio,
    };
    await this._serviciosService.crearServicio(serviceData); // espera a que el servicio sea creado
    await this.mostrarServicios(); // luego recarga los servicios
  }

  async editarServicio(data: any, id: number) {
    let serviceData = {
      id: id,
      name: data.nombre,
      price: data.precio,
    };
    await this._serviciosService.editarServicios(serviceData); // espera la edición
    await this.mostrarServicios(); // luego recarga los servicios
  }
  
  async eliminarServicio(id: number) {
    await this._serviciosService.eliminarServicios(id); // espera a que se elimine
    await this.mostrarServicios(); // recarga los servicios
  }

  //alerta para eliminar servicio
  async DeleteServiceAlert(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea eliminar el servicio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar servicio',
          handler: () => {
            this.eliminarServicio(id);
          }
        },
      ]
    });
    await alert.present();
    
  }
  // Función para abrir la alerta de agregar servicio y limpiar los campos
async openAddServiceAlert() {
  const alert = await this.alertController.create({
    header: 'Agregar Servicio',
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: '' // Limpia el campo de nombre
      },
      {
        name: 'precio',
        placeholder: 'Precio',
        type: 'text',
        value: '', // Limpia el campo de precio
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
            this.agregarServicio(data);
            return true;
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

  formatPriceShowANTERIOR(value: number): string {
    let stringValue = value.toString().replace(/\D/g, '');
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return stringValue;
  }
  formatPriceShow(price: any): string {
    if (!price) {
        console.warn('El precio no está definido');
        return 'N/A'; // Devuelve un valor por defecto
    }
    return parseFloat(price).toFixed(2).toString();
  }
  

  getFormattedPrice(price: number): string {
    return this.formatPriceShow(price);
  }
  
}