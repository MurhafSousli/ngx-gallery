import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GalleryItemData, GalleryItemDef, GalleryItemContext } from 'ng-gallery';

@Component({
  template: `
    <div *galleryItemDef="let data">{{ data | json }}</div>
  `,
  imports: [GalleryItemDef, JsonPipe]
})
class TestComponent {
  galleryItemDef = viewChild(GalleryItemDef);
}

describe('GalleryItemDef Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directive and inject the TemplateRef', () => {
    expect(component.galleryItemDef()).toBeTruthy();
    expect(component.galleryItemDef().templateRef).toBeDefined();
  });

  it('should guard the template context type', () => {
    const context: GalleryItemContext<GalleryItemData> = {} as GalleryItemContext<GalleryItemData>;

    expect(GalleryItemDef.ngTemplateContextGuard(component.galleryItemDef(), context)).toBe(true);
  });
});
