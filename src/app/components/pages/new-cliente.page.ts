import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clienti } from 'src/app/models/clienti';
import { Comune } from 'src/app/models/comuni';
import { Provincia } from 'src/app/models/provincia';
import { ClientiService } from 'src/app/_services/clienti.service';

@Component({
  template: `

<div class="container-fluid pt-5">
  <div class="container main-container p-4 w-75 text-white">
    <form>
      <div class="row ">
        <h1 class="display-6 text-center" *ngIf="idCliente === 0; else elseBlock">Aggiungi cliente</h1>
        <ng-template #elseBlock><h1 class="display-6 text-center">Modifica cliente</h1></ng-template>
        <h1 class="display-6 text-center" #elseBlock></h1>
        <div class="col-md-6">
          <div class="form-group">
            <label for="ragioneSociale">Ragione Sociale *</label>
            <input [(ngModel)]="nuovoCliente.ragioneSociale" name="ragioneSociale" type="text" class="form-control"
              id="ragioneSociale" required/>
          </div>
          <div class="form-group">
            <label for="partitaIva">Partita Iva *</label>
            <input [(ngModel)]="nuovoCliente.partitaIva" name="partitaIva" type="text" class="form-control"
              id="partitaIva" required/>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input [(ngModel)]="nuovoCliente.email" name="email" type="email" class="form-control" id="email" required/>
          </div>
          <div class="form-group">
            <label for="tipoCliente">Tipo Cliente *</label>
            <select class="form-select" [(ngModel)]="nuovoCliente.tipoCliente" name="tipoCliente" required>
              <option selected></option>
              <option *ngFor="let type of tipiCliente" value="{{ type }}">
                {{ type }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="pec">Pec</label>
            <input [(ngModel)]="nuovoCliente.pec" name="pec" type="text" class="form-control" id="pec" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="telefono">Telefono</label>
            <input [(ngModel)]="nuovoCliente.telefono" name="telefono" type="text" class="form-control" id="telefono" />
          </div>
          <div class="form-group">
            <label for="nomeContatto">Nome Contatto</label>
            <input [(ngModel)]="nuovoCliente.nomeContatto" name="nomeContatto" type="text" class="form-control"
              id="nomeContatto" />
          </div>
          <div class="form-group">
            <label for="cognomeContatto">Cognome Contatto</label>
            <input [(ngModel)]="nuovoCliente.cognomeContatto" name="cognomeContatto" type="text" class="form-control"
              id="cognomeContatto"/>
          </div>
          <div class="form-group">
            <label for="telefonoContatto">Telefono Contatto</label>
            <input [(ngModel)]="nuovoCliente.telefonoContatto" name="telefonoContatto" type="text" class="form-control"
              id="telefonoContatto"/>
          </div>
          <div class="form-group">
            <label for="emailContatto">Email Contatto *</label>
            <input [(ngModel)]="nuovoCliente.emailContatto" name="emailContatto" type="text" class="form-control"
              id="emailContatto" required/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mt-3">
          <h3 class="text-white text-center">Sede Operativa</h3>
          <div class="form-group">
            <label for="via">Via</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.via" name="via" type="text" class="form-control"
              id="via" />
          </div>
          <div class="form-group">
            <label for="civico">Civico</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.civico" name="civico" type="text"
              class="form-control" id="civico" />
          </div>
          <div class="form-group">
            <label for="localita">Cap</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.cap" name="cap" type="text" class="form-control"
              id="cap" />
          </div>
          <div class="form-group">
            <label for="localita">Località</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.localita" name="localita" type="text"
              class="form-control" id="localita" />
          </div>
          <div class="form-group">
            <label for="comune">Comune *</label>
            <select class="form-select" [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.comune" name="comune" required>
              <option selected></option>
              <option *ngFor="let comune of comuni" [ngValue]="comune">
                {{ comune.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="provincia">Provincia</label>
            <select class="form-select" [(ngModel)]="nuovoCliente.indirizzoSedeOperativa.comune.provincia"
              name="provincia">
              <option selected></option>
              <option *ngFor="let provincia of province" [ngValue]="provincia">
                {{ provincia.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6 mt-3">
          <h3 class="text-white text-center">Sede Legale</h3>
          <div class="form-group">
            <label for="via">Via</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeLegale.via" name="via" type="text" class="form-control"
              id="via" />
          </div>
          <div class="form-group">
            <label for="civico">Civico</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeLegale.civico" name="civico" type="text" class="form-control"
              id="civico" />
          </div>
          <div class="form-group">
            <label for="localita">Cap</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeLegale.cap" name="cap" type="text" class="form-control"
              id="cap" />
          </div>
          <div class="form-group">
            <label for="localita">Località</label>
            <input [(ngModel)]="nuovoCliente.indirizzoSedeLegale.localita" name="localita" type="text"
              class="form-control" id="localita" />
          </div>
          <div class="form-group">
            <label for="comune">Comune *</label>
            <select class="form-select" [(ngModel)]="nuovoCliente.indirizzoSedeLegale.comune" name="comune" required>
              <option selected></option>
              <option *ngFor="let comune of comuni" [ngValue]="comune">
                {{ comune.nome }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="provincia">Provincia</label>
            <select class="form-select" [(ngModel)]="nuovoCliente.indirizzoSedeLegale.comune.provincia"
              name="provincia">
              <option selected></option>
              <option *ngFor="let provincia of province" [ngValue]="provincia">
                {{ provincia.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="container d-flex justify-content-center mt-3">
            <button class="btn new-btn mt-3" *ngIf="idCliente == 0; else  elseBtn" (click)="aggiungiCliente()">
              Crea cliente
            </button>
            <ng-template #elseBtn>
            <button class="btn modifica-btn mt-3" (click)="modificaCliente()">
              Modifica cliente
            </button>
            </ng-template>
          </div>
      </div>
    </form>
  </div>
</div>
`,
  styles: [``],
})
export class NewClientePage implements OnInit {

  province!: Provincia[];
  tipiCliente: any;
  comuni!: Comune[];
  nuovoCliente: Clienti = new Clienti();
  idCliente: number



  constructor(private clientiSrv: ClientiService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.provincia();
    this.comune();
    this.tipoCliente();
    this.getIdCliente();
    this.getCliente();
  }

  provincia() {
    this.clientiSrv.getProvincia().subscribe((res) => {
      this.province = res.content;
    });
  }

  comune() {
    this.clientiSrv.getComune().subscribe((res) => {
      this.comuni = res.content;
    });
  }

  getIdCliente() {
    this.router.params.subscribe(async params => {
      this.idCliente = +params['id'];

    });
  }
  getCliente() {
    if (this.idCliente != 0) {
      this.clientiSrv.getClienteById(this.idCliente).subscribe(res => this.nuovoCliente = res)
    }
  }
  tipoCliente() {
    this.clientiSrv.getTipiCliente().subscribe((res) => {
      this.tipiCliente = res;
    });
  }
  modificaCliente(){
    this.clientiSrv.updateCliente(this.idCliente, this.nuovoCliente).subscribe(res => {
      console.log(res);
    });
  }

  aggiungiCliente(){
    this.clientiSrv.addCliente(this.nuovoCliente).subscribe(res => {
      console.log(res)
    });
  }

  /* clienteMethod() {
    if (this.idCliente != 0) {
      this.clientiSrv.updateCliente(this.idCliente, this.nuovoCliente).subscribe(res => {
        console.log(res);
      });
    } else {
      this.clientiSrv.addCliente(this.nuovoCliente).subscribe(res => {
        console.log(res)
      });
    }

  } */
}
