import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  selector: 'auto-detect-example',
  templateUrl: './auto-detect-example.component.html',
  styleUrls: ['./auto-detect-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDetectExampleComponent {

  code: any;
  images$ = this._pixabay.getImages('camera');

  constructor(private _pixabay: Pixabay) {
    this.code = code;
  }

}

const code = `<div class="grid" gallerize innerHtml="{{htmlThatHasImages}}"></div>
<!-- OR -->
<div class="grid" gallerize="galleryId" selector=".my-img-class">
  <img class="lightbox-img" *ngFor="let item of items" src="{{item.src}}">
</div>`;
