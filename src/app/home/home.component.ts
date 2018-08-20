import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="basic-container">
      <h2>Basic Example</h2>
      <div *ngIf="show">

        <gallery #gallery id="basic-test" fluid [items]="items" thumbPosition="top" thumbMode="free" (error)="onError($event)">
        </gallery>

        <button mat-button (click)="gallery.play()">Play</button>
        <button mat-button (click)="gallery.stop()">Stop</button>
      </div>
    </div>
    <button (click)="show= true">show</button>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  items: GalleryItem[];

  imageData = [
    {
      srcUrl: 'assets/img1.jpg',
      previewUrl: 'assets/img1.jpg'
    },
    {
      srcUrl: 'assets/img2.jpg',
      previewUrl: 'assets/img2.jpg',
    },
    {
      srcUrl: 'assets/img3.jpg',
      previewUrl: 'assets/img3.jpg',
    },
    {
      srcUrl: 'assets/img4.jpg',
      previewUrl: 'assets/img4.jpg',
    }
  ];

  ngOnInit() {
    this.items = this.imageData.map(item => {
      return new ImageItem({src: item.srcUrl, thumb: item.previewUrl});
    });
  }

  onError(e) {
    console.log('Test error', e);
  }

}
