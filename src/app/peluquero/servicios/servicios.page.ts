import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';


@Component({
  selector: 'app-servicios',
  templateUrl: 'servicios.page.html',
  styleUrls: ['servicios.page.scss'],
  standalone: true,
  imports: [IonLabel, IonListHeader, IonTabButton, IonTabBar, IonTabs, IonFab, IonCheckbox, IonItem, IonIcon, IonFabButton, IonList, IonHeader, IonToolbar, IonTitle, IonContent,NgFor, ]
})
export class ServiciosPage {
  services = [
    { name: 'Corte de pelo' },
    { name: 'Afeitado' },
    { name: 'Tinte' }
  ];
  constructor() {
    addIcons({ add});
  }
  addService() {
    this.services.push({ name: 'Nuevo servicio' });
  }
}
