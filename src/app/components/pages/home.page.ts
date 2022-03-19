import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="contenitore">
      <div class="img-box">
        <h1 class="display-3 text-center text-white fw-bold">Epicode Crm</h1>
        <h3 class="display-5 text-center text-white">Made by <span class="gradient">Ayman</span></h3>
        <img src="../../../assets/img/output-onlinepngtools.png">
      </div>
    </div>
  `,
  styles: [`
  .contenitore{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
  }
  .img-box{
    margin-top: 10em;
    width: 800px;
    height: 800px;
    margin-left: 250px;
  }
  img{
    width: 100%;
  }

  h1{
    background: -webkit-linear-gradient( 180deg, #ff9966  32%,  #fe7f76 63%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .gradient{
    border-bottom: 2px solid  #fe7f76
  }`]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
