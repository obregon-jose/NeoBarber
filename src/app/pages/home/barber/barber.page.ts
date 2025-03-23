import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-barber',
    templateUrl: './barber.page.html',
    styleUrls: ['./barber.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BarberPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
