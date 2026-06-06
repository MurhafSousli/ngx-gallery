import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  Gallery,
  GalleryModule,
  GalleryItemData,
  GalleryThumbs,
  SliderItem,
  provideGalleryA11yOptions
} from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';
import { defaultOptions } from './a11y.default';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery [items]="items()"
             [style.width.px]="width()"
             [style.height.px]="height()"
             [itemSize]="itemSize()"
             loop
             scrollBehavior="auto"
             [autoplay]="autoplay()">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>
      <gallery-thumbs scrollBehavior="auto">
        <button *galleryItemDef="let item" galleryThumbClick>thumb</button>
      </gallery-thumbs>
      <gallery-nav/>
    </gallery>
  `
})
export class TestComponent {
  items: WritableSignal<GalleryItemData[]> = signal([
    { src: img1, thumb: img1 },
    { src: img2, thumb: img2 },
    { src: img3, thumb: img3 },
    { src: img1, thumb: img1 },
    { src: img2, thumb: img2 },
    { src: img3, thumb: img3 }
  ]);
  width: WritableSignal<number> = signal(500);
  height: WritableSignal<number> = signal(300);
  itemSize: WritableSignal<number | 'page'> = signal(null);
  autoplay: WritableSignal<boolean> = signal(false);
  gallery: Signal<Gallery> = viewChild.required(Gallery);
}

describe('Accessibility (A11y)', () => {
  describe('Standard attributes', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let gallery: Gallery;
    let galleryThumbs: GalleryThumbs;
    let galleryElement: HTMLElement;
    let liveRegion: HTMLElement;
    let galleryThumbsElement: HTMLElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
      gallery = component.gallery();

      const galleryComponentElement: DebugElement = fixture.debugElement.query(By.directive(Gallery));
      galleryElement = galleryComponentElement.nativeElement;

      const thumbsComponentElement: DebugElement = fixture.debugElement.query(By.directive(GalleryThumbs));
      galleryThumbsElement = thumbsComponentElement.nativeElement;
      galleryThumbs = thumbsComponentElement.componentInstance;

      await vi.waitUntil(() => gallery.hasVisibleItems());
      liveRegion = galleryElement.querySelector('.sr-only');
    });

    it('should set a11y attributes', () => {
      expect(galleryElement).toHaveAttribute('role', 'region');
      expect(galleryElement).toHaveAttribute('aria-label', 'Gallery');
      expect(galleryElement).toHaveAttribute('aria-roledescription', 'carousel');

      expect(liveRegion).toHaveAttribute('role', 'status');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');

      expect(galleryThumbsElement).toHaveAttribute('role', 'group');
      expect(galleryThumbsElement).toHaveAttribute('aria-label', 'Gallery thumbnails');
      expect(galleryThumbsElement).toHaveAttribute('aria-roledescription', 'carousel');

      gallery.renderedItems().forEach((item: SliderItem) => {
        expect(item.nativeElement).not.toHaveAttribute('role');
        expect(item.nativeElement).toHaveAttribute('aria-roledescription', 'slide');
        expect(item.nativeElement).toHaveAttribute('aria-label', `${ item.index() + 1 } / ${ item.count() }`);
        if (item.active()) {
          expect(item.nativeElement).toHaveAttribute('aria-current', 'true');
        } else {
          expect(item.nativeElement).not.toHaveAttribute('aria-current');
        }
      });

      galleryThumbs.renderedItems().forEach((item: SliderItem) => {
        expect(item.nativeElement).not.toHaveAttribute('role');
        expect(item.nativeElement).not.toHaveAttribute('aria-roledescription');
        expect(item.nativeElement).not.toHaveAttribute('aria-label');
        expect(item.nativeElement).not.toHaveAttribute('aria-current');

        const button = item.nativeElement.querySelector('button');
        expect(button).not.toHaveAttribute('role');
        expect(button).toHaveAttribute('aria-roledescription', 'thumbnail');
        expect(button).toHaveAttribute('aria-label', `Go to slide ${ item.index() + 1 }`);
        if (item.active()) {
          expect(button).toHaveAttribute('aria-current', 'true');
        } else {
          expect(button).not.toHaveAttribute('aria-current');
        }
      });
    });

    async function validateNavigationButtonsAttributes(prevButton: Element, nextButton: Element) {
      gallery.goTo({ index: 0 });
      await vi.waitFor(() => {
        expect(prevButton).toHaveAttribute('aria-label', defaultOptions.lastItemLabel);
        expect(nextButton).toHaveAttribute('aria-label', defaultOptions.nextItemLabel);
      });

      gallery.goTo({ index: 1 });
      await vi.waitFor(() => {
        expect(prevButton).toHaveAttribute('aria-label', defaultOptions.firstItemLabel);
      });

      // Go to slide before last slide
      gallery.goTo({ index: gallery.itemsCount() - 2 });
      await vi.waitFor(() => {
        expect(prevButton).toHaveAttribute('aria-label', defaultOptions.prevItemLabel);
        expect(nextButton).toHaveAttribute('aria-label', defaultOptions.lastItemLabel);
      });

      gallery.goTo({ index: gallery.itemsCount() - 1 });
      await vi.waitFor(() => {
        expect(nextButton).toHaveAttribute('aria-label', defaultOptions.firstItemLabel);
      });
    }

    it('should set navigation a11y attributes', async () => {
      fixture.detectChanges();
      const prevButton: Element = fixture.nativeElement.querySelector('.g-nav-prev');
      const nextButton: Element = fixture.nativeElement.querySelector('.g-nav-next');

      await validateNavigationButtonsAttributes(prevButton, nextButton);

      component.itemSize.set('page');
      fixture.detectChanges();
      await validateNavigationButtonsAttributes(prevButton, nextButton);
    });

    it('should suppress Live-region when autoplay activated', async () => {
      component.autoplay.set(true);
      fixture.autoDetectChanges();

      const liveRegion = galleryElement.querySelector('.sr-only');
      expect(liveRegion).toHaveAttribute('aria-live', 'off');

      component.autoplay.set(false);
      fixture.autoDetectChanges();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('A11y support when disabled', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let gallery: Gallery;
    let galleryThumbs: GalleryThumbs;
    let galleryElement: HTMLElement;
    let liveRegion: HTMLElement;

    let galleryThumbsElement: HTMLElement;

    beforeEach(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideGalleryA11yOptions(false)
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
      gallery = component.gallery();

      const galleryComponentElement: DebugElement = fixture.debugElement.query(By.directive(Gallery));
      galleryElement = galleryComponentElement.nativeElement;

      const thumbsComponentElement: DebugElement = fixture.debugElement.query(By.directive(GalleryThumbs));
      galleryThumbsElement = thumbsComponentElement.nativeElement;
      galleryThumbs = thumbsComponentElement.componentInstance;

      await vi.waitUntil(() => gallery.hasVisibleItems());
      liveRegion = galleryElement.querySelector('.sr-only');
    });

    it('should remove all a11y attributes if disabled', () => {
      expect(galleryElement).not.toHaveAttribute('role');
      expect(galleryElement).not.toHaveAttribute('aria-label');
      expect(galleryElement).not.toHaveAttribute('aria-roledescription');

      expect(liveRegion).toBeFalsy();

      expect(galleryThumbsElement).not.toHaveAttribute('role');
      expect(galleryThumbsElement).not.toHaveAttribute('aria-label');
      expect(galleryThumbsElement).not.toHaveAttribute('aria-roledescription');

      gallery.renderedItems().forEach((item: SliderItem) => {
        expect(item.nativeElement).not.toHaveAttribute('role');
        expect(item.nativeElement).not.toHaveAttribute('aria-roledescription');
        expect(item.nativeElement).not.toHaveAttribute('aria-label');
        expect(item.nativeElement).not.toHaveAttribute('aria-current');
      });

      galleryThumbs.renderedItems().forEach((item: SliderItem) => {
        expect(item.nativeElement).not.toHaveAttribute('role');
        expect(item.nativeElement).not.toHaveAttribute('aria-roledescription');
        expect(item.nativeElement).not.toHaveAttribute('aria-label');
        expect(item.nativeElement).not.toHaveAttribute('aria-current');

        const button = item.nativeElement.querySelector('button');
        expect(button).not.toHaveAttribute('role');
        expect(button).not.toHaveAttribute('aria-roledescription');
        expect(button).not.toHaveAttribute('aria-label');
        expect(button).not.toHaveAttribute('aria-current');
      });
    });
  });

  describe('Live-region specifically disabled', () => {
    it('should disable live-region', async () => {
      TestBed.configureTestingModule({
        providers: [
          provideGalleryA11yOptions({ liveRegion: false })
        ]
      });

      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;
      fixture.autoDetectChanges();

      const gallery = component.gallery();
      await vi.waitUntil(() => gallery.hasVisibleItems());

      const galleryElement = fixture.debugElement.query(By.directive(Gallery)).nativeElement;
      const liveRegion = galleryElement.querySelector('.sr-only');

      expect(liveRegion).toBeFalsy();
    });
  });
});
