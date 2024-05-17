import { Member } from "./member";
import { Patch } from "./patch";

export interface MemberPatch{
    id?: any;
    description: string;   
    admissionDate: Date;
    member: Member;
    patch: Patch ;
}