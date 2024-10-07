import {
  Directive,
  inject,
  effect,
  untracked,
  input,
  ElementRef,
  InputSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { ImgManager } from './img-manager';
import { SliderItem } from '../components/items/items';

@Directive({
  standalone: true,
  selector: 'img[galleryImage]',
  host: {
    '(load)': 'item.state.set("success")',
    '(error)': 'item.state.set("failed")'
  }
})
export class ImgRecognizer {

  private readonly nativeElement: HTMLImageElement = inject(ElementRef<HTMLImageElement>).nativeElement;

  private readonly manager: ImgManager = inject(ImgManager);

  readonly item: SliderItem = inject(SliderItem);

  index: InputSignal<number> = input(null, { alias: 'galleryImage' });

  constructor() {
    if (this.item) {
      // Mark the gallery-item component as an image item
      this.item.isItemContainImage = true;
    } else {
      throw new Error('[NgGallery]: galleryImage directive should be only used inside gallery item templates!')
    }

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const index: number = this.index();

      untracked(() => {
        if (index != null) {
          this.manager.addItem(index, {
            state$: this.item.state$,
            target: this.nativeElement
          });

          onCleanup(() => this.manager.deleteItem(index));
        }
      });
    });
  }
}
