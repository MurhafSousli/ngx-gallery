import { trigger, animate, transition, style, query, group } from '@angular/animations';

export const fadeAnimation = trigger('sideAnimation', [

  transition('* => *', [

    query(':enter', [
        style({
          opacity: 0
        })
      ],
      {optional: true}
    ),
    query(':leave', animate('0.4s ease-in-out', style({
        opacity: 0
      })),
      {optional: true}
    ),
    query(':enter', animate('0.4s ease-in-out', style({
        opacity: 1
      })),
      {optional: true}
    )
  ])
]);
