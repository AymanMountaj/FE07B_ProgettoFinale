import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  template: `
    <div class="container-fluid pt-4 d-flex m-auto align-items-center">
      <div class="container d-flex justify-content-center">
        <div class="row justify-content-center">
          <div class="col-3 w-75 p-4 text-white contenitore-form">
              <form #form="ngForm" (ngSubmit)="onLogin(form)">
                <div class="form-group p-2">
                  <label class="pb-2" for="username">Username</label>
                  <input ngModel name="username" type="text" class="form-control" id="email">
                </div>
                <div class="form-group p-2">
                  <label class="pb-2" for="password">Password</label>
                  <input ngModel name="password" type="password" class="form-control" id="password">
                </div>
                <div class="container d-flex flex-column align-items-center">
                  <p>Non sei registrato? <a class="redirect" (click)="redirectSignUp()">Registrati</a></p>
                  <button class="btn auth-btn w-50" type="submit">Accedi</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .container-fluid{
    height:100vh;
  }
  .row {
    width: 30vw;
  }
  .contenitore-form{
    background-color: #1c1c1c;
    border-radius: 10px;
    min-height: 40vh;
  }
  input:focus,
  .btn:focus{
    border-color:#bf00ff;
  }
  `
  ]
})
export class LoginPage implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  redirectSignUp(){
    this.router.navigate(['/sign-up'])
  }
  async onLogin(form:NgForm){
    try {
      await this.authSrv.accedi(form.value).toPromise();
      form.reset()
      this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    }
  }

}
