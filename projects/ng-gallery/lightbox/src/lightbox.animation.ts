import { animate, state, style, transition, trigger } from '@angular/animations';

export const lightboxAnimation = trigger('lightbox', [
  state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
  state('enter', style({transform: 'none'})),
  transition('* => enter', animate('{{startAnimationTime}}ms cubic-bezier(0, 0, 0.2, 1)',
    style({transform: 'none', opacity: 1}))),
  transition('* => void, * => exit',
    animate('{{exitAnimationTime}}ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0}))),
]);

