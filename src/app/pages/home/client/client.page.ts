import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonLabel, IonButton, IonCard, IonCardContent, IonList, IonCardTitle, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCardTitle, IonList, IonCardContent, IonCard, IonButton, IonLabel, IonIcon, IonItem, IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ClientPage implements OnInit {
  client: any = {
    peluquero: 'Juan Pérez',
    fecha: '2023-10-01',
    hora: '10:00 AM'
  };

  constructor() { }

  ngOnInit() {
  }

}
