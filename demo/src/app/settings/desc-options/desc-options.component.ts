import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryDescConfig} from '../../gallery';

@Component({
  selector: 'desc-options',
  templateUrl: './desc-options.component.html',
  styleUrls: ['./desc-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescOptionsComponent {

  @Input() config: GalleryDescConfig;
  @Output() value = new EventEmitter<GalleryDescConfig>();

  prevConfig: GalleryDescConfig = {};

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

  textChanged(e) {
    this.config.text = e;
    this.value.emit(this.config);
  }

  countChanged(e) {
    this.config.counter = e;
    this.value.emit(this.config);
  }

  positionChanged(e) {
    this.config.position = e;
    this.value.emit(this.config);
  }

  overlayChanged(e) {
    this.config.overlay = e;
    this.value.emit(this.config);
  }

  styleChanged(e) {
    this.config.style = e;
    this.value.emit(this.config);
  }

}


