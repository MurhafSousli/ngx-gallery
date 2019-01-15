import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as Hls from 'hls.js';

@Component({
  selector: 'gallery-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video controls poster="{{poster}}" (error)="error.emit($event)">
      <source *ngFor="let src of videoSources" src="{{src?.url}}" type="{{src?.type}}"/>
    </video>
  `
})
export class GalleryVideoComponent implements OnInit {

  videoSources: { url: string, type?: string }[];

  @Input() src: string | { url: string, type?: string }[];
  @Input() poster: string;

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    const video: HTMLVideoElement = this.video.nativeElement;
    if (shouldPause && !video.paused) {
      video.pause();
    }
  }

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();

  @ViewChild('video') video: ElementRef;

  ngOnInit() {
    if (this.src instanceof Array) {
      // If video has multiple sources
      this.videoSources = [...this.src];
    } else {
      this.videoSources = [{url: this.src}];
    }
    this.hlsDetection();
  }

  hlsDetection() {
    let detect = this.videoSources.filter(x => x.type === 'application/x-mpegURL' || x.url.includes('.m3u8'));
    if (detect.length > 0) {
      const hls = new Hls();
      hls.loadSource(detect[0].url);
      hls.attachMedia(this.video.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, _ => {
        this.video.nativeElement.play();
      });
    }
  }
}
