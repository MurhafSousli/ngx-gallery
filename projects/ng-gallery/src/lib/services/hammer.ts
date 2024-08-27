import { HammerGestureConfig } from '@angular/platform-browser';

export interface HammerInstance {
  on(eventName: string, callback?: Function): void;
  off(eventName: string, callback?: Function): void;
  destroy?(): void;
}

declare const Hammer: any;

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };

  options = { inputClass: Hammer.MouseInput };
}
