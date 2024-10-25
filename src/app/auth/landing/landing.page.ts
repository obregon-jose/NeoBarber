import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonImg, IonText } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonCol, IonRow, IonGrid, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LandingPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  iniciarsesion() {
    this.navCtrl.navigateForward('/login'); // Redirige a la nueva ruta
  }

  registrar() {
    this.navCtrl.navigateBack('/registro');
  }

}
