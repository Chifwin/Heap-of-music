import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artists } from '../interfaces/artists';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  BASE_URL ='http://127.0.0.1:8000'

  constructor(private client:HttpClient) {

   }
   getArtists(): Observable<Artists[]>{
    return this.client.get<Artists[]>(`${this.BASE_URL}/api/artists/`)
   }
   getArtistById(artistId: number): Observable<Artists> {
    return this.client.get<Artists>(`${this.BASE_URL}/api/artists/${artistId}`);
  }
  createArtist(artist: Artists): Observable<Artists> {
    return this.client.post<Artists>(`${this.BASE_URL}/api/artists/`, artist);
  }
  updateArtist(artist: Artists): Observable<Artists> {
    return this.client.put<Artists>(`${this.BASE_URL}/api/artists/${artist.id}`, artist);
  }
  deleteArtist(artistId: number): Observable<any> {
    return this.client.delete<any>(`${this.BASE_URL}/api/artists/${artistId}`);
  }
}
