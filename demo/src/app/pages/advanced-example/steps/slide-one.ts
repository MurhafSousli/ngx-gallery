import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { Gallery, GalleryRef } from '../../../gallery/core';

@Component({
  selector: 'slide-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="slide" fxLayout="column" fxLayoutAlign="start center">
      <h2>Big Winner is Ready for a Vacation!</h2>
      <form [formGroup]="form" (submit)="submit()" fxFlex fxLayout="column">
        <div fxFlex>
          <div>
            <mat-input-container>
              <input matInput placeholder="Name" formControlName="name" required>
              <mat-error *ngIf="submitted && !form.hasError('required')">
                Please enter your full name
              </mat-error>
            </mat-input-container>
          </div>
          <div>
            <mat-input-container>
              <input matInput placeholder="Age" formControlName="age" required>
              <mat-error *ngIf="submitted && !form.hasError('required')">
                Please enter your age
              </mat-error>
            </mat-input-container>
          </div>
        </div>
        <button mat-button color="accent" type="submit">Next</button>
      </form>
    </div>
  `,
  styles: [`
    .slide {
      width: 100%;
      height: 100%;
    }

    h2 {
      color: #3F51B5;
      margin-top: 2em;
    }

    button {
      margin-bottom: 2em;
    }
  `]
})
export class SlideOneComponent implements OnInit {
  submitted = false;
  form = new FormGroup({
    name: new FormControl(),
    age: new FormControl()
  });
  galleryRef: GalleryRef;
  @Input() data;

  constructor(private gallery: Gallery) {
  }

  ngOnInit() {
    this.galleryRef = this.gallery.ref(this.data.galleryId);
    this.galleryRef.state$.subscribe(state => {
      if (state.currIndex === this.data.index - 1) {
        this.form.controls.name.enable();
        this.form.controls.age.enable();
      } else {
        this.form.controls.name.disable();
        this.form.controls.age.disable();
      }
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.galleryRef.next();
    }
  }
}
