import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatiLogin } from '../models/dati_login';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pathApi:string
  user: {username:string, email:string, password:string, nome: string, cognome: string, role: []}
  private authSubject = new BehaviorSubject<null | DatiLogin>(null);
  user$ = this.authSubject.asObservable();
  loggato = this.authSubject.pipe(map(user => !!user));

  constructor(private http: HttpClient, private router: Router) {
    this.pathApi = environment.pathApi
    this.ripristinaUser();
  }

  registrazione(user:any){
    return this.http.post(`${this.pathApi}/api/auth/signup`, user)
  }

  accedi(data: DatiLogin){
    console.log(data)
    return this.http.post<DatiLogin>(`${this.pathApi}/api/auth/login`, data).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data));
    }));
  }

  ripristinaUser(){
    const userJson = localStorage.getItem('user')
    if(!userJson){
      return
    }
    const user:DatiLogin = JSON.parse(userJson)
    this.authSubject.next(user)
  }

  disconetti(){
    this.authSubject.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('user')
  }
}
