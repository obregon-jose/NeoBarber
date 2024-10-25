import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonFooter, IonButtons, IonButton, IonCheckbox, IonProgressBar } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonButtons, IonFooter, IonItem, IonLabel, IonListHeader, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, CommonModule, FormsModule]
})
export class ServicioPage implements OnInit {
  
  servicios = [
    { nombre: 'Cote de pelo', precio: 20000, seleccionado: false },
    { nombre: 'Tintura', precio: 20000, seleccionado: false },
    { nombre: 'Barba', precio: 20000, seleccionado: false },
    { nombre: 'Cejas', precio: 20000, seleccionado: false },
    // Agrega más servicios si es necesario
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  volver() {
    this.navCtrl.navigateBack('/peluquero/reservar/fechayhora');
  }

  siguiente() {
    const serviciosSeleccionados = this.servicios.filter(servicio => servicio.seleccionado);
    console.log(serviciosSeleccionados);
    this.navCtrl.navigateForward('/peluquero/reservar/resumen');
  }
}
