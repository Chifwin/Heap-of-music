import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MusicService } from 'src/app/services/music.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent{
  title:string='';
  artist:string='';
  album:string='';
  selectedFile!: File | undefined;

  constructor(private musicService:MusicService){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  uploadMusic(){
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('artist', this.artist);
    formData.append('album', this.album);

    if(this.selectedFile){
      formData.append('file', this.selectedFile);
    }

    this.musicService.uploadMusic(formData).subscribe(
      (response)=>{
        console.log('Music uploaded successfully!', response);
        this.title='';
        this.artist='';
        this.album='';
        this.selectedFile = undefined;
      },
      (error)=>{
        console.error('Failed to upload music!', error);
      }
    );
  }
}