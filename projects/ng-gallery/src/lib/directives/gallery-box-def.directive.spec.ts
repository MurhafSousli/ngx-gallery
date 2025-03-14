import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GalleryBoxDef, GalleryStateContext } from 'ng-gallery';

@Component({
  template: `
    <div *galleryBoxDef="let data">{{ data | json }}</div>
  `,
  imports: [GalleryBoxDef, JsonPipe]
})
class TestComponent {
  galleryBoxDef = viewChild(GalleryBoxDef);
}

describe('GalleryBoxDef Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GalleryBoxDef, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directive and inject the TemplateRef', () => {
    expect(component.galleryBoxDef()).toBeTruthy();
    expect(component.galleryBoxDef().templateRef).toBeDefined();
  });

  it('should guard the template context type', () => {
    const context: GalleryStateContext = {};
    expect(GalleryBoxDef.ngTemplateContextGuard(component.galleryBoxDef(), context)).toBeTrue();
  });
});
