import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = environment.apiUrl+'/services';
  constructor(
    private _http: HttpClient
  ) { }

  cargarServicios():Observable<any>{
    return this._http.get(this.apiUrl)
  }
  // mostrarUnServicio(data: any){
  
  // }
  crearServicio(data: any){
    return this._http.post<any>(this.apiUrl, data,).pipe(map((resp:any)=>{
      return resp
    }))
  }
  // editarServicios(data: any){
  
  // }
  // eliminarServicios(data: any){
  
  // }
}
