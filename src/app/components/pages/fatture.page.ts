import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/_services/fatture.service';

@Component({
  template: `
    <div class="container-fluid pt-5 d-flex">
      <div class="container main-container p-4 w-75">
        <table class="table text-white">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Data</th>
              <th scope="col">Numero</th>
              <th scope="col">Anno</th>
              <th scope="col">Stato Fattura</th>
              <th scope="col">Cliente</th>
            </tr>
          </thead>
          <tbody *ngFor="let fattura of fatture">
            <tr>
              <th scope="row">{{fattura.id}}</th>
              <td>{{fattura.data | date:'d/M/yy, h:mm a'}}</td>
              <td>{{fattura.numero}}</td>
              <td>{{fattura.anno}}</td>
              <td >{{fattura.stato.nome}}</td>
              <td>{{fattura.cliente.ragioneSociale}}</td>
              <td class="ps-5">
                <button class="btn modifica-btn me-2" [routerLink]="['/modifica-fattura/', fattura.id]" routerLinkActive="active"><i class="bi bi-pencil"></i> Modifica</button>
                <button class="btn delete-btn me-2" (click)="open(mymodal)"><i class="bi bi-trash"></i> Elimina</button>
              </td>
            </tr>
            <ng-template #mymodal let-modal>
              <div class="modal-header">
                <h4 class="modal-title" id="modal-basic-title">
                  Elimina fattura
                </h4>
                <button type="button" class="close delete-btn p-1" aria-label="Close" (click)="modal.dismiss('Cross click')">
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div class="modal-body">
                Procedendo eliminerai la fattura N° <strong>{{fattura.numero}}</strong> del cliente: {{fattura.cliente.ragioneSociale}}
                <div class="modal-footer">
                  <button type="button" class="btn new-btn" (click)="modal.close('Save click')">
                    Indietro
                  </button>
                  <button type="button" class="btn delete-btn" (click)="eliminaFattura(fattura.id); modal.close()">
                    Elimina
                  </button>
                </div>
              </div>
            </ng-template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="8">
                <nav class="d-flex justify-content-center align-items-center mt-3">
                  <ul class="pagination d-flex flex-wrap" *ngIf="fatture">
                  <li class="page-item" *ngIf="!pagine.first">
                      <a class="page-link" aria-label="Previous" (click)="caricaPagina(pagine.totalPages - pagine.totalPages)">
                        Prima Pagina
                      </a>
                    </li>
                    <li class="page-item" *ngIf="!pagine.first">
                      <a class="page-link" aria-label="Previous" (click)="caricaPagina(pagine.number -1)">
                        <<
                      </a>
                    </li>
                    <li class="page-item" *ngIf="!pagine.last">
                      <a class="page-link" aria-label="Next" (click)="caricaPagina(pagine.number + 1)">
                        >>
                      </a>
                    </li>
                    <li class="page-item" *ngIf="!pagine.last">
                      <a class="page-link" aria-label="Next" (click)="caricaPagina(pagine.totalPages - 1)">
                        Ultima pagina
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
export class FatturePage implements OnInit {
  closeResult='';
  pagine: any;
  fatture: Fattura[]
  constructor(private fattureSrv: FattureService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fattureSrv.getFatture(0).subscribe(res => {
      this.pagine = res;
      this.fatture = res.content;
    });
  }

  caricaPagina(pagina:number){
    this.fattureSrv.getFatture(pagina).subscribe(res => {
      this.pagine = res;
      this.fatture = res.content;
    })
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

  eliminaFattura(id:number){
      this.fattureSrv.deleteFatture(id).subscribe(resolve => {
        window.location.reload()
      });
  }

}
