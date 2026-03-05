// import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { GalleryRef } from 'ng-gallery';
// import { getObservableFromContext, TestComponent } from './common';
// import { filter, firstValueFrom, fromEvent, Observable } from 'rxjs';
// import { AutoHeight } from '../observers/auto-height';
// import { ImgManager } from '../utils/img-manager';
//
// fdescribe('Auto-height directive', () => {
//   let fixture: ComponentFixture<TestComponent>;
//   let autoHeightDirective: AutoHeight;
//   let galleryRef: GalleryRef;
//   let manager: ImgManager;
//   let autoHeightDebugElement: DebugElement;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NoopAnimationsModule,
//         TestComponent
//       ],
//       providers: [
//         { provide: ComponentFixtureAutoDetect, useValue: true }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(TestComponent);
//     autoHeightDebugElement = fixture.debugElement.query(By.directive(AutoHeight));
//     autoHeightDirective = autoHeightDebugElement.injector.get(AutoHeight);
//     galleryRef = autoHeightDebugElement.injector.get(GalleryRef);
//     manager = autoHeightDebugElement.injector.get(ImgManager);
//     fixture.detectChanges();
//   });
//
//   it('should create [autoHeight] directive', () => {
//     expect(autoHeightDirective).toBeTruthy();
//   });
//
//   fit('should observe when items become visible as soon as possible', async () => {
//     TestBed.flushEffects();
//     await firstValueFrom(galleryRef.afterItemsVisible);
//
//     galleryRef.next('smooth');
//
//     const transitionEnd$ = fromEvent(autoHeightDebugElement.nativeElement, 'transitionend');
//
//     expect(autoHeightDirective.isResizing()).toBeTrue();
//
//     // const img: HTMLImageElement = await firstValueFrom(manager.getActiveItem());
//     // const el: HTMLElement = autoHeightDebugElement.nativeElement;
//     //
//     // await firstValueFrom(transitionEnd$);
//     // expect(autoHeightDirective.isResizing()).toBeFalse();
//     // expect(el.parentElement.parentElement.parentElement.clientHeight).toBe(img.naturalHeight);
//   });
// });
