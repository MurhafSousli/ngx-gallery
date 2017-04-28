import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryBulletConfig} from '../../gallery';

@Component({
  selector: 'bullets-options',
  templateUrl: './bullets-options.component.html',
  styleUrls: ['./bullets-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletsOptionsComponent {

  @Input() config: GalleryBulletConfig;
  @Output() value = new EventEmitter<GalleryBulletConfig>();

  prevConfig: GalleryBulletConfig = {};

  positionOptions = [
    'left',
    'top',
    'right',
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

  positionChanged(e) {
    this.config.position = e;
    this.value.emit(this.config);
  }

  styleChanged(e) {
    this.config.style = e;
    this.value.emit(this.config);
  }
}
