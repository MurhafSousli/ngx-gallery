import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBoxImagesComponent } from './light-box-images.component';

describe('LightBoxImagesComponent', () => {
  let component: LightBoxImagesComponent;
  let fixture: ComponentFixture<LightBoxImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightBoxImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBoxImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
