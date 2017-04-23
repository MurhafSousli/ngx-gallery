import { AnimationEntryMetadata } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';

export const animation: AnimationEntryMetadata = [
  trigger('imgIn', [
    state('none', style({ opacity: 1 })),
    state('slideRight', style({ transform: 'translateX(0)' })),
    state('slideLeft', style({ transform: 'translateX(0)' })),
    transition('slideLeft <=> *', [
      style({
        transform: 'translateX(100%)'
      }),
      animate('0.5s ease-in')
    ]),
    transition('slideRight <=> *', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
    ]),
    transition('fade <=> *', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-in')
    ]),
  ]),
  trigger('imgOut', [
    state('slideRight', style({ transform: 'translateX(100%)' })),
    state('slideLeft', style({ transform: 'translateX(-100%)' })),
    state('fade', style({ opacity: 0 })),
    state('none', style({ opacity: 1 })),
    transition('slideLeft <=> *', [
      style({
        transform: 'translateX(0)'
      }),
      animate('0.5s ease-in')
    ]),
    transition('slideRight <=> *', [
      style({
        transform: 'translateX(0)'
      }),
      animate('0.5s ease-in')
    ]),
    transition('fade <=> *', [
      style({
        opacity: 1
      }),
      animate('1s ease-in')
    ]),
  ]),
];
