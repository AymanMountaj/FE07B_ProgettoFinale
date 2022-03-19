import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  template: `
    <div class="container-fluid sign-up-container w-25 m-auto">
      <div class="container p-5 main-container d-flex align-items-center justify-content-center text-white">
        <div class="row  justify-content-center">
          <div class="col-3 w-100">
              <form #form="ngForm" (ngSubmit)="onSignUp(form)">
              <div class="form-group">
                  <label for="username">Username *</label>
                  <input ngModel name="username" type="text" class="form-control" id="username" required>
                </div>
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input ngModel name="email" type="text" class="form-control" id="email" required>
                </div>
                <div class="form-group">
                  <label for="password">Password *</label>
                  <input ngModel name="password" type="password" class="form-control" id="password" required>
                </div>
                <div class="form-group">
                  <label for="nome">Nome</label>
                  <input ngModel name="nome" type="text" class="form-control" id="nome">
                </div>
                <div class="form-group">
                  <label for="cognome">Cognome</label>
                  <input ngModel name="cognome" type="text" class="form-control" id="cognome">
                </div>
                <div class="form-group">
                  <label for="ruolo">Ruolo</label>
                  <select class="form-select" ngModel name="role" required>
                    <option selected></option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="container d-flex flex-column justify-content-center align-items-center mt-2">
                    <p>Hai già un account? <a class="redirect" (click)="redirectLogin()">Accedi</a></p>
                    <button class="btn auth-btn" type="submit">Registrati</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [`

  .sign-up-container{
    padding-top: 100px;
  }
  .row{
    height:100%;
  }`
  ]
})
export class SignUpPage implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) { }

  user = {username: '', email:'', password:'', nome:'', cognome:'', role:[]}
  ngOnInit(): void {
  }


  onSignUp(form:any){

    const ruolo = Array();
    ruolo.push(form.value.role);

    this.user.username = form.value.username;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.user.nome = form.value.nome;
    this.user.cognome = form.value.cognome;
    this.user.role = ruolo;
    console.log(this.user)

    this.authSrv.registrazione(this.user).subscribe();
    this.router.navigate(['/login']);
  }

  redirectLogin(){
    this.router.navigate(['/login'])
  }

}
