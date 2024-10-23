import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonCheckbox, IonButton, IonPopover, IonNote, IonSelect, IonSelectOption, IonDatetime,} from '@ionic/angular/standalone';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
  standalone: true,
  imports: [IonNote, IonPopover, IonButton, 
    IonCheckbox, IonLabel, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect,
    IonSelectOption,
    IonDatetime,
  ]
})
export class HorarioPage implements OnInit {
  horaInicio: string = '';
  horaFin: string = '';
  
  dias = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false
  };

  constructor() { }

  ngOnInit() { }

  crearHorario() {
    const diasSeleccionados = Object.keys(this.dias).filter(dia => this.dias[dia as keyof typeof this.dias]);

    if (!this.horaInicio || !this.horaFin) {
      console.log('Debe seleccionar una franja horaria.');
      return;
    }

    // Valida que la hora de inicio sea anterior a la hora de fin
    if (this.horaInicio <= this.horaFin) {
      console.log('La hora de inicio debe ser anterior a la hora de fin.');
      return;
    }

    const horario = {
      dias: diasSeleccionados,
      franja: {
        inicio: this.horaInicio,
        fin: this.horaFin
      }
    };

    console.log('Horario creado:', horario);
    // Aquí puedes añadir lógica para guardar el horario o realizar otra acción
  }
}

