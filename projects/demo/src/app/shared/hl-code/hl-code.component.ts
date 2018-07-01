import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { delay, finalize, map, take } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { ScrollbarComponent } from 'ngx-scrollbar';

@Component({
  selector: 'hl-code',
  templateUrl: './hl-code.component.html',
  styleUrls: ['./hl-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlCodeComponent implements AfterViewInit {

  state$ = new BehaviorSubject({
    copied: false,
    height: '100%'
  });
  @Input() code: string;
  @Input() height: number;
  @Input() disabled: boolean;

  @ViewChild('codeEL', {read: ElementRef}) codeEl: ElementRef;
  @ViewChild(ScrollbarComponent) scrollbars: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.updateHeight();
  }

  updateHeight() {
    if (!this.height && this.codeEl) {
      this.updateState({height: this.codeEl.nativeElement.offsetHeight + 'px'});
    } else {
      this.updateState({height: this.height + 'px'});
    }
  }

  private updateState(state) {
    this.state$.next({...this.state$.value, ...state});
    this.cd.detectChanges();
  }

  copy() {
    const browser = getOS();
    of(this.code).pipe(
      map((text: string) => {

        // Create a hidden textarea element
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);

        // highlight textarea to copy the text
        if (browser === 'ios') {
          const range = document.createRange();
          range.selectNodeContents(textArea);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textArea.readOnly = true;
          textArea.setSelectionRange(0, 999999);
        } else {
          textArea.select();
        }
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.updateState({copied: true});
      }),
      take(1),
      delay(3500),
      finalize(() => this.updateState({copied: false}))
    ).subscribe();
  }

}

/** Detect operating system 'ios', 'android', or 'desktop' */
export function getOS() {
  const userAgent = navigator.userAgent || navigator.vendor || (<any>window).opera;

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(<any>window).MSStream) {
    return 'ios';
  }
  return 'desktop';
}

