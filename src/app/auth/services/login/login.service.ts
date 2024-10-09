import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences'; //
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
  
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  // token: any = '';

  constructor(
    private _http:HttpClient,
    private _router: Router,
    // private _storage: Storage,
  ) 
  {}

  login(UserData: any) { 
    return this._http.post(this.apiUrl + '/login', UserData );
  }
  
  async logout() {
    // Obtén el token
    const token = await this.getToken();
    
    // Configura los encabezados para la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Usa el token en los encabezados
    });
  
    try {
      // Remover el token en el servidor
      await this._http.post(`${this.apiUrl}/logout`, {}, { headers }).toPromise();
  
      // Eliminar el token del almacenamiento local
      await Preferences.remove({ key: 'token' });
  
      // Redirigir a la página de inicio de sesión
      // this._router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante logout:', error);
      // Manejo de errores según sea necesario
    }
  }
  

  // Guardar un token
   saveToken = async (token: string) => {
    await Preferences.set({
      key: 'token',
      value: token,
    });
  };

  // Obtener el token
  getToken = async () => {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  };
  

  // Limpiar todo el almacenamiento
  clearPreferences = async () => {
    await Preferences.clear();
  };

}

/*



  // Obtener el token
  private async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value; // Devuelve el token o null si no está presente
  }

  // Método para cerrar sesión
  async logout() {
    const token = await this.getToken(); // Obtén el token

    // Configura los encabezados para la solicitud
    const headers = new HttpHeaders({
      'Authorization': Bearer ${token} // Usa el token en los encabezados
    });

    // Realiza la solicitud de logout
    return this.http.post(${this.apiUrl}/logout, {}, { headers });
  }
}



*/