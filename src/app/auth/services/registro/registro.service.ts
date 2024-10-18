import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
// import {enviroment }  from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }
registroUser(data: any){
  return this._http.post<any>(this.apiUrl + '/users', data,).pipe(map((resp:any)=>{
    return resp
  }))


}
// registroUserPro(data: any){
//   return this._http.post<any>(this.apiUrl + '/register', data,).pipe(map((resp:any)=>{
//     return resp
//   }))


// }

}
