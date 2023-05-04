import {Songs} from "./songs";

export interface Artists {
    id:number;
    name: string;
    song_set: Songs[];
}
