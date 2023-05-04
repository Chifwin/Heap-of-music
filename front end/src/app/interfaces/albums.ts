import {Songs} from "./songs";

export interface Albums {
    id:number;
    title: string;
    song_set: Songs[];
    image_link: string;
}