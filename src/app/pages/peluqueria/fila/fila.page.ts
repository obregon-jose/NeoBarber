import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, calendarOutline } from 'ionicons/icons';
import { ReservarService } from 'src/app/services/reservar/reservar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.page.html',
  styleUrls: ['./fila.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonItem, 
    IonLabel, 
    IonIcon, 
    IonAccordionGroup, 
    IonAccordion
  ],
})
export class FilaPage implements OnInit {
  reservas: any[] = [];
  fechaSeleccionada: string = '';
  dias: { fecha: Date; nombre: string; numero: number }[] = [];
  diaSeleccionado: Date | null = null;

  constructor(
    private _reservarService: ReservarService,
  ) {
    addIcons({ chevronDownOutline, calendarOutline });
  }

  ngOnInit() {
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
      console.log('reservas pendientes peluquero', this.reservas);  
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  esDiaSeleccionado(fecha: Date): boolean {
    return this.diaSeleccionado?.toDateString() === fecha.toDateString();
  }
}