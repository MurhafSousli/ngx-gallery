import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryRef } from 'ng-gallery';
import { afterTimeout, TestComponent } from './common';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';

describe('Smooth scroll directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: HTMLElement;
  let smoothScrollDirective: SmoothScroll;
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

    const smoothScrollElement: DebugElement = fixture.debugElement.query(By.directive(SmoothScroll));
    smoothScrollDirective = smoothScrollElement.injector.get(SmoothScroll);
    nativeElement = smoothScrollElement.nativeElement;

    galleryRef = smoothScrollElement.injector.get(GalleryRef);
  });

  it('should create [smoothScroll] directive', () => {
    expect(smoothScrollDirective).toBeTruthy();
  });

  it('should toggle scrolling class with scrolling signal', async () => {
    expect(smoothScrollDirective.scrolling()).toBe(false);
    expect(nativeElement.classList.contains('g-scrolling')).toBeFalse();

    // Trigger index change
    galleryRef.set(1, 'auto');
    fixture.detectChanges();
    expect(smoothScrollDirective.scrolling()).toBe(true);
    expect(nativeElement.classList.contains('g-scrolling')).toBeTrue();

    await afterTimeout(20);
    expect(smoothScrollDirective.scrolling()).toBe(false);
    expect(nativeElement.classList.contains('g-scrolling')).toBeFalse();
  });

  it('should scroll instantly to target item on gallery index changes', async () => {
    const scrollToSpy: jasmine.Spy = spyOn(smoothScrollDirective, 'scrollTo').and.callThrough();
    await afterTimeout(16);

    // Trigger index change
    galleryRef.set(1, 'auto');

    expect(smoothScrollDirective.scrolling()).toBe(true);

    await afterTimeout(50);

    const pos: SmoothScrollOptions = {
      start: 500,
      behavior: 'auto'
    };

    expect(scrollToSpy).toHaveBeenCalledWith(pos);
    expect(galleryRef.currIndex()).toBe(1);
    expect(smoothScrollDirective.scrolling()).toBe(false);
  });

  it('should scroll smoothly to target item on gallery index changes', async () => {
    const scrollToSpy: jasmine.Spy = spyOn(smoothScrollDirective, 'scrollTo').and.callThrough();
    await afterTimeout(16);

    // Trigger index change
    galleryRef.set(2, 'smooth');

    expect(smoothScrollDirective.scrolling()).toBe(true);

    await afterTimeout(500);

    const pos: SmoothScrollOptions = {
      start: 1000,
      behavior: 'smooth'
    };
    expect(scrollToSpy).toHaveBeenCalledWith(pos);
    expect(galleryRef.currIndex()).toBe(2);
    expect(smoothScrollDirective.scrolling()).toBe(false);
  });

});
