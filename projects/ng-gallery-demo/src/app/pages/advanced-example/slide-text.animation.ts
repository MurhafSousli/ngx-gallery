import { trigger, style, transition, animate, state } from '@angular/animations';

export const slideInAnimation = trigger('slideAnimation', [
  state('in', style({ transform: 'translateY(0)', opacity: 1 })),
  transition(':enter', [
    style({ transform: 'translateY(-70%)', opacity: 0 }),
    animate('400ms ease-in')
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({ transform: 'translateY(-70%)', opacity: 0 }))
  ])
]);
