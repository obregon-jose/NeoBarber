import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../get-token/token.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { catchError, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http:HttpClient,
    private _router: Router,
    private _tokenService: TokenService,
    private _alertService: AlertToastService,
  ) 
  {}
  login(userData: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, userData);
  }
  
  logout(): Observable<void> {
    return this._tokenService.getHeaders().pipe(
      switchMap((headers) => {
        return this._http.post(`${this.apiUrl}/logout`, {}, { headers });
      }),
      switchMap(() => {
        // Eliminar el token del almacenamiento local
        this._tokenService.deleteToken();
        // Redirigir a la página de inicio de sesión
        this._router.navigate(['/login']);
        return new Observable<void>((observer) => {
          observer.next();
          observer.complete();
        });
      }),
      catchError((error) => {
        this._alertService.alertToastRed('Error durante logout', 'top');
        return new Observable<void>((observer) => {
          observer.error(error);
        });
      })
    );
  }

}