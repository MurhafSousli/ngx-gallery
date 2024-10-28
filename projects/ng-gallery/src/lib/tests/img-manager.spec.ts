import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { TestComponent } from './common';
import { SliderComponent } from '../components/slider/slider';
import { HorizontalAdapter, VerticalAdapter } from '../components/adapters';
import { GalleryComponent } from 'ng-gallery';
import { ImgManager } from '../utils/img-manager';

describe('Img Manager', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let imgManager: ImgManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TestComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const galleryDebugElement: DebugElement = fixture.debugElement.query(By.directive(GalleryComponent));
    imgManager = galleryDebugElement.injector.get(ImgManager);
  });

  it('should create img manager service', () => {
    expect(imgManager).toBeTruthy();
  });

  it('should get the active item state', () => {
    expect(imgManager).toBeTruthy();
  });

  it('should add new item images when new items are loaded', () => {
    expect(imgManager).toBeTruthy();
  });

  it('should delete items images when array is empty', () => {
    expect(imgManager).toBeTruthy();
  });
});
