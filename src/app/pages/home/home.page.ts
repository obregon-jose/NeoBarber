import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientPage } from "./client/client.page";
import { OwnerPage } from "./owner/owner.page";
import { AdminPage } from "./admin/admin.page";
import { RootPage } from "./root/root.page";
import { BarberPage } from "./barber/barber.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ClientPage, OwnerPage, AdminPage, RootPage, BarberPage]
})
export class HomePage implements OnInit {
  userRole: string = '';

  constructor(
    private authService: AuthService
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.userRole = (await this.authService.getRole()) ?? ''; 
  }
}
