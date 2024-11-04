import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonAccordionGroup, IonAccordion, IonItem, IonRadio, IonButton, IonIcon, IonToggle, IonInput } from '@ionic/angular/standalone';
import { RegisterService } from 'src/app/services/auth/register/register.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
  standalone: true,
  imports: [IonInput, IonToggle, IonIcon, IonButton, IonRadio, IonItem, IonAccordion, IonAccordionGroup, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, 
    FormsModule,
    IonSelect,
    IonSelectOption,
  ]
})
export class AddUserPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: number | null = 1;
  roles: any[] = [];

  constructor(
    private _addUsers: RegisterService,
    private _alertService: ToastService,
    private _roleService: RoleService,
  ) { }

  ngOnInit() {
    this.mostrarRoles();
   } 

  async mostrarRoles() {
    try {
      const data = await this._roleService.cargarRoles();
      this.roles = data;  
    } catch (error) {
      console.error('Error al cargar los Roles', error);
    }
  }

  isRandomPassword: boolean = true;
  togglePassword(event: any) {
    this.isRandomPassword = event.detail.checked;
    if (this.isRandomPassword) {
      this.password = this.generateRandomPassword();
    } else {
      this.password = '';
    }
  }

  generateRandomPassword(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  agregarUsuario() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    if (!emailPattern.test(this.email)) {
      this._alertService.toastYellow('Debes ingresar un Correo Electrónico válido');
      return;
    }

    const passwordPattern = /^(?=.*\d).{8,}$/;
    if (!passwordPattern.test(this.password)) {
      this._alertService.toastYellow('La contraseña debe tener al menos 8 caracteres y un número.');
      return;
    }

    if (this.email && this.name) {

      let userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      };
      this._addUsers.addUser(userData);
    } else {
      this._alertService.toastYellow('Debe llenar todos los campos obligatorios');
    }
  }

}
