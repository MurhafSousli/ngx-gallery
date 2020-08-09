import { Component, Input, ViewChild, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, of } from 'rxjs';
import { delay, finalize, map, take } from 'rxjs/operators';
import { NgScrollbar } from 'ngx-scrollbar';

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
  @Input() track = 'vertical';

  @ViewChild('codeEL', {read: ElementRef}) codeEl: ElementRef;
  @ViewChild(NgScrollbar) scrollable: NgScrollbar;

  constructor(private cd: ChangeDetectorRef, private platform: Platform) {
  }

  ngAfterViewInit() {
    // this.updateHeight();
  }

  // updateHeight() {
  //   if (!this.height && this.codeEl) {
  //     this.updateState({height: this.codeEl.nativeElement.offsetHeight + 'px'});
  //   } else {
  //     this.updateState({height: this.height + 'px'});
  //   }
  //   this.scrollable.update();
  // }

  private updateState(state) {
    this.state$.next({...this.state$.value, ...state});
    this.cd.detectChanges();
  }

  copy() {
    of(this.code).pipe(
      map((text: string) => {

        // Create a hidden textarea element
        const textArea: HTMLTextAreaElement = document.createElement('textarea') as HTMLTextAreaElement;
        textArea.value = text;
        document.body.appendChild(textArea);

        // highlight textarea to copy the text
        if (this.platform.IOS) {
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


