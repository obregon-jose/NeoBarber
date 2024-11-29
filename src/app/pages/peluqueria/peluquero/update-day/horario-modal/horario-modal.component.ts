import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonCheckbox,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateDayPage } from '../update-day.page';

@Component({
  selector: 'app-horario-modal',
  templateUrl: './horario-modal.component.html',
  styleUrls: ['./horario-modal.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonHeader,
    FormsModule,
    CommonModule,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonList,
    IonCheckbox,
  ],
  providers: [ModalController,UpdateDayPage],
})
export class HorarioModalComponent {
  horarios = [
    { hour_start: '07:00', selected: false },
    { hour_start: '08:00', selected: false },
    { hour_start: '09:00', selected: false },
    { hour_start: '10:00', selected: false },
    { hour_start: '11:00', selected: false },
    { hour_start: '12:00', selected: false },
    { hour_start: '13:00', selected: false },
    { hour_start: '14:00', selected: false },
    { hour_start: '15:00', selected: false },
    { hour_start: '16:00', selected: false },
    { hour_start: '17:00', selected: false },
    { hour_start: '18:00', selected: false },
    { hour_start: '19:00', selected: false },
    { hour_start: '20:00', selected: false },
    { hour_start: '21:00', selected: false },
    { hour_start: '22:00', selected: false },
    { hour_start: '23:00', selected: false },
  ];

  constructor(private modalCtrl: ModalController,private _updateDay: UpdateDayPage,) {}


async save() {
    const selectedHorarios = this.horarios
      .filter((franja) => franja.selected)
      .map((franja) => franja.hour_start);

    await this._updateDay.actualizar(selectedHorarios);
    await this._updateDay.actualizar(selectedHorarios);
    console.log('Horario guardado:', selectedHorarios);
  }

  formatHour(hour: string): string {
    const [hours, minutes] = hour.split(':');
    const hourInt = parseInt(hours, 10);
    const suffix = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hourInt + 11) % 12 + 1).toString().padStart(2, '0'); // Convierte de 24h a 12h
    return `${formattedHour}:${minutes} ${suffix}`;
  }
}
