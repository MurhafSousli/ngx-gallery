import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GalleryItemData, GalleryImageDef } from 'ng-gallery';
import { GalleryItemContext } from './gallery-item-def.directive';

@Component({
  template: `
    <div *galleryImageDef="let data">{{ data | json }}</div>
  `,
  imports: [GalleryImageDef, JsonPipe]
})
class TestComponent {
  galleryImageDef = viewChild(GalleryImageDef);
}

describe('GalleryImageDef Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GalleryImageDef, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directive and inject the TemplateRef', () => {
    expect(component.galleryImageDef()).toBeTruthy();
    expect(component.galleryImageDef().templateRef).toBeDefined();
  });

  it('should guard the template context type', () => {
    const context: GalleryItemContext<GalleryItemData> = {} as GalleryItemContext<GalleryItemData>;

    expect(GalleryImageDef.ngTemplateContextGuard(component.galleryImageDef(), context)).toBeTrue();
  });
});
