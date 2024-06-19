
import { Member } from "./member";

export interface Infraction{
    id?: any;
    infractionDate?: string;
    description: string;
    member: Member;
    infractionType: string;
}