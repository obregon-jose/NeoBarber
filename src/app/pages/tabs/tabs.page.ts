import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonAvatar, IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, home, create, cut, personAdd, reader, time } from 'ionicons/icons';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [ IonAvatar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    CommonModule,
  ]
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  userRole: string = '';

  constructor(
    private _storageService: StorageService,

  ) {
    addIcons({ home, create, reader, cut, time, personAdd, person, });
    // SACAR FOTO DEL LOCAL STORAGE
    // this.ngOnInit();
  }

  async ngOnInit() {
    this.userRole = (await this._storageService.getRoleData()) ?? '';
  }

  showTab(tab: string): boolean {
    return tab === this.userRole;
  }

}
