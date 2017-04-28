import { transition, state, trigger, style, animate } from '@angular/animations';
export const animation = [
  trigger('imgAnimate', [
    state('none', style({ opacity: 1 })),
    transition('fade <=> *', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-in')
    ]),
  ])
];
// export const animation: AnimationEntryMetadata = [
//   trigger('imgIn', [
//     state('none', style({ opacity: 1 })),
//     state('slideRight', style({ transform: 'translate3d(0, 0, 0)' })),
//     state('slideLeft', style({ transform: 'translate3d(0, 0, 0)' })),
//     transition('slideLeft <=> *', [
//       style({
//         transform: 'translate3d(100%, 0, 0)'
//       }),
//       animate('0.5s ease-in')
//     ]),
//     transition('slideRight <=> *', [
//       style({
//         transform: 'translate3d(-100%, 0, 0)'
//       }),
//       animate('0.5s ease-in')
//     ]),
//     transition('fade <=> *', [
//       style({
//         opacity: 0
//       }),
//       animate('0.5s ease-in')
//     ]),
//   ]),
//   trigger('imgOut', [
//     state('slideRight', style({ transform: 'translate3d(100%, 0, 0)' })),
//     state('slideLeft', style({ transform: 'translate3d(-100%, 0, 0)' })),
//     state('fade', style({ opacity: 0 })),
//     state('none', style({ opacity: 1 })),
//     transition('slideLeft <=> *', [
//       style({
//         transform: 'translate3d(0, 0, 0)'
//       }),
//       animate('0.5s ease-in')
//     ]),
//     transition('slideRight <=> *', [
//       style({
//         transform: 'translate3d(0, 0, 0)'
//       }),
//       animate('0.5s ease-in')
//     ]),
//     transition('fade <=> *', [
//       style({
//         opacity: 1
//       }),
//       animate('1s ease-in')
//     ]),
//   ]),
// ];
