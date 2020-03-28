import { trigger, style, transition, animate, state } from '@angular/animations';

export const slideInAnimation = trigger('slideAnimation', [
  state('in', style({transform: 'translateY(0)', opacity: 1})),
  transition(':enter', [
    style({transform: 'translateY(-100%)', opacity: 0}),
    animate(400)
  ]),
  transition(':leave', [
    animate(400, style({transform: 'translateY(-100%)', opacity: 0}))
  ])
]);
