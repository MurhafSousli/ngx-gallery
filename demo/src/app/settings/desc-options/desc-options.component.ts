import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryDescriptionConfig} from '../../gallery';

@Component({
  selector: 'desc-options',
  templateUrl: './desc-options.component.html',
  styleUrls: ['./desc-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescOptionsComponent {

  @Input() config: GalleryDescriptionConfig;
  @Output() value = new EventEmitter<GalleryDescriptionConfig>();

  prevConfig: GalleryDescriptionConfig = {};

  positionOptions = [
    'top',
    'bottom'
  ];

  enabledChanged(e) {
    if (e) {
      this.config = this.prevConfig;
      this.value.emit(this.config);
    } else {
      this.prevConfig = this.config;
      this.value.emit(false);
    }
  }

}
