import { animate, state, style, transition, trigger, AnimationTriggerMetadata, } from '@angular/animations';

export const lightboxAnimations: { readonly slideLightbox: AnimationTriggerMetadata; } = {

  slideLightbox: trigger('slideLightbox', [
    state('enter', style({ transform: 'none', opacity: 1 })),
    state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
    state('exit', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
    transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
  ])
};
