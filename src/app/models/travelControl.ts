
import { Member } from "./member";

export interface TravelControl{
    id?: any;
    travelDate?: string;
    km: number;
    departureLocation: string;
    arrivalLocation: string;
    description: string;
    kmControl: string;
    member: Member;    
}