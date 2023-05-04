import { Component, OnInit} from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { Music } from 'src/app/interfaces/music';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query !: string;
  musicResults!: Music[];

  constructor(private musicService: MusicService){
    this.musicResults=[];
  }
  ngOnInit(): void {
      this.searchMusic();
  }

  searchMusic(){
    this.musicService.searchMusic(this.query).subscribe(
      (response : Music[])=>{
        this.musicResults = response;
      }
    );
  }
}
