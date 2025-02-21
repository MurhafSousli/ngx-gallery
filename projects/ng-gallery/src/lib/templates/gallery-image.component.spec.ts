import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { GalleryRef, ImgRecognizer } from 'ng-gallery';
import { SliderItem } from '../slider/slider-item/slider-item';
import { GalleryImageComponent } from './gallery-image.component';
import { ImgManager } from '../utils/img-manager';

describe('GalleryImageComponent', () => {
  let component: GalleryImageComponent;
  let fixture: ComponentFixture<GalleryImageComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    const sliderItem = jasmine.createSpyObj('SliderItem', ['index', 'state']);
    (sliderItem['index'] as any) = jasmine.createSpy().and.callFake(() => signal(0));
    (sliderItem['state'] as any) = jasmine.createSpy().and.callFake(() => signal('loading'));

    await TestBed.configureTestingModule({
      imports: [GalleryImageComponent],
      providers: [
        provideNoopAnimations(),
        ImgRecognizer,
        ImgManager,
        GalleryRef,
        { provide: SliderItem, useValue: sliderItem }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryImageComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply imageState attribute correctly', () => {
    const nativeElement: HTMLElement = fixture.debugElement.nativeElement;

    component.state.set('loading');
    fixture.detectChanges();
    expect(nativeElement.getAttribute('imageState')).toBe('loading');

    component.state.set('success');
    fixture.detectChanges();
    expect(nativeElement.getAttribute('imageState')).toBe('success');

    component.state.set('failed');
    fixture.detectChanges();
    expect(nativeElement.getAttribute('imageState')).toBe('failed');
  });

  it('should set image source correctly', () => {
    fixture.componentRef.setInput('src', 'test-image.jpg');
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.src).toContain('test-image.jpg');
  });

  it('should apply loading attribute correctly', () => {
    fixture.componentRef.setInput('loadingAttr', 'lazy');
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.getAttribute('loading')).toBe('lazy');
  });

  it('should update state to success on image load', () => {
    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('load', {});
    fixture.detectChanges();
    expect(component.state()).toBe('success');
  });

  it('should update state to failed on image error', () => {
    spyOn(component.error, 'emit');
    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('error', new ErrorEvent('error'));
    fixture.detectChanges();
    expect(component.state()).toBe('failed');
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('should apply visibility correctly based on state when image is thumbnail', () => {
    fixture.componentRef.setInput('isThumbnail', true);
    component.state.set('loading');
    fixture.detectChanges();
    let img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.style.visibility).toBe('hidden');

    component.state.set('success');
    fixture.detectChanges();
    img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.style.visibility).toBe('visible');
  });

  it('should sanitize and set custom loader template', () => {
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
    fixture.componentRef.setInput('loadingIcon', '<div class="custom-loader"></div>');
    fixture.detectChanges();
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('<div class="custom-loader"></div>');
  });

  it('should sanitize and set custom error loading template', () => {
    component.state.set('failed');
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
    fixture.componentRef.setInput('loadingError', '<div class="custom-error"></div>');
    fixture.detectChanges();
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('<div class="custom-error"></div>');
    expect(component.errorTemplate()).toEqual(sanitizer.bypassSecurityTrustHtml('<div class="custom-error"></div>'));
  });

 it('should sanitize and set custom error icon template', () => {
    component.state.set('failed');
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
    fixture.componentRef.setInput('errorIcon', '<div class="svg-mock"></div>');
    fixture.detectChanges();
    expect(component.errorSvg()).toEqual(sanitizer.bypassSecurityTrustHtml('<div class="svg-mock"></div>'));
  });
});
