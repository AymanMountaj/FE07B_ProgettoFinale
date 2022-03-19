import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  pathApi:string
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
   }

   getUsers(pagina:number){
     return this.http.get<any>(`${this.pathApi}/api/users?page=${pagina}&size=20&sort=id,ASC`)
   }

}
