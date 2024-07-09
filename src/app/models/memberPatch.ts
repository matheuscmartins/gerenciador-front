import { Member } from "./member";
import { Patch } from "./patch";

export interface MemberPatch{
    id?: any;
    description: string;   
    admissionDate: string;
    member: Member;
    patch: Patch ;
}