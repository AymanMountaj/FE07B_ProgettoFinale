import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/_services/fatture.service';

@Component({
  template: `
    <div class="container-fluid text-white">
      <div class="container main-container w-25 p-4">
        <div class="row justify-content-center">
          <h3 class="text-center">Crea Fattura</h3>
          <div class="col-3 w-75">
              <form>
                <div class="form-group">
                  <label for="data">Data</label>
                  <input [(ngModel)]="nuovaFattura.data" name="data" type="date" class="form-control" id="data"/>
                </div>
                <div class="form-group">
                  <label for="numero">Numero</label>
                  <input [(ngModel)]="nuovaFattura.numero" name="numero" type="number" class="form-control" id="numero"/>
                </div>
                <div class="form-group">
                  <label for="anno">anno</label>
                  <input [(ngModel)]="nuovaFattura.anno" name="anno" type="number" class="form-control" id="anno"/>
                </div>
                <div class="form-group">
                  <label for="importo">importo</label>
                  <input [(ngModel)]="nuovaFattura.importo" name="importo" type="number" class="form-control" id="importo"/>
                </div>
                <div class="form-group">
                <label for="stato">Stato</label>
                  <select class="form-select" [(ngModel)]="nuovaFattura.stato" name="stato">
                    <option selected></option>
                    <option *ngFor="let stato of statoFattura" [ngValue]="stato">
                      {{stato.nome}}
                    </option>
                  </select>
                </div>
                <div class="container d-flex justify-content-center">
                  <button class="btn new-btn mt-3" (click)="creaFattura()">Crea Fattura</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .container-fluid{
    padding-top: 150px;
  }`]
})
export class NewFatturaPage implements OnInit {
  nuovaFattura: Fattura = new Fattura();
  idCliente:number;
  statoFattura:any;
  constructor(private fattureSrv: FattureService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.fattureSrv.statoFattura().subscribe(res => {
       this.statoFattura = res.content
       console.log(this.statoFattura)
    });

    this.router.params.subscribe(async params =>{
      this.idCliente = +params['id'];
      this.nuovaFattura.cliente.id = this.idCliente
    });
  }

  creaFattura(){
    console.log(this.nuovaFattura)
    this.fattureSrv.addFattura(this.nuovaFattura).subscribe(res => console.log(res))
  }

}
