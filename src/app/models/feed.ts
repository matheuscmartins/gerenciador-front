
import { HeadQuarter } from "./headQuarter";

export interface Feed{
    id?: any;
    postDate: string;
    reunionDate: string;
    title: string;
    text: string;
    headQuarter: HeadQuarter;    
}