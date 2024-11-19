import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
  seleccionarDia(fecha: Date) {
    this.diaSeleccionado = fecha;
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.fechaSeleccionada = fecha.toLocaleDateString('es-ES', opciones);
    // Here you might want to call a method to update the reservations for the selected date
    // this.mostrarReservas();
  }

  async mostrarReservas() {
    const { value } = await Preferences.get({ key: 'user' });
    const userAuth = value ? JSON.parse(value) : {};
    try {
      const data = await this._reservarService.cargarReservasPeluquero(userAuth.id);
      this.reservas = data;  
      console.log('reservas pendientes peluquero',this.reservas);  
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  esDiaSeleccionado(fecha: Date): boolean {
    return this.diaSeleccionado?.toDateString() === fecha.toDateString();
  }
}