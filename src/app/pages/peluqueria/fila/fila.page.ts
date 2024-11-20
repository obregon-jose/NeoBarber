import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, calendarOutline } from 'ionicons/icons';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { NgFor,NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
  reservas: any[] = [];
  fechaSeleccionada: string = '';
  dias: { fecha: Date; nombre: string; numero: number }[] = [];
  diaSeleccionado: Date | null = null;

  constructor(
    private _reservarService:ReservarService,
    private cdr: ChangeDetectorRef
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
    this.mostrarReservas();
    this.generarDias();
    this.seleccionarDia(new Date());
  }


  generarDias() {
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
  async seleccionarDia(fecha: Date) {
    this.diaSeleccionado = fecha;
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.fechaSeleccionada = fecha.toLocaleDateString('es-ES', opciones);
    await this.mostrarReservas();
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    try {
      const data = await this._reservarService.cargarReservasPeluquero(userAuth.id);
      this.reservas = data;  
      console.log('reservas pendientes peluquero',this.reservas);  
      this.cdr.markForCheck();
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
  
    return this.reservas.filter(reserva => {
      // Obtener la fecha de la reserva desde el backend (formato YYYY-MM-DD)
      const fechaReserva = reserva.reservation.date;
  
      // Formatear la fecha seleccionada al formato YYYY-MM-DD sin afectar la zona horaria
      const fechaSeleccionada = this.diaSeleccionado ? this.formatFechaLocal(this.diaSeleccionado) : '';
  
      // Comparar ambas fechas
      const esMismaFecha = fechaReserva === fechaSeleccionada;
  

  
      return esMismaFecha;
    });
  }
  
  // Función para formatear la fecha localmente en formato YYYY-MM-DD
  formatFechaLocal(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }
  

  
}