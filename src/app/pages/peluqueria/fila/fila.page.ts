import { Component } from '@angular/core';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-fila',
  templateUrl: './fila.page.html',
  styleUrls: ['./fila.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonItem,       
    IonLabel,     
    IonIcon, 
    IonAccordionGroup,
    IonAccordion
  ],
})
export class FilaPage {
  constructor() {}
  items: { title: string; content: string }[] = [
    { title: 'Corte de Pelo', content: 'Servicio de corte de pelo, precio: $20.000' },
    { title: 'Barba', content: 'Servicio de arreglo de barba, precio: $15.000' },
    { title: 'Lavado y Secado', content: 'Servicio de lavado y secado, precio: $10.000' },
    { title: 'Coloración', content: 'Servicio de coloración de cabello, precio: $25.000' }
  ];
}
