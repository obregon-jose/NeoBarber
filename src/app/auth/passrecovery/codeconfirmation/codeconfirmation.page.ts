import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-codeconfirmation',
  templateUrl: './codeconfirmation.page.html',
  styleUrls: ['./codeconfirmation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CodeconfirmationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
