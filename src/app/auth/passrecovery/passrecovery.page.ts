import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.page.html',
  styleUrls: ['./passrecovery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PassrecoveryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
