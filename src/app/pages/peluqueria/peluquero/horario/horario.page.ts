import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonCheckbox, IonButton, IonPopover, IonNote, IonSelect, IonSelectOption, IonDatetime, IonListHeader, IonIcon, IonFab, IonFabButton, IonAlert, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { HorariosService } from '../../../../services/peluqueria/peluquero/horarios/horarios.service';
import { Preferences } from '@capacitor/preferences';

interface HorarioDia {
  seleccionado: boolean;
  horas: { [hora: string]: boolean };
}
@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
  standalone: true,
  imports: [IonAccordion, IonAccordionGroup, IonAlert, IonFabButton, IonFab, IonIcon, IonListHeader, IonNote, IonPopover, IonButton, 
    IonCheckbox, IonLabel, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect,
    IonSelectOption,
    IonDatetime,
  ],
})
export class HorarioPage implements OnInit {
  horarios: any[] = [];
  
  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
  horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  horario: { [key: string]: { seleccionado: any, horas: string[] } } = {};

  constructor(
    private alertController: AlertController,
    private _serviciosHorarios: HorariosService,
  ) {
    this.dias.forEach(dia => {
      this.horario[dia] = { seleccionado: false, horas: [] };
    });
  }

  ngOnInit() {
    this.mostrarHorarios();
  }

  async mostrarHorarios() {
    try {
      const data = await this._serviciosHorarios.cargarHorarios(1);
      this.horarios = data;  // Asigna los datos al array
      console.log(this.horarios);  // Aquí tendrás los servicios cargados
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  toggleDia(dia: string) {
    this.horario[dia].seleccionado = !this.horario[dia].seleccionado;
    if (!this.horario[dia].seleccionado) {
      this.horario[dia].horas = [];
    }
  }

  toggleHora(dia: string, hora: string) {
    const index = this.horario[dia].horas.indexOf(hora);
    if (index > -1) {
      this.horario[dia].horas.splice(index, 1);
    } else {
      this.horario[dia].horas.push(hora);
    }
  }

  toggleAllHoras(dia: string) {
    if (this.horario[dia].horas.length === this.horas.length) {
      // Desmarcar todas las horas
      this.horario[dia].horas = [];
    } else {
      // Marcar todas las horas
      this.horario[dia].horas = [...this.horas];
    }
  }

// Método para obtener el horario en el formato deseado
getFormattedHorario() {
  const formattedHorario: { [key: string]: string[] } = {};
  for (const dia of this.dias) {
    if (this.horario[dia].horas.length > 0) {
      formattedHorario[dia] = this.horario[dia].horas;
      console.log(this.horario[dia].horas);
    }
  }
  return formattedHorario;
}

async guardarHorario() {
    // Crear el objeto horarioGuardado con la estructura correcta
    const formattedHorario = this.getFormattedHorario();
    
    const { value: userValue } = await Preferences.get({ key: 'user' });
    const userAuth = userValue ? JSON.parse(userValue) : {};

    console.log('Horario guardado:', formattedHorario);
  
    if (Object.keys(formattedHorario).length > 0) {
  
      // Ahora pasamos el horarioGuardado directamente al servicio
      const data = {
        //id: 1,  // Ajusta el ID según sea necesario
        
        ...formattedHorario,
       
        
      };
      const id= userAuth.id;
  
      // Mostrar los datos en consola para verificar que la estructura es correcta
      console.log('Datos que se enviarán al backend:', data);
  
      // Llamamos al servicio para guardar el horario
      await this._serviciosHorarios.crearHorario(data,id);
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

//   async guardarHorario() {
//     const horarioGuardado = Object.entries(this.horario)
//       .filter(([_, { seleccionado }]) => seleccionado)
//       .reduce((acc, [dia, { horas }]) => ({
//         ...acc,
//         [dia]: horas
//       }), {});

//     console.log('Horario guardado:', horarioGuardado);

//     if (Object.keys(horarioGuardado).length > 0) {
//       await this.mostrarAlerta('Éxito', 'El horario se ha guardado correctamente.');
//       // Aquí puedes implementar la lógica para guardar el horario en tu backend
//     } else {
//       await this.mostrarAlerta('Error', 'No se ha seleccionado ningún horario para guardar.', 'danger');
//     }
//   }

//   async mostrarAlerta(titulo: string, mensaje: string, color: string = 'success') {
//     const alert = await this.alertController.create({
//       header: titulo,
//       message: mensaje,
//       buttons: ['OK'],
//       cssClass: `alert-${color}`
//     });

//     await alert.present();
//   }

//   detenerPropagacion(event: Event) {
//     event.stopPropagation();
//   }

// }


// 

// 

// async guardarHorario() {
//   // Crear el objeto horarioGuardado con la estructura correcta
//   const horarioGuardado = Object.entries(this.horario)
//     .filter(([_, { seleccionado }]) => seleccionado)
//     .reduce((acc, [dia, { horas }]) => {
//       if (horas.length > 0) {  // Solo agregar días con horas seleccionadas
//         acc[dia] = horas;
//       }
//       return acc;
//     }, {} as { [key: string]: string[] });

//   console.log('Horario guardado:', horarioGuardado);

//   if (Object.keys(horarioGuardado).length > 0) {
//     const diasSeleccionados = Object.keys(horarioGuardado);
//     const horasInicio = diasSeleccionados.map(dia => horarioGuardado[dia]);

//     // Ahora pasamos el horarioGuardado directamente al servicio
//     const data = {
//       id: 1,  // Ajusta el ID según sea necesario
//       horariolocal:horarioGuardado
//     };

//     // Mostrar los datos en consola para verificar que la estructura es correcta
//     console.log('Datos que se enviarán al backend:', data);

//     // Llamamos al servicio para guardar el horario
//     await this._serviciosHorarios.crearHorario(data);
//   } else {
//     await this.mostrarAlerta('Error', 'No se ha seleccionado ningún horario para guardar.', 'danger');
//   }
// }

//  async mostrarAlerta(titulo: string, mensaje: string, color: string = 'success') {
//       const alert = await this.alertController.create({
//         header: titulo,
//         message: mensaje,
//         buttons: ['OK'],
//         cssClass: `alert-${color}`
//       });
  
//       await alert.present();
//     }
  
//     detenerPropagacion(event: Event) {
//       event.stopPropagation();
//     }
      
}
