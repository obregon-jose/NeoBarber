import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonList, IonItem, IonLabel, IonButton, IonModal, IonButtons, IonIcon, IonBadge, IonItemDivider, IonText, IonToggle, IonCheckbox, IonInput, IonDatetime } from '@ionic/angular/standalone';
import { AgendaService } from 'src/app/services/peluqueria/peluquero/agenda/agenda.service';
import { Preferences } from '@capacitor/preferences';
import { DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [IonDatetime, IonInput, IonCheckbox, IonToggle, IonText, IonItemDivider, IonBadge, IonIcon, IonButtons, IonModal, IonButton, IonLabel, IonItem, IonList, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe], // Aquí se agrega el DatePipe como proveedor
})
export class AgendaPage implements OnInit {
//   agenda: any[] = [];

//   constructor(
//     private _servicioAgenda: AgendaService,
//     private datePipe: DatePipe
//   ) { 
//     addIcons({
//       timeOutline
//     });
//   }

//   ngOnInit() {
//     this.mostrarAgenda();
//   }

//   getColombiaDate(): string {
//     const colombiaDate = new Date().toLocaleString("en-US", {
//       timeZone: "America/Bogota",
//     });
//     return this.datePipe.transform(new Date(colombiaDate), 'yyyy-MM-dd') || '';
//   }

//   async mostrarAgenda() {
//     try {
//       const fechaHoy = this.getColombiaDate();
//       const { value } = await Preferences.get({ key: 'user' });
//       const userAuth = value ? JSON.parse(value) : {};
//       this.agenda  = await this._servicioAgenda.cargarDisponivilidad(userAuth.id, '2024-11-11');
//       console.log(this.agenda);  // Aquí tendrás los servicios cargados
//     } catch (error) {
//       console.error('Error al cargar los servicios', error);
//     }
//   }

//   // getTimeSlotById(id: number) {
//   //   const timeSlots = [
//   //     { id: 1, start: '07:00', end: '07:30' },
//   //     { id: 2, start: '07:30', end: '08:00' },
//   //     { id: 3, start: '08:00', end: '08:30' },
//   //     { id: 4, start: '08:30', end: '09:00' },
//   //     { id: 5, start: '09:00', end: '09:30' },
//   //     { id: 6, start: '09:30', end: '10:00' },
//   //     { id: 7, start: '10:00', end: '10:30' },
//   //     { id: 8, start: '10:30', end: '11:00' },
//   //     { id: 9, start: '11:00', end: '11:30' },
//   //     { id: 10, start: '11:30', end: '12:00' },
//   //     { id: 11, start: '12:00', end: '12:30' },
//   //     { id: 12, start: '12:30', end: '13:00' },
//   //     { id: 13, start: '13:00', end: '13:30' },
//   //     { id: 14, start: '13:30', end: '14:00' },
//   //     { id: 15, start: '14:00', end: '14:30' },
//   //     { id: 16, start: '14:30', end: '15:00' },
//   //     { id: 17, start: '15:00', end: '15:30' },
//   //     { id: 18, start: '15:30', end: '16:00' },
//   //     { id: 19, start: '16:00', end: '16:30' },
//   //     { id: 20, start: '16:30', end: '17:00' },
//   //     { id: 21, start: '17:00', end: '17:30' },
//   //     { id: 22, start: '17:30', end: '18:00' },
//   //     { id: 23, start: '18:00', end: '18:30' },
//   //     { id: 24, start: '18:30', end: '19:00' },
//   //     { id: 25, start: '19:00', end: '19:30' },
//   //     { id: 26, start: '19:30', end: '20:00' },
//   //     { id: 27, start: '20:00', end: '20:30' },
//   //     { id: 28, start: '20:30', end: '21:00' },
//   //     { id: 29, start: '21:00', end: '21:30' },
//   //     { id: 30, start: '21:30', end: '22:00' }
//   //   ];
//   //   return timeSlots.find(slot => slot.id === id);
//   // }

//   selectedDay: any = null;
//   toggleAvailability(day: any) {
//     day.availability = !day.availability;
//   }

//   showTimeSlots(day: any) {
//     this.selectedDay = this.selectedDay === day ? null : day;
//   }

//   getTimeLabel(slotId: number): string {
//     // Assuming slots start at 8:00 AM with 30-minute intervals
//     const startHour = 7;
//     const totalMinutes = (slotId - 1) * 30;
//     const hours = Math.floor(totalMinutes / 60) + startHour;
//     const minutes = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   }

//   isModalOpen: boolean = false;
// // selectedDay: any = null;

// openModal(day: any) {
//   this.selectedDay = day;
//   this.isModalOpen = true;
// }

// closeModal() {
//   this.isModalOpen = false;
//   this.selectedDay = null;
// }
agenda: any[] = [];
  selectedDay: any = null;
  isModalOpen: boolean = false;

  constructor(
    private _servicioAgenda: AgendaService,
    private datePipe: DatePipe
  ) {
    addIcons({
      timeOutline,
    });
  }

  ngOnInit() {
    this.mostrarAgenda();
  }

  getColombiaDate(): string {
    const colombiaDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Bogota',
    });
    return this.datePipe.transform(new Date(colombiaDate), 'yyyy-MM-dd') || '';
  }

  async mostrarAgenda() {
    try {
      const fechaHoy = this.getColombiaDate();
      const { value } = await Preferences.get({ key: 'user' });
      const userAuth = value ? JSON.parse(value) : {};
      this.agenda = await this._servicioAgenda.cargarDisponibilidad(2, '2024-12-04');
      console.log(this.agenda); // Datos de la agenda
    } catch (error) {
      console.error('Error al cargar la agenda', error);
    }
  }

  toggleAvailability(day: any) {
    day.availability = !day.availability;
  }

  openModal(day: any) {
    this.selectedDay = day;
    this.isModalOpen = true;
  }

  closeModal() {
    this.selectedDay = null;
    this.isModalOpen = false;
  }

  getTimeLabel(slotId: number): string {
    const startHour = 7;
    const totalMinutes = (slotId - 1) * 30;
    const hours = Math.floor(totalMinutes / 60) + startHour;
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
