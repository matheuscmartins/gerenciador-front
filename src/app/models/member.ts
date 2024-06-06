import { Address } from "./address";
import { BloodType } from "./bloodType";
import { HeadQuarter } from "./headQuarter";

export interface Member{
    id?: any;
    firstName: string;
    lastName: string;
    nickName: string;
    rg: string;
    cpf: string;
    cnh: string;
    celPhone: string;
    phone: string;
    familiarPhone1: string;
    familiarPhone2: string;
    email: string;
    password: string;
    birthDate: string;
    admissionDate: string;
    shutdowDate: string;
    headQuarter?: HeadQuarter;
    address?: Address;
    imagePath: string;
    profile: string[];
    bloodType: BloodType;
}