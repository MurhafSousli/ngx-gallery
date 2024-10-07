import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryRef } from 'ng-gallery';
import { afterTimeout, TestComponent } from './common';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import 'hammerjs';

describe('Hammer slider directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: HTMLElement;
  let hammerSliderElement: DebugElement
  let hammerSliderDirective: HammerSliding;
  let galleryRef: GalleryRef;

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
    fixture.detectChanges();

    hammerSliderElement = fixture.debugElement.query(By.directive(HammerSliding));
    hammerSliderDirective = hammerSliderElement.injector.get(HammerSliding);
    nativeElement = hammerSliderElement.nativeElement;

    galleryRef = hammerSliderElement.injector.get(GalleryRef);
  });

  it('should create [hammerSlider] directive', () => {
    expect(hammerSliderDirective).toBeTruthy();
  });

  // TODO: Failed to simulate sliding events
  // fit('should trigger panstart and set sliding to true',async () => {
  //   // Create a custom event with properties expected by HammerJS
  //   fixture.detectChanges();
  //   await afterTimeout(1000);
  //
  //   // Trigger the event
  //   nativeElement.dispatchEvent(new Event('pan'));
  //
  //   // Assert that the sliding signal is set to true
  //   expect(hammerSliderDirective.sliding()).toBeTrue();
  // });
});
