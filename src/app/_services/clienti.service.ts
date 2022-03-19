import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clienti } from '../models/clienti';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  pathApi:string
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
   }

  getClienti(pagina:number){
    return this.http.get<any>(`${this.pathApi}/api/clienti?page=${pagina}&size=20&sort=id,ASC`)
  }

  getClienteById(id:number){
    return this.http.get<any>(`${this.pathApi}/api/clienti/${id}`)
  }

  deleteFattureCliente(id:number){
    return this.http.delete(`${this.pathApi}/api/fatture/cliente/${id}`)
  }

  deleteCliente(id:number){
    return this.http.delete(`${this.pathApi}/api/clienti/${id}`)
  }

  addCliente(cliente:any){
    return this.http.post<Clienti>(`${this.pathApi}/api/clienti`, cliente)
  }

  getProvincia(){
    return this.http.get<any>(`${this.pathApi}/api/province?page=0&size=20&sort=id,ASC`)
  }

  getComune(){
    return this.http.get<any>(`${this.pathApi}/api/comuni?page=0&size=20&sort=id,ASC`)
  }

  getTipiCliente(){
    return this.http.get(`${this.pathApi}/api/clienti/tipicliente`);
  }

  updateCliente(id:number, data:any){
    return this.http.put(`${this.pathApi}/api/clienti/${id}`, data)
  }
}
