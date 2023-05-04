import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Albums } from '../interfaces/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  BASE_URL ='http://127.0.0.1:8000'

  constructor(private client:HttpClient) {

   }
   getAlbums(): Observable<Albums[]>{
    return this.client.get<Albums[]>(`${this.BASE_URL}/api/albums/`)
   }
   getAlbumById(albumId: number): Observable<Albums> {
    return this.client.get<Albums>(`${this.BASE_URL}/api/albums/${albumId}`);
  }
   createAlbum(album: Albums): Observable<Albums> {
    return this.client.post<Albums>(`${this.BASE_URL}/api/albums/`, album);
  }
   updateAlbum(album: Albums): Observable<Albums> {
    return this.client.put<Albums>(`${this.BASE_URL}/api/albums/${album.id}`, album);
  }
   deleteAlbum(albumId: number): Observable<any> {
    return this.client.delete<any>(`${this.BASE_URL}/api/albums/${albumId}`);
  }
}
