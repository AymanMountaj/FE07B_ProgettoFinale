import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white  contenitore-nav" *ngIf="utente">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 app-title">Epicode Crm</span>
      </a>
      <hr>
      <ul class="nav flex-column mb-auto">
        <li class="nav-item">
          <a class="nav-link text-white" [routerLink]="['/']" routerLinkActive="active">
            <i class="bi bi-house-door"></i> Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" [routerLink]="['/clienti']" routerLinkActive="active">
          <i class="bi bi-people"></i> Clienti
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" [routerLink]="['/fatture']" routerLinkActive="active">
          <i class="bi bi-receipt"></i> Fatture
          </a>
        </li>
      </ul>
      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <strong class="user_name"><i class="bi bi-person"></i> {{utente.username}}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a class="dropdown-item" [routerLink]="['/utenti']" routerLinkActive="active">Lista utenti</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" (click)="logout()">Logout</a></li>
        </ul>
    </div>
  `,
  styles: [`
  .app-title{
    padding-left: 15px;
    background: -webkit-linear-gradient( 180deg, #ff9966  32%,  #fe7f76 63%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .contenitore-nav {
    width: 250px;
    height: 100vh;
    position:fixed;
    background-color: #1c1c1c;
    border-right: 2px solid #fe7f76;
  }
  .nav-link, {
    font-size: 1.25em;
    padding-top: 0.4em;
    border-radius: 10px;
    &:hover,
    &:active,
    &:focus,{
      background-color:#5865F2;
      color: #ff9966  !important;
    }
  }
  .nav-item {
    padding-top:0.5em;
  }
  .user_name{
    padding-left: 5px;
    font-size:1.20em;
    &:hover{
    color: #5865F2;
    }
  }

  .dropdown-item:hover{
    cursor:pointer
  }
  `
  ]
})
export class NavbarComponent implements OnInit {
  utente!: any
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe(res => {
      console.log(res)
      this.utente = res
    })
  }

  logout(){
    this.authSrv.disconetti()
  }

}
