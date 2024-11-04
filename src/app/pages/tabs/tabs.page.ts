import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, home, create, cut } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    CommonModule,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  userRole: string = '';

  constructor(
    public authService: AuthService,
  ) {
    addIcons({
      home,
      person,
      create,
      cut, 
    });
  }

  async ngOnInit() {
    this.userRole = (await this.authService.getRole()) ?? '';
  }
  showTab(tab: string): boolean {
    return tab === this.userRole;
  }

}
