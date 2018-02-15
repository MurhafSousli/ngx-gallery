import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { GalleryItemComponent } from '@ngx-gallery/core';
import { GalleryItemComponent } from '../gallery/core';
import { MatDialog } from '@angular/material';
import { GalleryMockDialog } from '../shared/gallery-mock-dialog';

@Component({
  selector: 'image-item-pro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <i class="g-loading" *ngIf="loading"></i>
    <div class="slide-pro-pic" [lazyImage]="data.src" (loading)="loading = $event"></div>
    <div class="slide-pro-info" fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px">
      <div fxLayout fxLayoutAlign="center center">
        <button mat-icon-button (click)="openDialog('thumb_up', 'Liked!', 'likes')">
          <mat-icon class="likes">thumb_up</mat-icon>
        </button>
        {{data.likes | nFormatter}}
      </div>
      <div fxLayout fxLayoutAlign="center center">
        <button mat-icon-button (click)="openDialog('favorite', 'Photo has been added to your favorites!', 'favs')">
          <mat-icon class="favs">favorite</mat-icon>
        </button>
        {{data.favorites | nFormatter}}
      </div>
      <div fxLayout fxLayoutAlign="center center">
        <button mat-icon-button>
          <mat-icon class="views">remove_red_eye</mat-icon>
        </button>
        {{data.views | nFormatter}}
      </div>
      <div fxFlex fxLayout fxLayoutAlign="flex-end center">
        <img [src]="data.userImage"> {{data.username}}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 12px;
    }

    .slide-pro-pic {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
    }

    .slide-pro-info {
      position: absolute;
      width: 100%;
      bottom: 0;
      color: white;
      flex: 1;
      padding: 1em 2em;
      background-color: rgba(0, 0, 0, 0.5);
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  `]
})
export class ImageItemProComponent implements GalleryItemComponent {
  loading: boolean;
  @Input() data: any;

  constructor(private dialog: MatDialog) {
  }

  openDialog(icon: string, text: string, className: string) {
    this.dialog.open(GalleryMockDialog, {
      data: {
        icon: icon,
        text: text,
        className: className
      }
    });
  }
}
