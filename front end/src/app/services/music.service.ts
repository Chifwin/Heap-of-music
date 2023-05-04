import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Music, Songs, Artists, Albums } from '../interfaces/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artists[]> {
    return this.http.get<Artists[]>(`${this.baseUrl}/api/artists`);
  }

  getSongs(): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.baseUrl}/api/songs`);
  }

  getAlbums(): Observable<Albums[]> {
    return this.http.get<Albums[]>(`${this.baseUrl}/api/albums`);
  }

  combineData(artists: Artists[], songs: Songs[], albums: Albums[]): Music[] {
    const musicData: Music[] = [];

    for (const song of songs) {
      let artist = "";
      for (const artist_id of song.artists){
        const pos = artists.find(a => a.id === artist_id);
        console.log(pos)
        if (pos){
          if (artist == ""){
            artist = pos.name
          }else{
            artist += ", " + pos.name;
          }
        }
      }

      const album = albums.find(a => a.id === song.album);
      if (album) {
        const music: Music = {
          id: song.id.toString(),
          title: song.title,
          artist: artist,
          album: album.title,
          url: `${this.baseUrl}/media/${song.song_link}`
        };
        musicData.push(music);
      }
    }
    return musicData;
  }

  getMusicData(): Observable<Music[]> {
    const artistsRequest = this.getArtists();
    const songsRequest = this.getSongs();
    const albumsRequest = this.getAlbums();

    return forkJoin([artistsRequest, songsRequest, albumsRequest]).pipe(
      map((results: [Artists[], Songs[], Albums[]]) => {
        const [artists, songs, albums] = results;
        return this.combineData(artists, songs, albums);
      })
    );
  }

  uploadMusic(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/songs`, formData);
    return this.http.post(`${this.baseUrl}/api/albums`, formData);
    return this.http.post(`${this.baseUrl}/api/artists`, formData);
  }
//   getMusicDataSearch():Observable<Music[]>{
//     return this.http.get<Music[]>(`${this.baseUrl}/songs/search`);
//   }

  searchMusic(query: string): Observable<Music[]>{
    const url = `${this.baseUrl}/api/songs?q=${query}`;
    return this.http.get<Music[]>(url);
  }
}
