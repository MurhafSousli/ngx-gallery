import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
// import { Gallery, GalleryRef } from '../../../gallery/core';

@Component({
  selector: 'slide-two',
  preserveWhitespaces: false,
  template: `
    <div class="slide" fxLayout="column" fxLayoutAlign="start center">
      <h2>Select your vacation type:</h2>
      <form fxFlex>
        <mat-radio-group name="vacations" [(ngModel)]="selectedVacation"
                         [disabled]="(galleryRef.state$ | async).currIndex !== data.index - 1">
          <p *ngFor="let vacation of vacations">
            <mat-radio-button value="{{vacation}}">{{vacation}}</mat-radio-button>
          </p>
        </mat-radio-group>
      </form>
      <div fxLayout fxLayoutGap="10px">
        <button mat-button color="accent" (click)="back()">Back</button>
        <button mat-button color="accent" (click)="submit()">Next</button>
      </div>
    </div>
  `,
  styles: [`
    .slide {
      width: 100%;
      height: 100%;
    }

    h2 {
      margin-top: 2em;
      color: #3F51B5;
    }

    button {
      margin-bottom: 2em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideTwoComponent implements OnInit {
  selectedVacation = 'Sightseeing';
  vacations = [
    'Sightseeing',
    'Play with Nature',
    'Rest & Relaxation',
    'Planned Intensive Experiences'
  ];
  galleryRef: GalleryRef;
  @Input() data;

  constructor(private gallery: Gallery) {
  }

  ngOnInit() {
    this.galleryRef = this.gallery.ref(this.data.galleryId);
  }

  submit() {
    this.galleryRef.next();
  }

  back() {
    this.galleryRef.prev();
  }
}
