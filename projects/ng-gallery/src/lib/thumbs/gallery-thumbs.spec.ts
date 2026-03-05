import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Gallery, GalleryDock, GalleryModule, GalleryItemData, GalleryThumbs } from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';
import { Slider } from '../slider/slider';
import { IntersectionSensor } from '../observers/intersection-sensor';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery [items]="items" [style.width.px]="width()" [style.height.px]="height()">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>
      <gallery-thumbs [position]="position()"
                      [floating]="floating()"
                      [itemSize]="itemSize()"
                      [thickness]="thickness()"
                      [disableScroll]="disableScroll()"
                      [detach]="detach()">
        <button *galleryItemDef="let item" galleryThumbClick>thumb</button>
      </gallery-thumbs>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1, thumb: img1 },
    { src: img2, thumb: img2 },
    { src: img3, thumb: img3 }
  ];
  width: WritableSignal<number> = signal(500);
  height: WritableSignal<number> = signal(300);

  scrollBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  position: WritableSignal<GalleryDock> = signal('bottom');
  floating: WritableSignal<boolean> = signal(false);
  disabled: WritableSignal<boolean> = signal(false);
  disableScroll: WritableSignal<boolean> = signal(false);
  itemSize: WritableSignal<number> = signal(60);
  thickness: WritableSignal<number> = signal(60);
  detach: WritableSignal<boolean> = signal(false);

  gallery: Signal<Gallery> = viewChild(Gallery);
}

describe('Gallery thumbs component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let thumbsComponent: GalleryThumbs;
  let gallery: Gallery;
  let sliderComponent: Slider;
  let thumbsElement: HTMLElement;
  let intersectionSensor: IntersectionSensor;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    const thumbsComponentElement: DebugElement = fixture.debugElement.query(By.directive(GalleryThumbs));
    thumbsComponent = thumbsComponentElement.injector.get(GalleryThumbs);
    thumbsElement = thumbsComponentElement.nativeElement;

    const intersectionSensorElement: DebugElement = fixture.debugElement.query(By.directive(IntersectionSensor));
    intersectionSensor = intersectionSensorElement.injector.get(IntersectionSensor);

    const sliderComponentElement: DebugElement = thumbsComponentElement.query(By.directive(Slider));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  // ### Host Binding Tests

  it('should create gallery thumbs and have default signal values', () => {
    expect(thumbsComponent).toBeDefined();
    expect(thumbsComponent.position()).toBe('bottom');
    expect(thumbsComponent.orientation()).toBe('horizontal');
    expect(thumbsComponent.floating()).toBeFalsy();
    expect(thumbsComponent.disableScroll()).toBeFalsy();

    expect(thumbsElement).not.toHaveAttribute('floating');
    expect(thumbsElement).not.toHaveAttribute('scrollDisabled');
    fixture.detectChanges();
  });

  it('should sync thumbnails navigation state from main navigation state', async () => {
    await vi.waitFor(() => {
      expect(thumbsComponent.navigationState()).toEqual({
        index: 0,
        source: 'init',
        behavior: 'auto'
      });
    });

    // Trigger index change in the main slider
    gallery.goTo({ index: 2, behavior: 'auto' });

    await vi.waitFor(() => {
      expect(thumbsComponent.navigationState()).toEqual({
        index: 2,
        source: 'api',
        behavior: 'auto'
      });
    });

    // Mimic a scroll by forcing the active index to change, this triggers a sync navigation source in the main slider
    (intersectionSensor.stableIndex as WritableSignal<number>).set(1);
    await vi.waitFor(() => {
      expect(thumbsComponent.navigationState()).toEqual({
        source: 'api',
        index: 1
      });
    });
  });

  it('should initialize thumbnails navigation state from initial index when detached', async () => {
    component.detach.set(true);
    await vi.waitUntil(() => gallery.hasVisibleItems());
    // Trigger index change in the main slider
    gallery.goTo({ index: 2, behavior: 'auto' });

    await vi.waitFor(() => {
      expect(gallery.activeIndex()).toBe(2);
    });

    expect(thumbsComponent.navigationState()).toEqual({
      source: 'init',
      behavior: 'auto',
      index: 0
    });
  });

  it('should set thumbnails width and height styles', () => {
    component.itemSize.set(150);
    component.thickness.set(80);
    fixture.detectChanges();

    expect(thumbsComponent.renderedItems()[0].nativeElement).toHaveStyle({
      width: '150px',
      height: '80px'
    });
  });

  it('should update host attributes for boolean signals', () => {
    component.floating.set(true);
    component.disabled.set(true);
    component.disableScroll.set(true);
    fixture.detectChanges();

    expect(thumbsElement).toHaveAttribute('floating', '');
    expect(thumbsElement).toHaveAttribute('scrollDisabled', '');
  });

  // ### CSS Logic & Layout Tests
  const positionTable = [
    { pos: 'top', expectedOrient: 'horizontal' },
    { pos: 'bottom', expectedOrient: 'horizontal' },
    { pos: 'start', expectedOrient: 'vertical' },
    { pos: 'end', expectedOrient: 'vertical' },
  ];

  it.each(positionTable)('should set orientation to $expectedOrient and position to $pos',
    async ({ pos, expectedOrient }) => {
      component.position.set(pos as GalleryDock);
      fixture.detectChanges();

      expect(thumbsComponent.orientation()).toBe(expectedOrient);
      expect(thumbsElement).toHaveAttribute('position', pos);
      expect(thumbsElement).toHaveStyle({
        gridArea: pos,
        zIndex: '1'
      });
    }
  );

  const floatingTable = [
    { pos: 'top', align: 'start', justify: 'center', orient: 'horizontal' },
    { pos: 'bottom', align: 'end', justify: 'center', orient: 'horizontal' },
    { pos: 'start', align: 'center', justify: 'start', orient: 'vertical' },
    { pos: 'end', align: 'center', justify: 'end', orient: 'vertical' },
  ];

  it.each(floatingTable)(
    'should apply correct floating styles for position: $pos',
    async ({ pos, align, justify, orient }) => {
      component.position.set(pos as GalleryDock);
      component.floating.set(true);
      fixture.detectChanges();

      expect(thumbsComponent.orientation()).toBe(orient);
      expect(thumbsElement).toHaveAttribute('floating');
      expect(thumbsElement).toHaveStyle({
        zIndex: '2',
        gridArea: 'center',
        alignSelf: align,
        justifySelf: justify
      });
    }
  );

  // ### Interaction & Template Tests

  it('should render correct number of thumb buttons', () => {
    expect(thumbsComponent.renderedItems().length).toBe(component.items.length);
  });

  it('should call gallery.set when a thumb is clicked', () => {
    const clickSpy = vi.spyOn(gallery, 'goTo');
    const button = thumbsComponent.renderedItems()[1].nativeElement.firstElementChild as HTMLButtonElement;
    button.click();
    expect(clickSpy).toHaveBeenCalledWith({ index: 1 });
  });

  it('should disable thumb slider scroll', () => {
    component.disableScroll.set(true);
    fixture.detectChanges();
    expect(thumbsElement).toHaveAttribute('scrollDisabled');
    expect(sliderComponent.nativeElement).toHaveStyle({
      overflow: 'hidden'
    });

    sliderComponent.nativeElement.scrollLeft = 100;
    expect(sliderComponent.nativeElement.scrollLeft).toBe(0);
  });
});
