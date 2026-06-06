import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Dir, Direction } from '@angular/cdk/bidi';
import {
  Gallery,
  GalleryNav,
  GalleryModule,
  GalleryItemData,
  GalleryOrientation
} from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';

@Component({
  imports: [GalleryModule, Dir],
  template: `
    <gallery [dir]="dir()"
             [items]="items"
             [scrollBehavior]="scrollBehavior()"
             [style.width.px]="width"
             [style.height.px]="height"
             [loop]="loop()"
             [orientation]="orientation()">
      <div *galleryItemDef="let item"></div>

      <gallery-nav [showDisabledButtons]="showDisabledButtons()"
                   [outside]="outside()"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];
  width: number = 500;
  height: number = 300;

  scrollBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  showDisabledButtons: WritableSignal<boolean> = signal(false);
  dir: WritableSignal<Direction> = signal('ltr');
  orientation: WritableSignal<GalleryOrientation> = signal('horizontal');
  loop: WritableSignal<boolean> = signal(false);
  outside: WritableSignal<boolean> = signal(false);

  gallery: Signal<Gallery> = viewChild(Gallery);
}

describe('Gallery nav component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let navComponent: GalleryNav;
  let navComponentElement: DebugElement;
  let navElement: HTMLElement;
  let gallery: Gallery;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.scrollBehavior.set('auto');
    fixture.autoDetectChanges();
    gallery = component.gallery();

    navComponentElement = fixture.debugElement.query(By.directive(GalleryNav));
    navComponent = navComponentElement.injector.get(GalleryNav);
    navElement = navComponentElement.nativeElement;
    await vi.waitUntil(() => gallery.hasVisibleItems());
  });

  it('should create gallery-nav component', () => {
    expect(navComponent).toBeDefined();
  });

  it('should place inside', async () => {
    const nextButton: Element = fixture.debugElement.query(By.css('[galleryNavButton="next"]')).parent.nativeElement;
    const prevButton: Element = fixture.debugElement.query(By.css('[galleryNavButton="prev"]')).parent.nativeElement;

    expect(nextButton).toHaveStyle({
      gridArea: 'center',
      justifySelf: 'end',
      alignSelf: 'center'
    });
    expect(prevButton).toHaveStyle({
      gridArea: 'center',
      justifySelf: 'start',
      alignSelf: 'center'
    });

    component.orientation.set('vertical');
    fixture.detectChanges();

    expect(nextButton).toHaveStyle({
      gridArea: 'center',
      justifySelf: 'center',
      alignSelf: 'end'
    });
    expect(prevButton).toHaveStyle({
      gridArea: 'center',
      justifySelf: 'center',
      alignSelf: 'start'
    });
  });

  it('should place outside', () => {
    component.outside.set(true);
    fixture.detectChanges();
    const nextButton: Element = fixture.debugElement.query(By.css('[galleryNavButton="next"]')).parent.nativeElement;
    const prevButton: Element = fixture.debugElement.query(By.css('[galleryNavButton="prev"]')).parent.nativeElement;

    expect(nextButton).toHaveStyle({
      gridArea: 'end',
      justifySelf: 'center',
      alignSelf: 'center'
    });
    expect(prevButton).toHaveStyle({
      gridArea: 'start',
      justifySelf: 'center',
      alignSelf: 'center'
    });

    component.orientation.set('vertical');
    fixture.detectChanges();

    expect(nextButton).toHaveStyle({
      gridArea: 'bottom',
      justifySelf: 'center',
      alignSelf: 'center'
    });
    expect(prevButton).toHaveStyle({
      gridArea: 'top',
      justifySelf: 'center',
      alignSelf: 'center'
    });
  });

  it('should set dir attribute', () => {
    expect(navElement).toHaveAttribute('dir', 'ltr');

    component.dir.set('rtl');
    fixture.detectChanges();

    expect(navElement).toHaveAttribute('dir', 'rtl');
  });

  it('should navigate to next item on next button click', () => {
    const clickSpy = vi.spyOn(gallery, 'next');

    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    button.nativeElement.dispatchEvent(new MouseEvent('click'));

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should navigate to previous item on previous button click', () => {
    component.loop.set(true);
    fixture.detectChanges();

    const clickSpy = vi.spyOn(gallery, 'prev');

    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));
    button.nativeElement.dispatchEvent(new MouseEvent('click'));

    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it('should hide the previous button from the DOM when loop is disabled at the start boundary', async () => {
    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));
    await vi.waitFor(() => expect(button.nativeElement).toHaveStyle({ visibility: 'hidden' }));
  });

  it('should hide the next button from the DOM when loop is disabled at the end boundary', async () => {
    gallery.goTo({ index: gallery.itemsCount() - 1 });
    await vi.waitUntil(() => gallery.activeIndex() === gallery.items().length - 1);

    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    await vi.waitFor(() => expect(button.nativeElement).toHaveStyle({ visibility: 'hidden' }));
  });

  it('should disable the previous button at the start boundary when loop is inactive', () => {
    component.showDisabledButtons.set(true);
    fixture.detectChanges();

    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));
    expect(button.componentInstance).toBeDefined();
    expect(button.nativeElement).toHaveAttribute('disabled');
  });

  it('should disable the next button at the end boundary when loop is inactive', async () => {
    component.showDisabledButtons.set(true);
    gallery.goTo({ index: gallery.itemsCount() - 1 });
    await vi.waitUntil(() => gallery.activeIndex() === gallery.items().length - 1);

    const button: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    expect(button.componentInstance).toBeDefined();
    expect(button.nativeElement).toHaveAttribute('disabled');
  });
});
