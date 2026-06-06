import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gallery } from 'ng-gallery';
import { TestComponent } from './tests/common';
import { img1, img2, img3 } from './tests/test-images';

describe('Navigation', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let gallery: Gallery;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.items.set([
      { src: img1 },
      { src: img2 },
      { src: img3 },
      { src: img1 },
      { src: img2 },
      { src: img3 },
      { src: img1 },
      { src: img2 },
      { src: img3 },
      { src: img1 },
      { src: img2 },
      { src: img3 },
    ]);
    component.scrollBehavior.set('auto');
    fixture.autoDetectChanges();

    gallery = component.gallery();
  });

  describe('Single item per view navigation', () => {
    it('should not exceed the maximum index, and log to console', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* empty */
      });
      const invalidIndex = 99;
      gallery.goTo({ index: invalidIndex });

      expect(consoleSpy).toHaveBeenCalledWith(
        `[NgGallery]: Unable to set the active item because the given index (${ invalidIndex }) is outside the items range!`
      );
      consoleSpy.mockRestore();
    });

    it('should move to next index', async () => {
      await vi.waitUntil(() => gallery.hasVisibleItems());

      gallery.goTo({ index: gallery.itemsCount() - 2 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(gallery.itemsCount() - 2));

      const lastIndex = gallery.itemsCount() - 1;
      gallery.next();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(lastIndex));

      // Verify it didn't loop to the first index
      gallery.next();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(lastIndex));
    });

    it('should move to prev index', async () => {
      await vi.waitUntil(() => gallery.hasVisibleItems());

      gallery.goTo({ index: 1 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(1));

      gallery.prev();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));

      // Verify it didn't loop to the last index
      gallery.prev();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));
    });

    it('should loop to the last index when loop is enabled', async () => {
      component.loop.set(true);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      gallery.prev();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(gallery.itemsCount() - 1));
    });

    it('should loop to the first index when loop is enabled', async () => {
      component.loop.set(true);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      gallery.goTo({ index: gallery.itemsCount() - 1 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(gallery.itemsCount() - 1));

      // Wait until scrolled to the first item
      gallery.next();
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));
    });

    it('should not loop when loop is disabled', async () => {
      await vi.waitUntil(() => gallery.hasVisibleItems());
      // Ensure we are at the last index
      const lastIndex = gallery.itemsCount() - 1;
      gallery.goTo({ index: lastIndex });

      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(lastIndex));

      // Try to move next with loop disabled
      gallery.next({ loop: false });

      // Index should remain at lastIndex because hasNext() is false
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(lastIndex));

      // Go back to 0
      gallery.goTo({ index: 0 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));

      // Try to move prev with loop disabled
      gallery.prev({ loop: false });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));
    });

    it('should move multiple steps when steps option is provided', async () => {
      await vi.waitUntil(() => gallery.hasVisibleItems());
      // Ensure we have enough items (e.g., 5 items: 0, 1, 2, 3, 4)
      expect(gallery.itemsCount()).toBeGreaterThanOrEqual(5);

      // Start at 0, move 2 steps -> should be 2
      gallery.next({ steps: 2 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(2));

      // Move another 2 steps -> should be 4
      gallery.next({ steps: 2 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(4));

      // Move back 3 steps -> should be 1
      gallery.prev({ steps: 3 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(1));
    });
  });

  describe('Multiple items per view navigation', () => {

    it('should not loop to the last index if first is not visible yet', async () => {
      component.loop.set(true);
      component.itemsPerView.set(3);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      gallery.goTo({ index: 2 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(2));

      // Since 3 itemsPerView, scroll to the first index makes activeIndex (first + 1)
      gallery.prev({ steps: 5 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(1));
    });

    it('should not loop to the first index if last is not visible yet', async () => {
      component.loop.set(true);
      component.itemsPerView.set(3);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      const beforeLastIndex = gallery.itemsCount() - 3;
      gallery.goTo({ index: beforeLastIndex });
      await vi.waitFor(() => {
        expect(gallery.activeIndex()).toBe(beforeLastIndex);
      });

      // Since 3 itemsPerView, scroll to the last index makes activeIndex (last - 1)
      gallery.next({ steps: 5 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(gallery.itemsCount() - 2));
    });

    it('[forceSnap] should not loop to the last index if start is not visible yet', async () => {
      component.forceSnap.set(true);
      component.loop.set(true);
      component.itemsPerView.set(3);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      const afterFirstIndex = 2;
      gallery.goTo({ index: afterFirstIndex });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(afterFirstIndex));

      // Since 3 itemsPerView, scroll to the last index makes activeIndex (last - 1)
      gallery.prev({ steps: 5 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(0));
    });

    it('[forceSnap] should not loop to the first index if last is not visible yet', async () => {
      component.forceSnap.set(true);
      component.loop.set(true);
      component.itemsPerView.set(3);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      const beforeLastIndex = gallery.itemsCount() - 3;
      gallery.goTo({ index: beforeLastIndex });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(beforeLastIndex));

      // Since 3 itemsPerView, scroll to the last index makes activeIndex (last - 1)
      gallery.next({ steps: 5 });
      await vi.waitFor(() => expect(gallery.activeIndex()).toBe(gallery.itemsCount() - 1));
    });

    it('should correctly calculate the last index based on itemsPerView', async () => {
      component.forceSnap.set(true);
      component.itemsPerView.set(3);
      await vi.waitUntil(() => gallery.hasVisibleItems());

      const lastPossibleIndex = gallery.itemsCount() - 1;
      gallery.goTo({ index: lastPossibleIndex });

      await vi.waitFor(() => {
        expect(gallery.hasNext()).toBe(false);
        expect(gallery.activeIndex()).toBe(lastPossibleIndex);
      });
    });
  });

  describe('Page navigation', () => {
    describe('with snapAlign=center', () => {
      it('[forceSnap][itemsSize] should go to last partially visible index on next page', async () => {
        component.steps.set('page');
        component.forceSnap.set(true);
        component.itemSize.set(120);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(0);

        // Test first page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(3));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(6));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 1));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 4));
      });

      it('should go to last partially visible index on next page', async () => {
        component.steps.set('page');
        component.itemSize.set(120);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(1);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(4));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(7));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 2));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 5));
      });

      it('[forceSnap][itemsPerView] should go to last partially visible index on next page', async () => {
        component.steps.set('page');
        component.forceSnap.set(true);
        component.itemsPerView.set(3);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(0);
        // Test first page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(3));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(6));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 1));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 4));
      });

      it('[itemsPerView] should go to last partially visible index on next page', async () => {
        component.steps.set('page');
        component.itemsPerView.set(3);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(1);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(4));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(7));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 2));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 5));
      });
    });

    describe('with snapAlign=start', () => {
      it('should go to last partially visible index on next page', async () => {
        component.snapAlign.set('start');
        component.steps.set('page');
        component.itemSize.set(120);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(0);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(3));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(6));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 4));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 6));
      });

      it('[itemsPerView] should go to last partially visible index on next page', async () => {
        component.snapAlign.set('start');
        component.steps.set('page');
        component.itemsPerView.set(3);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(0);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(3));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(6));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 3));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 6));
      });
    });

    describe('with snapAlign=end', () => {
      it('should go to last partially visible index on next page', async () => {
        component.snapAlign.set('end');
        component.steps.set('page');
        component.itemSize.set(120);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(3);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(5));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(8));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 1));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 4));
      });

      it('[itemsPerView] should go to last partially visible index on next page', async () => {
        component.snapAlign.set('end');
        component.steps.set('page');
        component.itemsPerView.set(3);
        await vi.waitUntil(() => gallery.hasVisibleItems());

        expect(gallery.activeIndex()).toBe(2);
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(5));

        // Test middle page to next page
        gallery.next();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(8));

        // Go to the last page and test prev page
        const count = gallery.itemsCount();
        gallery.goTo({ index: count - 1 });
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 1));
        gallery.prev();
        await vi.waitFor(() => expect(gallery.activeIndex()).toBe(count - 4));
      });
    });
  });
});
