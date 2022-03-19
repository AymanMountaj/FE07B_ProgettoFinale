import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiPage } from './components/pages/clienti.page';
import { DettagliCliente } from './components/pages/dettagli-cliente';
import { FatturePage } from './components/pages/fatture.page';
import { HomePage } from './components/pages/home.page';
import { LoginPage } from './components/pages/login.page';
import { NewClientePage } from './components/pages/new-cliente.page';
import { NewFatturaPage } from './components/pages/new-fattura.page';
import { SignUpPage } from './components/pages/sign-up.page';
import { UpdateFatturaPage } from './components/pages/update-fattura.page';
import { UtentiPage } from './components/pages/utenti.page';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomePage,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginPage
  },
  {
    path:'sign-up',
    component:SignUpPage
  },
  {
    path:'utenti',
    component:UtentiPage,
    canActivate: [AuthGuard]
  },
  {
    path:'clienti',
    component:ClientiPage,
    canActivate: [AuthGuard]
  },
  {
    path:'clienti/:id',
    component:NewClientePage,
    canActivate: [AuthGuard]
  },
  {
    path:'fattura-cliente/:id',
    component:DettagliCliente,
    canActivate: [AuthGuard]
  },
  {
    path:'nuova-fattura/:id',
    component: NewFatturaPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'modifica-fattura/:id',
    component: UpdateFatturaPage,
    canActivate:[AuthGuard]
  },
  {
    path:'fatture',
    component:FatturePage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
