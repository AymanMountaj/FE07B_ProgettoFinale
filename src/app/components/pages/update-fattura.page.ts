import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/_services/fatture.service';

@Component({
  template: `
    <div class="container-fluid">
      <div class="container main-container text-white w-25 p-4">
        <div class="row justify-content-center">
          <h4 class="text-center">Modifica Fattura</h4>
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
                  <button class="btn modifica-btn mt-3" (click)="updateFattura()">Modifica Fattura</button>
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
export class UpdateFatturaPage implements OnInit {

  nuovaFattura: Fattura = new Fattura();
  statoFattura:any;
  idFattura: number;
  constructor(private fattureSrv: FattureService, private router: ActivatedRoute, private redirect: Router) { }

  ngOnInit(): void {
    this.getStatoFattura();
    this.getIdFattura();
    this.getFattura()
  }

  getIdFattura(){
    this.router.params.subscribe(async params =>{
      this.idFattura = +params['id'];
      console.log(this.idFattura)
    });
  }

  getFattura(){
    this.fattureSrv.getById(this.idFattura).subscribe(res => {
      this.nuovaFattura = res
    })
  }

  updateFattura(){
    console.log(this.nuovaFattura)
    this.fattureSrv.modficaFattura(this.idFattura, this.nuovaFattura).subscribe(res => console.log(res))
    this.redirect.navigate(['/fattura-cliente/',this.nuovaFattura.cliente.id])
  }

  getStatoFattura(){
    this.fattureSrv.statoFattura().subscribe(res => {
      this.statoFattura = res.content
    })
  }
}
