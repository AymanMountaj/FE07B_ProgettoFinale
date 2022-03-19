import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Clienti } from 'src/app/models/clienti';
import { ClientiService } from 'src/app/_services/clienti.service';

@Component({
  template: `
<div class="container-fluid pt-5 d-flex">
  <div class="container main-container p-4 w-75">
    <span><button class="btn new-btn" [routerLink]="['/clienti/',0]" routerLinkActive="active"> <i
          class="bi bi-person-plus"></i> Nuovo Cliente</button></span>
    <input id="searchbar" [(ngModel)]="ricerca" type="text" name="search" placeholder="Cerca per Ragione Sociale"
      class="search ms-5" />
    <table class="table text-white mt-3">
      <thead class="w-100">
        <tr class="titoli-tabella">
          <th scope="col">Id</th>
          <th scope="col">Ragione Sociale</th>
          <th scope="col">Email</th>
          <th scope="col">Partita Iva</th>
        </tr>
      </thead>
      <tbody *ngFor="let cliente of getClientiFiltrati(); let i = index">



        <tr>
          <th scope="row">{{cliente.id}}</th>
          <td>{{cliente.ragioneSociale}}</td>
          <td>{{cliente.email}}</td>
          <td>{{cliente.partitaIva}}</td>
          <td class="ps-5">
            <button class="btn fatture-btn me-2" [routerLink]="['/fattura-cliente/',cliente.id]"
              routerLinkActive="active"><i class="bi bi-receipt-cutoff"></i> Fatture</button>
            <button class="btn modifica-btn me-2" [routerLink]="['/clienti/',cliente.id]" routerLinkActive="active"><i
                class="bi bi-pencil"></i> Modifica</button>
            <button class="btn delete-btn me-2" (click)="open(mymodal)"><i
                class="bi bi-trash"></i> Elimina</button>
          </td>
        </tr>
        <ng-template #mymodal let-modal>
          <div class="modal-header">
            <h4 class="modal-title" id="modal-basic-title">
              Elimina cliente
            </h4>
            <button type="button" class="close delete-btn p-1" aria-label="Close" (click)="modal.dismiss('Cross click')">
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <div class="modal-body">
            Procedendo eliminerai il cliente
            <strong>{{ cliente.ragioneSociale }}</strong> e tutte le sue
            fatture: sei sicuro?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn new-btn" (click)="modal.close('Save click')">
              Indietro
            </button>
            <button type="button" class="btn delete-btn"
              (click)="eliminaCliente(cliente.id, i); modal.close()">
              Elimina
            </button>
          </div>
        </ng-template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="8">
            <nav class="d-flex justify-content-center align-items-center mt-3">
              <ul class="pagination" *ngIf="clienti">
                <li class="page-item" *ngIf="!pagine.first">
                  <a class="page-link" (click)="caricaPagina(pagine.number - 1)">
                    << </a>
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
  styles: [`
.search{
    background:none;
    padding:6px;
    border: 1px solid #5865F2;
    outline: none;
    border-radius: 5px;
    color: #5865F2;
    &:focus,
    &:hover{
      background:#5865F2;
      color: #fff;
      border:1px solid #fff;
    }
  }`]
})
export class ClientiPage implements OnInit {

  pagine: any;
  ricerca = '';
  clienti: Clienti[];
  clientiFilter: Clienti[];
  closeResult = '';
  constructor(private clientiSrv: ClientiService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.clientiSrv.getClienti(0).subscribe(res => {
      this.pagine = res;
      this.clienti = res.content;
    });
  }

  caricaPagina(pagina: number) {
    this.clientiSrv.getClienti(pagina).subscribe(res => {
      this.pagine = res;
      this.clienti = res.content;
    });
  }

  numeroPagine(num: number) {
    return new Array(num);
  }
  getClientiFiltrati(): Clienti[] {
    if (!this.ricerca) {
      return this.clienti;
    }
    const filteredArray = this.clienti.filter((c) =>
      c.ragioneSociale.includes(this.ricerca)
    );
    return filteredArray;
  }

  onSearch() {
    this.clientiFilter = this.clienti.filter((c) => {
      c.ragioneSociale.includes(this.ricerca);
    });
  }
  open(content:any){
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  async eliminaCliente( id: number, i: number) {
      await this.clientiSrv.deleteFattureCliente(id).toPromise();
      this.clientiSrv.deleteCliente(id).subscribe(resolve => {
        this.clienti.splice(i, 1);
      });
  }
}
