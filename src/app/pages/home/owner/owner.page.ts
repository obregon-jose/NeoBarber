import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-owner',
    templateUrl: './owner.page.html',
    styleUrls: ['./owner.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OwnerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
