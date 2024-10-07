// import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { GalleryItemComponent } from '../components/gallery-item.component';
// import { TestComponent } from './common';
// import { SliderResizeObserver } from '../observers/slider-resize-observer.directive';
// import { DebugElement } from '@angular/core';
//
// describe('Resize directive', () => {
//   let fixture: ComponentFixture<TestComponent>;
//   let component: TestComponent;
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
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should detect if gallery is resized', () => {
//     const resizeDebugElement: DebugElement = fixture.debugElement.query(By.directive(SliderResizeObserver));
//     expect(resizeDebugElement).toBeTruthy();
//   });
// });
