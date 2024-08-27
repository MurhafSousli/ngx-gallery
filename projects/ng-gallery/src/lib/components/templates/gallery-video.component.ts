import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'gallery-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video
           [attr.mute]="mute"
           [attr.controlsList]="controlsList"
           [attr.disablePictureInPicture]="disablePictureInPicture"
           [disableRemotePlayback]="disableRemotePlayback"
           [controls]="controls"
           [loop]="loop"
           [poster]="poster"
           (error)="error.emit($event)">
      @for (src of videoSources; track src.url) {
        @if (src?.type) {
          <source [src]="src?.url" [type]="src.type"/>
        } @else {
          <source [src]="src?.url"/>
        }
      }
    </video>
  `,
  standalone: true,
  imports: [NgFor, NgIf]
})
export class GalleryVideoComponent implements OnInit {

  videoSources: { url: string, type?: string }[];

  @Input() src: string | { url: string, type?: string }[];
  @Input() poster: string;
  @Input() mute: boolean;
  @Input() loop: boolean;
  @Input() controls: boolean;
  @Input() controlsList: 'nodownload' | 'nofullscreen' | 'noremoteplayback';
  @Input() disableRemotePlayback: boolean;
  @Input() disablePictureInPicture: boolean;

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    if (this.video.nativeElement) {
      const video: HTMLVideoElement = this.video.nativeElement;
      if (shouldPause && !video.paused) {
        video.pause();
      }
    }
  }

  @Input('play') set playVideo(shouldPlay: boolean) {
    if (this.video.nativeElement) {
      const video: HTMLVideoElement = this.video.nativeElement;
      if (shouldPlay) {
        video.play();
      }
    }
  }

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<ErrorEvent>();

  @ViewChild('video', { static: true }) video: ElementRef;

  ngOnInit(): void {
    if (this.src instanceof Array) {
      // If video has multiple sources
      this.videoSources = [...this.src];
    } else {
      this.videoSources = [{ url: this.src }];
    }
  }
}
