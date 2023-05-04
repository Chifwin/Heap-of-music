export interface Music {
    id: string;
    album: string;
    title: string;
    artist: string;
    url: string;
}
export interface Songs {
    id:number;
    title: string;
    album: number;
    duration: number;
    is_public: boolean;
    song_link: string;
    image_link: string;
    artists: number[];
}

export interface Artists {
    id:number;
    name: string;
    song_set: Songs[];
}

export interface Albums {
    id:number;
    title: string;
    song_set: Songs[];
    image_link: string;
}
