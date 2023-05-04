import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Songs } from '../interfaces/songs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  BASE_URL ='http://127.0.0.1:8000'

  constructor(private client:HttpClient) {

   }
   getSongs(): Observable<Songs[]>{
    return this.client.get<Songs[]>(`${this.BASE_URL}/api/songs/`)
   }

   getSongById(songId: number): Observable<Songs> {
    return this.client.get<Songs>(`${this.BASE_URL}/api/songs/${songId}`);
  }

  createSong(song: Songs): Observable<Songs> {
    return this.client.post<Songs>(`${this.BASE_URL}/api/songs/`, song);
  }
  updateSong(song: Songs): Observable<Songs> {
    return this.client.put<Songs>(`${this.BASE_URL}/api/songs/${song.id}`, song);
  }
  deleteSong(songId: number): Observable<any> {
    return this.client.delete<any>(`${this.BASE_URL}/api/songs/${songId}`);
  }
}
