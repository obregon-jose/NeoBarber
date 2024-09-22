import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-reservas-peluquero',
  templateUrl: 'reservas-peluquero.page.html',
  styleUrls: ['reservas-peluquero.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class ReservasPeluqueroPage {
  constructor() {}
}
