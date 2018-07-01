import { Component, Input, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gallery-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video controls poster="{{poster}}">
      <source *ngFor="let source of videoSources" src="{{source}}"/>
    </video>
  `
})
export class GalleryVideoComponent implements OnInit {

  videoSources: string[];

  @Input() src: string | string[];
  @Input() poster: string;

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    const video: HTMLVideoElement = this.video.nativeElement;
    if (shouldPause && !video.paused) {
      video.pause();
    }
  }

  @ViewChild('video') video: ElementRef;

  ngOnInit() {
    if (this.src instanceof Array) {
      // If video has multiple sources
      this.videoSources = [...this.src];
    } else {
      this.videoSources = [this.src];
    }
  }
}
