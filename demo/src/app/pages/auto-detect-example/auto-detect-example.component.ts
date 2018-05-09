import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'auto-detect-example',
  templateUrl: './auto-detect-example.component.html',
  styleUrls: ['./auto-detect-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class AutoDetectExampleComponent {

  code: any;
  images$ = this.shared.getImages('camera');

  constructor(public shared: SharedService) {
    this.code = code;
  }

}

const code = `<div class="grid" gallerize innerHtml="{{htmlThatHasImages}}"></div>
<!-- OR -->
<div class="grid" gallerize="galleryId" forClass="lightbox-img">
  <img class="lightbox-img" *ngFor="let item of items" src="{{item.src}}">
</div>`;
