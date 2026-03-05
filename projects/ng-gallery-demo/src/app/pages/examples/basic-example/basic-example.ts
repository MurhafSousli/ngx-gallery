import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GalleryComponent, GalleryItemDef } from 'ng-gallery';

@Component({
  selector: 'basic-example',
  template: `
    <gallery [items]="items" [style.color]="'white'">
      <div *galleryItemDef="let item">
        Test {{ item?.text }}
      </div>
    </gallery>
  `,
  imports: [GalleryComponent, GalleryItemDef],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicExampleComponent {
  items: any[] = [
    {
      text: 'Hello'
    },
    {
      text: 'Hello'
    }
  ]
}
