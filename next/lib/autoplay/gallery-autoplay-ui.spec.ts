import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryAutoplayUI } from 'ng-gallery';

describe('Autoplay Component', () => {
  let fixture: ComponentFixture<GalleryAutoplayUI>;
  let component: GalleryAutoplayUI;

  beforeEach(async () => {
    fixture = TestBed.createComponent(GalleryAutoplayUI);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should create autoplay component with spinner progress', () => {
    expect(GalleryAutoplayUI).toBeTruthy();
    expect(component.mode()).toBe('spinner');

    const spinner: DebugElement = fixture.debugElement.query(By.css('.g-spinner'));
    expect(spinner).toBeDefined();
  });

  it('should display a progressbar', async () => {
    fixture.componentRef.setInput('mode', 'progressbar');
    fixture.detectChanges();
    expect(component.mode()).toBe('progressbar');

    const progressbar: DebugElement = fixture.debugElement.query(By.css('.g-progressbar'));
    expect(progressbar).toBeDefined();
  });
});
