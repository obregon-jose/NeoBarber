import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { SeleccionarBarberoPage } from "./seleccionbarbero/seleccionarbarbero.page"; // Importa Router para la navegación

@Component({
  selector: 'app-reservar-peluquero',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    RouterLink,
  ]
})
export class ReservarPage {
  
  constructor(
    // private router: Router
  ) {} // Inyecta Router en el constructor

  // navigateToSelectBarber() {
  //   const currentUrl = this.router.url;
  //   let newUrl = '';

  //   if (currentUrl.includes('cliente')) {
  //     newUrl = 'tabs/reservar/seleccionarbarbero';
  //   } else if (currentUrl.includes('peluquero')) {
  //     newUrl = 'tabs/reservar/seleccionarbarbero';
  //   }

  //   this.router.navigate([newUrl]);
  // }
}
