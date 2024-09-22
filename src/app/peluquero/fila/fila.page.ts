import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-fila',
  templateUrl: 'fila.page.html',
  styleUrls: ['fila.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ],
})
export class FilaPage {
  constructor() {}
}
