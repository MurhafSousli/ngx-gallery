import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GalleryItemData, GalleryThumbDef } from 'ng-gallery';
import { GalleryItemContext } from './gallery-item-def.directive';

@Component({
  template: `
    <div *galleryThumbDef="let data">{{ data | json }}</div>
  `,
  imports: [GalleryThumbDef, JsonPipe]
})
class TestComponent {
  galleryThumbDef = viewChild(GalleryThumbDef);
}

describe('GalleryThumbDef Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GalleryThumbDef, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directive and inject the TemplateRef', () => {
    expect(component.galleryThumbDef()).toBeTruthy();
    expect(component.galleryThumbDef().templateRef).toBeDefined();
  });

  it('should guard the template context type', () => {
    const context: GalleryItemContext<GalleryItemData> = {} as GalleryItemContext<GalleryItemData>;

    expect(GalleryThumbDef.ngTemplateContextGuard(component.galleryThumbDef(), context)).toBeTrue();
  });
});
