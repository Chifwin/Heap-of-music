import { Component, OnInit } from '@angular/core';
import { Music, Songs, Albums, Artists } from 'src/app/interfaces/music';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  title = 'music player';
  audio = new Audio();
  musicList: Music[] = [];
  selectedFile: File | undefined;

  displayedColumns: string[] = ['title', 'artist', 'album'];
  trackPointer: number = 0;
  currentMusic: Music = {
    id: "",
    album: "",
    title: "",
    artist: "",
    url: ""
  };

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.musicService.getMusicData().subscribe(
      (musicData: Music[]) => {
        this.musicList = musicData;
        console.log(musicData)
        if (musicData.length > 0) {
          this.currentMusic = musicData[0];
          this.audio.src = this.currentMusic.url;
        }
      },
      (error: any) => {
        console.log('Error fetching music data:', error);
      }
    );
  }

  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
        }
        this.currentMusic = this.musicList[this.trackPointer];
        this.audio.src = this.currentMusic.url;
      }

      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[this.trackPointer];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
  }

  prev(): void {
    if (this.trackPointer > 0) {
      this.trackPointer--;
      this.currentMusic = this.musicList[this.trackPointer];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
  }

  next(): void {
    if (this.trackPointer < this.musicList.length - 1) {
      this.trackPointer++;
      this.currentMusic = this.musicList[this.trackPointer];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
  }

  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadMusic(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('title', this.currentMusic.title);
      formData.append('artist', this.currentMusic.artist);
      formData.append('album', this.currentMusic.album);

      this.musicService.uploadMusic(formData).subscribe(
        (response) => {
          console.log('Music uploaded successfully', response);
          // Handle success response
        },
        (error) => {
          console.error('Error uploading music', error);
          // Handle error response
        }
      );
    }
  }
}
