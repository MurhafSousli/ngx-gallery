import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable, Subject, animationFrameScheduler } from 'rxjs';
import { map } from 'rxjs/operators';

interface RadialProgressState {
  value: number;
  radius: number;
  circumference: number;
}

@Component({
  selector: 'radial-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="radial-progress" *ngIf="state$ | async; let state"
         [attr.width]="size"
         [attr.height]="size"
         [attr.viewBox]="'0 0 ' + size + ' ' + size">

      <circle class="radial-progress-meter"
              [attr.r]="state.radius"
              [attr.cx]="size / 2"
              [attr.cy]="size / 2"
              [attr.stroke-width]="strokeWidth"/>

      <circle class="radial-progress-value"
              [attr.r]="state.radius"
              [attr.cx]="size / 2"
              [attr.cy]="size / 2"
              [attr.stroke-width]="strokeWidth"
              [attr.stroke-dashoffset]="state.value || state.circumference"
              [attr.stroke-dasharray]="state.circumference"/>
    </svg>
  `,
  styles: [`
    .radial-progress {
      transform: rotate(-90deg);
    }

    .radial-progress-meter,
    .radial-progress-value {
      fill: none;
    }

    .radial-progress-meter {
      stroke: white;
      opacity: 0.3;
    }

    .radial-progress-value {
      transition: all linear 200ms;
      stroke: white;
      stroke-linecap: round;
    }
  `]
})
export class RadialProgressComponent implements OnChanges {

  smoothAnimation$ = new Subject();
  state$: Observable<RadialProgressState>;
  @Input() size = 60;
  @Input() strokeWidth = 3;
  @Input() value: number;

  constructor() {
    this.state$ = this.smoothAnimation$.pipe(
      map(() => {
        const progress = this.value / 100;
        const radius = (this.size / 2) * 90 / 100;
        const circumference = 2 * Math.PI * radius;
        const value = circumference * (1 - progress);
        return {radius, circumference, value};
      })
    );
  }

  ngOnChanges() {
    animationFrameScheduler.schedule(() => this.smoothAnimation$.next());
  }

}
