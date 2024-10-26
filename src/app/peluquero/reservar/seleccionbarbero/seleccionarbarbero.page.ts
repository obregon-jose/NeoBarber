import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCard, IonProgressBar } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-seleccionarbarbero-peluquero',
  templateUrl: 'seleccionarbarbero.page.html',
  styleUrls: ['seleccionarbarbero.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonRow,
    IonCol,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar
  ],
})
export class SeleccionarBarberoPage {
  barbers: any[] = [];
  progressValue: number = 0.33;

  constructor(private router: Router) {
    this.loadBarbers();
  }

  loadBarbers() {
    this.barbers = [
      { name: 'Mac Miller', subtitle: 'El mono', image: 'assets/images/sebastian.jpeg' },
      { name: 'Sebastián Yatra', subtitle: 'El mago', image: 'assets/images/sebastian.jpeg' },
      { name: 'Johnny Sins', subtitle: 'Arcángel', image: 'assets/images/sebastian.jpeg' },
      { name: 'Ronny Red', subtitle: 'El Cholo', image: 'assets/images/sebastian.jpeg' }
    ];
  }

  selectBarber(barber: any) {
    this.router.navigate(['/peluquero/reservar/fechayhora'], {
      queryParams: { barberName: barber.name }
    });
  }
}
