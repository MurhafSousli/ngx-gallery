import {
  Component,
  output,
  effect,
  computed,
  untracked,
  input,
  viewChild,
  Signal,
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';

type VideoSources = { url: string, type?: string }[];
type VideoSource = string | VideoSources;
type VideoControlList = 'nodownload' | 'nofullscreen' | 'noremoteplayback';

@Component({
  standalone: true,
  selector: 'gallery-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video
           [attr.mute]="mute()"
           [attr.controlsList]="controlsList()"
           [attr.disablePictureInPicture]="disablePictureInPicture()"
           [disableRemotePlayback]="disableRemotePlayback()"
           [controls]="controls()"
           [loop]="loop()"
           [poster]="poster()"
           (error)="error.emit($event)">
      @for (src of videoSources(); track src.url) {
        @if (src?.type) {
          <source [src]="src?.url" [type]="src.type"/>
        } @else {
          <source [src]="src?.url"/>
        }
      }
    </video>
  `
})
export class GalleryVideoComponent {

  video: Signal<ElementRef<HTMLVideoElement>> = viewChild<ElementRef<HTMLVideoElement>>('video');

  src: InputSignal<VideoSource> = input<VideoSource>();
  poster: InputSignal<string> = input<string>();
  mute: InputSignal<boolean> = input<boolean>();
  loop: InputSignal<boolean> = input<boolean>();
  pause: InputSignal<boolean> = input<boolean>();
  autoplay: InputSignal<boolean> = input<boolean>();
  controls: InputSignal<boolean> = input<boolean>();
  controlsList: InputSignal<VideoControlList> = input<VideoControlList>();
  disableRemotePlayback: InputSignal<boolean> = input<boolean>();
  disablePictureInPicture: InputSignal<boolean> = input<boolean>();

  videoSources: Signal<VideoSources> = computed(() => {
    if (this.src instanceof Array) {
      // If video has multiple sources
      return [...this.src];
    }
    return [{ url: this.src }];
  });

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<ErrorEvent> = output<ErrorEvent>();

  constructor() {
    effect(() => {
      const video: HTMLVideoElement = this.video().nativeElement;
      const autoplay: boolean = this.autoplay();
      const pause: boolean = this.pause();

      if (video) {
        untracked(() => {
          if (autoplay) {
            video.play();
          }
          if (pause) {
            video.pause();
          }
        });
      }
    });
  }
}
