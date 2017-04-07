import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBoxNavComponent } from './light-box-nav.component';

describe('LightBoxNavComponent', () => {
  let component: LightBoxNavComponent;
  let fixture: ComponentFixture<LightBoxNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightBoxNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBoxNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
