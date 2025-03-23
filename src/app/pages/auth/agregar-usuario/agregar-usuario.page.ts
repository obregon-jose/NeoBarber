import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonToggle } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { RegistroService } from 'src/app/services/auth/registro/registro.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
    selector: 'app-agregar-usuario',
    templateUrl: './agregar-usuario.page.html',
    styleUrls: ['./agregar-usuario.page.scss'],
    imports: [IonInput, IonSelect, IonSelectOption, IonToggle, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarUsuarioPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  role: number | null = 1;
  roles: any[] = [];

  constructor(
    private _addUsers: RegistroService,
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

  isRandomPassword: boolean = false;
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
      this._addUsers.agregarUsuario(userData);
    } else {
      this._alertService.toastYellow('Debe llenar todos los campos obligatorios');
    }
  }

}
