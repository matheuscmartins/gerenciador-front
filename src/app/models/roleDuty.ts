
import { Member } from "./member";

export interface RoleDuty{
    id?: any;
    roleName?: string;
    startDate: string;
    endDate: string;
    member: Member;    
}