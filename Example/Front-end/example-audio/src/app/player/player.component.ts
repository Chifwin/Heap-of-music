import { Component } from '@angular/core';
import {StreamState} from "../interfaces/stream-state";
import {AudioService} from "../services/audio.service";
import {CloudService} from "../services/cloud.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  files: Array<any> = [];
  state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };
  currentFile: any = {};
  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    this.currentFile = {index: 0};

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  playStream(url:string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  onSliderChangeEnd(change: Event) {
    this.audioService.seekTo(this.state.currentTime);
  }

  play() {
    this.audioService.play();
  }
  pause() {
    this.audioService.pause();
  }
  stop() {
    this.audioService.stop();
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  next() {
    const index = this.currentFile.index + 1;
    console.log(index);
    const file = this.files[index];
    this.openFile(file, index);
  }
  openFile(file: { url: string; }, index: number) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }
}
