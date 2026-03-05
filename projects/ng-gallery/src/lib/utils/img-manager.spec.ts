import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { GalleryRef } from '../services/gallery-ref';
import { ImgManager } from './img-manager';
import { ItemState } from '../models/item.model';

describe('ImgManager', () => {
  let service: ImgManager;
  let galleryRefMock: jasmine.SpyObj<GalleryRef>;
  let currIndexSubject: BehaviorSubject<number>;

  beforeEach(() => {
    currIndexSubject = new BehaviorSubject<number>(0);
    galleryRefMock = jasmine.createSpyObj('GalleryRef', ['currIndex']);
    (galleryRefMock['currIndex'] as any) = jasmine.createSpy().and.callFake(() => currIndexSubject.getValue());

    TestBed.configureTestingModule({
      providers: [
        ImgManager,
        { provide: GalleryRef, useValue: galleryRefMock }
      ]
    });

    service = TestBed.inject(ImgManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an image and trigger an update', (done: DoneFn) => {
    const state$ = new BehaviorSubject<ItemState>('success');
    const imgElement = document.createElement('img');
    const registry = { state$: state$.asObservable(), target: imgElement };

    service.addItem(0, registry);

    service.getActiveItem().subscribe((img) => {
      expect(img).toBe(imgElement);
      done();
    });
  });

  it('should delete an image and trigger an update with null', (done: DoneFn) => {
    const state$ = new BehaviorSubject<ItemState>('success');
    const imgElement = document.createElement('img');
    const registry = { state$: state$.asObservable(), target: imgElement };

    service.addItem(0, registry);
    service.deleteItem(0);

    service.getActiveItem().subscribe((img) => {
      expect(img).toBeNull(); // Expect null instead of an empty observable
      done();
    });
  });

  it('should return null if no image is registered for current index', (done: DoneFn) => {
    service.getActiveItem().subscribe((img) => {
      expect(img).toBeNull(); // Expect null instead of failing
      done();
    });
  });

  it('should switch to new active image when index changes', (done: DoneFn) => {
    const state1$ = new BehaviorSubject<ItemState>('success');
    const imgElement1 = document.createElement('img');
    service.addItem(0, { state$: state1$.asObservable(), target: imgElement1 });

    const state2$ = new BehaviorSubject<ItemState>('success');
    const imgElement2 = document.createElement('img');
    service.addItem(1, { state$: state2$.asObservable(), target: imgElement2 });

    currIndexSubject.next(1);

    service.getActiveItem().subscribe((img) => {
      expect(img).toBe(imgElement2);
      done();
    });
  });
});
