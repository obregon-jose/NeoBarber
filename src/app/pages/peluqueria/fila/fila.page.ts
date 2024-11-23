import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, calendarOutline } from 'ionicons/icons';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { NgFor,NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-fila',
  templateUrl: './fila.page.html',
  styleUrls: ['./fila.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon, IonAccordionGroup, IonAccordion, NgFor,NgIf, CommonModule,FormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FilaPage implements OnInit {
  @ViewChild('accordionGroup', { static: false }) accordionGroup!: IonAccordionGroup;
  reservas: any[] = [];
  fechaSeleccionada: string = '';
  dias: { fecha: Date; nombre: string; numero: number }[] = [];
  diaSeleccionado: Date | null = null;


  constructor(
    private _reservarService:ReservarService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {
    // addIcons({
    //   chevronDownOutline,
    // });
    addIcons({ chevronDownOutline, calendarOutline });
  }
  // items: { title: string; content: string }[] = [
  //   { title: 'Corte de Pelo', content: 'Servicio de corte de pelo, precio: $20.000' },
  //   { title: 'Barba', content: 'Servicio de arreglo de barba, precio: $15.000' },
  //   { title: 'Lavado y Secado', content: 'Servicio de lavado y secado, precio: $10.000' },
  //   { title: 'Coloración', content: 'Servicio de coloración de cabello, precio: $25.000' }
  // ];
  ngOnInit() {
    
    this.generarDias();
    this.seleccionarDia(new Date());

    // this.cargarUsuario();
    
    
    this.mostrarReservas();
    //console.log("ng on init")
  }


  async generarDias() {
    const hoy = new Date();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    for (let i = 0; i < 8; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      this.dias.push({
        fecha: fecha,
        nombre: diasSemana[fecha.getDay()],
        numero: fecha.getDate()
      });
    }
  }

  // async cargarUsuario() {
  //   let userAuth: any = null;
  
  //   while (!userAuth) {
  //     const { value } = await Preferences.get({ key: 'user' });
  //     userAuth = value ? JSON.parse(value) : null;
  
  //     if (!userAuth) {
  //       //console.log('Esperando a que los datos del usuario estén disponibles...');
  //       await this.delay(500); // Esperar 500ms antes de intentar de nuevo
  //     }
  //   }
  
  //   //console.log('Usuario autenticado encontrado:', userAuth);
  //   this.mostrarReservas();
  
  // }
  
  // Método auxiliar para retrasar
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  
  async seleccionarDia(fecha: Date) {
    if (this.accordionGroup) {
      this.accordionGroup.value = null;
    }
    
    this.diaSeleccionado = fecha;
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.fechaSeleccionada = fecha.toLocaleDateString('es-ES', opciones);
    await this.mostrarReservas();
    //console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  async mostrarReservas() {

    try {
      const { value } = await Preferences.get({ key: 'user' });
      const userAuth = value ? JSON.parse(value) : {};
      //console.log("user autg",userAuth);
      const data = await this._reservarService.cargarReservasPeluquero(userAuth.id);
      //console.log('data',data);
      this.reservas = data;  
      console.log('reservas pendientes peluquero',this.reservas);  
      //this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  esDiaSeleccionado(fecha: Date): boolean {
    return this.diaSeleccionado?.toDateString() === fecha.toDateString();
    
    
  }

  // get reservasFiltradas(): any[] {
  //   if (!this.diaSeleccionado) {
  //     console.log('No hay día seleccionado');
  //     return this.reservas; // Si no hay día seleccionado, muestra todas las reservas
  //   }
  
  //   return this.reservas.filter(reserva => {
  //     const fechaReserva = new Date(reserva.reservation.date); // Convierte la fecha a Date
  //     const esMismaFecha = 
  //       fechaReserva.getFullYear() === this.diaSeleccionado?.getFullYear() &&
  //       fechaReserva.getMonth() === this.diaSeleccionado?.getMonth() &&
  //       fechaReserva.getDate() === this.diaSeleccionado?.getDate();
  //     console.log('fechaReserva:', fechaReserva);
  //     console.log('diaSeleccionado:', this.diaSeleccionado);
  //     console.log('reserva',reserva)
  //     console.log('esMismaFecha:', esMismaFecha);
  //     return esMismaFecha;
  //   });
  // }

  get reservasFiltradas(): any[] {
    if (!this.diaSeleccionado) {
      console.log('No hay día seleccionado');
      return this.reservas; // Si no hay día seleccionado, mostrar todas las reservas
    }
  
    // Filtrar las reservas por la fecha seleccionada
    const reservasFiltradas = this.reservas.filter(reserva => {
      // Validar que la reserva tiene el objeto 'reservation' y el campo 'date'
      if (!reserva.reservation || !reserva.reservation.date) {
 
        return false; // Excluir las reservas con datos incompletos
      }
  
      const fechaReserva = reserva.reservation.date; // Fecha de la reserva en formato YYYY-MM-DD
      const fechaSeleccionada = this.diaSeleccionado ? this.formatFechaLocal(this.diaSeleccionado) : ''; // Fecha seleccionada formateada
  
      return fechaReserva === fechaSeleccionada; // Comparar fechas
    });
  
    // Ordenar las reservas por el campo 'time'
    reservasFiltradas.sort((a, b) => {
      return a.reservation.time.localeCompare(b.reservation.time); // Ordenar por string de tiempo
    });
  
    return reservasFiltradas; // Devolver el resultado ordenado
  }
  
  // Función para formatear la fecha localmente en formato YYYY-MM-DD
  formatFechaLocal(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }
  
  
  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }
  async openPriceOptions(reserva: any) {
    const alert = await this.alertController.create({
      header: 'Seleccionar Precio',
      inputs: [
        {
          name: 'precioSugerido',
          type: 'radio',
          label: 'Precio Sugerido',
          value: 'precioSugerido',
          checked: true
        },
        {
          name: 'escribirPrecio',
          type: 'radio',
          label: 'Escribir Precio',
          value: 'escribirPrecio',
        },
        {
          name: 'inputPrecio',
          type: 'text',
          placeholder: 'Ingrese el precio',
          attributes: {
            inputmode: 'numeric',
            maxlength: 6,
            disabled: true // Campo deshabilitado inicialmente
          },
          cssClass: 'custom-input-price'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'GUARDAR',
          handler: (data: any) => {
            if (data === 'escribirPrecio') {
              const inputPrecio = document.querySelector('.custom-input-price input') as HTMLInputElement;
              if (inputPrecio && inputPrecio.value.trim() !== '') {
                console.log({
                  opcion: 'Escribir un precio',
                  precio: inputPrecio.value
                });
              } else {
                console.error('Debe ingresar un precio válido.');
                return false; // Evita cerrar el alert si no se ingresa un precio
              }
            } else if (data === 'precioSugerido') {
              console.log({
                opcion: 'Precio sugerido'
              });
            }
            return true; // Cierra el alert
          }
        }
      ]
    });
  
    await alert.present();
  
    // Habilita/deshabilita el campo dinámicamente según la selección
    const radioButtons = alert.querySelectorAll('ion-alert-radio');
    const inputPrecio = alert.querySelector('.custom-input-price input') as HTMLInputElement;
  
    radioButtons.forEach((radio: any) => {
      radio.addEventListener('click', (event: any) => {
        const value = event.target.value;
        if (inputPrecio) {
          inputPrecio.disabled = value !== 'escribirPrecio';
          if (value !== 'escribirPrecio') inputPrecio.value = '';
        }
      });
    });
  }
  
}