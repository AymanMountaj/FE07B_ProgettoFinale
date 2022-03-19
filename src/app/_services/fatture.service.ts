import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Clienti } from '../models/clienti';
import { Fattura } from '../models/fattura';

@Injectable({
  providedIn: 'root'
})
export class FattureService {
  pathApi: string
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
   }

   getFatture(pagina:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture?page=${pagina}&size=20&sort=id,ASC`);
   }

   deleteFatture(id:number){
     return this.http.delete(`${this.pathApi}/api/fatture/${id}`);
   }

   getByCliente(id:number, pagina:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${id}?page=${pagina}&size=20&sort=id,ASC`);
   }

   statoFattura(){
     return this.http.get<any>(`${this.pathApi}/api/statifattura?page=0&size=20&sort=id,ASC`)
   }

   addFattura(data: Fattura){
     return this.http.post(`${this.pathApi}/api/fatture`, data)
   }

   getById(id:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture/${id}`)
   }

   modficaFattura(id:number, data:any){
     return this.http.put<any>(`${this.pathApi}/api/fatture/${id}`,data)
   }


}
