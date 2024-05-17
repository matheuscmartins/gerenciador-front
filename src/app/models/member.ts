import { Address } from "./address";
import { BloodType } from "./bloodType";
import { HeadQuarter } from "./headQuarter";

export interface Member{
    id?: any;
    firtsName: string;
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
    birthDate: Date;
    admissionDate: Date;
    shutdowDate: Date;
    headQuarter: HeadQuarter;
    address: Address;
    imagePath: string;
    profile: string[];
    bloodType: BloodType;
}
/* 
    private List<MemberPatch> memberPatchList = new ArrayList<>();
    */
    