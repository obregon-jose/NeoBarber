import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonImg, IonText } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonCol, IonRow, IonGrid, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    RouterLink,
  ]
})
export class LandingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
}
