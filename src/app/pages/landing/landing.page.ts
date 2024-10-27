import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    RouterLink
  ]
})
export class LandingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
