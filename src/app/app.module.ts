import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePage } from './components/pages/home.page';
import { LoginPage } from './components/pages/login.page';
import { SignUpPage } from './components/pages/sign-up.page';
import { UtentiPage } from './components/pages/utenti.page';
import { ClientiPage } from './components/pages/clienti.page';
import { FatturePage } from './components/pages/fatture.page';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './_interceptor/token.interceptor';
import { DettagliCliente } from './components/pages/dettagli-cliente';
import { NewClientePage } from './components/pages/new-cliente.page';
import { NewFatturaPage } from './components/pages/new-fattura.page';
import { UpdateFatturaPage } from './components/pages/update-fattura.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    LoginPage,
    SignUpPage,
    UtentiPage,
    ClientiPage,
    FatturePage,
    DettagliCliente,
    NewClientePage,
    NewFatturaPage,
    UpdateFatturaPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
