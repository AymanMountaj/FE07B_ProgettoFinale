import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  template: `
    <div class="container-fluid pt-5 d-flex">
      <div class="container main-container w-75 p-4">
        <table class="table text-white">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Roles</th>
            </tr>
          </thead>
          <tbody *ngFor="let user of users">
            <tr>
              <th scope="row">{{user.id}}</th>
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td *ngFor="let role of user.roles">{{role.roleName}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="8">
              <nav class="d-flex justify-content-center align-items-center mt-3">
                <ul class="pagination" *ngIf="users">
                  <li class="page-item" *ngIf="!pagine.first">
                    <a class="page-link" (click)="caricaPagina(pagine.number - 1)">
                      <<
                    </a>
                  </li>
                  <li class="page-item" *ngFor="let pagina of numeroPagine(pagine.totalPages); index as i"
                  [ngClass]="(i == pagine.number) ? 'active' : '' ">
                    <a class="page-link" aria-label="Next" (click)="caricaPagina(i)">
                      {{i + 1}}
                    </a>
                  </li>
                  <li class="page-item" *ngIf="!pagine.last">
                    <a class="page-link" aria-label="Next" (click)="caricaPagina(pagine.number + 1)">
                      >>
                    </a>
                  </li>
                </ul>
              </nav>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class UtentiPage implements OnInit {
  users: Array<User>
  pagine:any
  constructor(private userSrv: UserService) { }

  ngOnInit(): void {
  this.userSrv.getUsers(0).subscribe(resolve => {
    console.log(resolve.content)
    this.pagine = resolve
    this.users = resolve.content;
  })
  }
  caricaPagina(pagina:number){
    this.userSrv.getUsers(pagina).subscribe(res => {
      this.pagine = res;
      this.users = res.content;
    });
  }
  numeroPagine(num: number){
    return new Array(num);
  }

}
