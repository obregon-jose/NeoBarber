import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-perfil-peluquero',
  templateUrl: 'perfil-peluquero.page.html',
  styleUrls: ['perfil-peluquero.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,  ]
})
export class PerfilPeluqueroPage {

  constructor() {}

}
