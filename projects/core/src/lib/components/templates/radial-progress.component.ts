import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'radial-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.mode]': 'mode',
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter'
  },
  template: `
    <svg class="radial-progress"
         [style.width.px]="diameter"
         [style.height.px]="diameter"
         [attr.viewBox]="viewBox"
         preserveAspectRatio="xMidYMid meet"
         focusable="false">

      <circle class="radial-progress-meter"
              cx="50%"
              cy="50%"
              [attr.r]="circleRadius"
              [style.stroke-width.%]="circleStrokeWidth"/>

      <circle class="radial-progress-value"
              cx="50%"
              cy="50%"
              [attr.r]="circleRadius"
              [style.stroke-dashoffset.px]="strokeDashOffset"
              [style.stroke-dasharray.px]="strokeCircumference"
              [style.stroke-width.%]="circleStrokeWidth"/>
    </svg>
  `
})
export class RadialProgressComponent {

  @Input() mode: 'determinate' | 'indeterminate' = 'determinate';
  @Input() value = 0;
  @Input() diameter = 60;
  @Input() strokeWidth = 3;

  /** The radius of the spinner, adjusted for stroke width. */
  get circleRadius() {
    return (this.diameter - this.strokeWidth) / 2;
  }

  /** The view box of the spinner's svg element. */
  get viewBox() {
    const viewBox = this.circleRadius * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }

  /** The stroke circumference of the svg circle. */
  get strokeCircumference(): number {
    return 2 * Math.PI * this.circleRadius;
  }

  /** The dash offset of the svg circle. */
  get strokeDashOffset() {
    if (this.mode === 'determinate') {
      return this.strokeCircumference * (100 - this.value) / 100;
    }

    // In fallback mode set the circle to 60% and rotate it with CSS.
    if (this.mode === 'indeterminate') {
      return this.strokeCircumference * 0.4;
    }

    return null;
  }

  /** Stroke width of the circle in percent. */
  get circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }

}
