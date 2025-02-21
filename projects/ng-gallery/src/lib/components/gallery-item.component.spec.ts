import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { GalleryConfig, GalleryRef } from 'ng-gallery';
import { GalleryItemData } from 'ng-gallery';
import { GalleryItemComponent } from './gallery-item.component';

describe('GalleryItemComponent', () => {
  let component: GalleryItemComponent;
  let fixture: ComponentFixture<GalleryItemComponent>;
  let mockGalleryRef: jasmine.SpyObj<GalleryRef>;

  beforeEach(async () => {
    mockGalleryRef = jasmine.createSpyObj('GalleryRef', ['config']);
    const config: WritableSignal<GalleryConfig> = signal({});
    mockGalleryRef.config.and.returnValue(config());

    await TestBed.configureTestingModule({
      imports: [GalleryItemComponent],
      providers: [
        { provide: GalleryRef, useValue: mockGalleryRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryItemComponent);
    component = fixture.componentInstance;
    // Assume the item has an image
    component.isItemContainImage = true;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set inputs correctly', () => {
    const mockData: GalleryItemData = { src: 'test.jpg' };
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('count', 5);
    fixture.componentRef.setInput('currIndex', 2);
    fixture.componentRef.setInput('index', 2);
    fixture.detectChanges();

    expect(component.data()).toEqual(mockData);
    expect(component.count()).toBe(5);
    expect(component.currIndex()).toBe(2);
    expect(component.index()).toBe(2);
  });

  it('should compute active state correctly', () => {
    fixture.componentRef.setInput('currIndex', 2);
    fixture.componentRef.setInput('index', 2);
    fixture.detectChanges();
    expect(component.active()).toBeTrue();

    fixture.componentRef.setInput('currIndex', 1);
    fixture.detectChanges();
    expect(component.active()).toBeFalse();
  });

  it('should compute itemContext correctly', () => {
    const mockData: GalleryItemData = { src: 'test.jpg' };
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('index', 0);
    fixture.componentRef.setInput('count', 3);
    fixture.componentRef.setInput('currIndex', 1);
    fixture.detectChanges();

    const context = component.itemContext();
    expect(context.index).toBe(0);
    expect(context.count).toBe(3);
    expect(context.first).toBeTrue();
    expect(context.last).toBeFalse();
    expect(context.active).toBeFalse();
  });

  it('should update state if item does not contain an image', () => {
    component.isItemContainImage = false;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.state()).toBe('success');
  });

  it('should set correct attributes and class', () => {
    fixture.componentRef.setInput('index', 2);
    fixture.componentRef.setInput('count', 3);
    fixture.componentRef.setInput('currIndex', 2);
    component.state.set('loading');
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.getAttribute('galleryIndex')).toBe('2');
    expect(element.getAttribute('itemState')).toBe('loading');
    expect(element.classList.contains('g-active-item')).toBeTrue();
  });
});
