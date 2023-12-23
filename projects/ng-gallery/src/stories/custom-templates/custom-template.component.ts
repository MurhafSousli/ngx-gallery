import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule, GalleryItem, } from 'ng-gallery';
import { Observable } from 'rxjs';

/**
 * This section demonstrate how to extend the image template, like displaying a text over the image item
 */
@Component({
  selector: 'custom-templates-example',
  template: `
    <gallery [items]="items">
      <ng-container *galleryImageDef="let item">
        <div class="item-text">
          {{ item?.alt }}
        </div>
      </ng-container>
    </gallery>
  `,
  styles: [`
    .item-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 3em auto 0;
      width: 100%;
      max-width: 500px;
      padding: 20px 25px;
      text-align: justify;
      letter-spacing: 1px;
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
      background: #ffffffd9;
      color: black;
      border-radius: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GalleryModule]
})
export class CustomTemplateComponent {

  @Input() items: GalleryItem[];

}
