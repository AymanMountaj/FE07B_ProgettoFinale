import { Sede } from "./sede";

export class Clienti {
  id:number;
  ragioneSociale: string;
  partitaIva: number;
  tipoCliente: string;
  email: string;
  pec: string;
  telefono: number;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: number;
  emailContatto: string;

  indirizzoSedeOperativa: Sede = new Sede()
  indirizzoSedeLegale: Sede = new Sede()
}
