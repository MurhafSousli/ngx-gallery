import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryLoaderComponent } from './gallery-loader.component';

describe('GalleryLoaderComponent', () => {
  let component: GalleryLoaderComponent;
  let fixture: ComponentFixture<GalleryLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
