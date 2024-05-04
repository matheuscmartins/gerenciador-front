import { City } from "./city";

export interface Address{
    id?: any;
    logradouro: string;
    number: string;
    addressComplement?: string;
    postCode: string;
    city?: City;    
}
