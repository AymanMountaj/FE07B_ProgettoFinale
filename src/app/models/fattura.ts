import { Clienti } from "./clienti";

export class Fattura {
  id: number;
  data: string;
  numero: number;
  anno: number;
  importo: number;
  stato: {
      id: number;
      nome: string
  };
  cliente: Clienti = new Clienti()
}
