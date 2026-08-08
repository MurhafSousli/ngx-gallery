import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-DJ1APemM.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Styling.stories-DNUN3Fg5.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{of:s}),`
`,(0,u.jsx)(r.h1,{id:`-lightbox-customizing-styles`,children:`🎨 Lightbox Customizing Styles`}),`
`,(0,u.jsxs)(r.p,{children:[`Our lightbox uses modern CSS features like `,(0,u.jsx)(r.code,{children:`@starting-style`}),` and `,(0,u.jsx)(r.code,{children:`allow-discrete`}),` to provide smooth, high-performance transitions.
You can customize every aspect of the entry and exit animations using CSS Variables or our convenient SCSS mixin.`]}),`
`,(0,u.jsx)(r.h2,{id:`css-variables-reference`,children:`CSS Variables Reference`}),`
`,(0,u.jsxs)(r.p,{children:[`All lightbox animation and appearance properties can be customized via CSS variables. They follow the `,(0,u.jsx)(r.code,{children:`--lb-*`}),` naming convention.`]}),`
`,(0,u.jsx)(n,{of:l}),`
`,(0,u.jsx)(r.hr,{}),`
`,(0,u.jsx)(r.h2,{id:`usage-examples-scss`,children:`Usage Examples (SCSS)`}),`
`,(0,u.jsxs)(r.p,{children:[`Use the `,(0,u.jsx)(r.code,{children:`ng-lightbox-overrides`}),` mixin within your styles file (e.g., `,(0,u.jsx)(r.code,{children:`styles.scss`}),`) to apply these presets or create your own.`]}),`
`,(0,u.jsx)(r.h3,{id:`1-the-soft-slide-up`,children:`1. The "Soft Slide Up"`}),`
`,(0,u.jsx)(r.p,{children:`A clean, modern entrance that slides the lightbox up from the bottom of the screen with a subtle scale effect.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  .custom-lightbox-slide {
    @include gallery.ng-lightbox-overrides((
      duration-in: 400ms,
      duration-out: 300ms,
      timing-in: ease-out,
      timing-out: ease-in,
      translate-start: 0 100px,
      scale-start: 1,
      opacity-start: 0
    ));
  }
}
`})}),`
`,(0,u.jsx)(r.h3,{id:`2-the-dramatic-zoom`,children:`2. The "Dramatic Zoom"`}),`
`,(0,u.jsx)(r.p,{children:`A high-impact "pop-in" effect with a bouncy timing function and backdrop blur animation.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  .custom-lightbox-zoom {
    @include gallery.ng-lightbox-overrides((
      duration-in: 600ms,
      duration-out: 400ms,
      timing-in: cubic-bezier(0.34, 1.56, 0.64, 1),
      timing-out: cubic-bezier(0.25, 0.46, 0.45, 0.94),
      scale-start: 0.2,
      translate-start: 0 0,
      opacity-start: 0,
      backdrop-color: rgba(0, 0, 0, 0.85),
      backdrop-filter: blur(12px) saturate(160%),
      backdrop-filter-start: blur(0px) saturate(100%)
    ));
  }
}
`})}),`
`,(0,u.jsx)(r.h3,{id:`3-the-ghost-fade`,children:`3. The "Ghost Fade"`}),`
`,(0,u.jsx)(r.p,{children:`A minimal, subtle transition that focuses purely on transparency without movement.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  .custom-lightbox-fade {
    @include gallery.ng-lightbox-overrides((
      duration-in: 250ms,
      duration-out: 250ms,
      timing-in: linear,
      timing-out: linear,
      scale-start: 1,
      translate-start: 0 0,
      rotate-start: 0deg,
      opacity-start: 0,
      backdrop-filter-start: blur(12px) saturate(160%),
      backdrop-filter: blur(12px) saturate(160%)
    ));
  }
}
`})}),`
`,(0,u.jsx)(r.h3,{id:`4-the-rotate--scale`,children:`4. The "Rotate & Scale"`}),`
`,(0,u.jsx)(r.p,{children:`A playful rotation combined with scale transformation for a fun, eye-catching entrance.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  .custom-lightbox-rotate {
    @include gallery.ng-lightbox-overrides((
      duration-in: 500ms,
      duration-out: 400ms,
      timing-in: cubic-bezier(0.68, -0.55, 0.27, 1.55),
      timing-out: ease-in,
      scale-start: 0.7,
      rotate-start: -15deg,
      opacity-start: 0,
      backdrop-color: rgba(0, 0, 0, 0.6),
      backdrop-filter: blur(8px) saturate(120%)
    ));
  }
}
`})}),`
`,(0,u.jsx)(r.h3,{id:`5-the-asymmetric-animation`,children:`5. The "Asymmetric Animation"`}),`
`,(0,u.jsx)(r.p,{children:`Different durations for opening (fast) and closing (slow) for a more interactive feel.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  .custom-lightbox-asymmetric {
    @include gallery.ng-lightbox-overrides((
      duration-in: 200ms,        // Quick entrance
      duration-out: 600ms,       // Slow exit
      timing-in: cubic-bezier(0.16, 1, 0.3, 1),
      timing-out: cubic-bezier(0.7, 0, 0.84, 0),
      scale-start: 0.85,
      translate-start: 0 -50px,
      opacity-start: 0
    ));
  }
}
`})}),`
`,(0,u.jsx)(r.hr,{}),`
`,(0,u.jsx)(r.h2,{id:`applying-custom-styles`,children:`Applying Custom Styles`}),`
`,(0,u.jsx)(r.h3,{id:`method-1-class-based-recommended`,children:`Method 1: Class-based (Recommended)`}),`
`,(0,u.jsx)(r.p,{children:`Add your custom class to the lightbox element:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<ng-template lightbox #lightbox="lightbox" panelClass="custom-lightbox-slide">
  <gallery [items]="items">
    <!-- gallery content -->
  </gallery>
</ng-template>
`})}),`
`,(0,u.jsx)(r.h3,{id:`method-2-css-file`,children:`Method 2: CSS File`}),`
`,(0,u.jsx)(r.p,{children:`Define in your global CSS:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`.custom-lightbox {
  --lb-duration-in: 400ms;
  --lb-duration-out: 300ms;
  --lb-timing-in: ease-out;
  --lb-scale-start: 0.9;
  --lb-translate-start: 0, 30px;
  --lb-opacity-start: 0;
}
`})})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Styling(){return(init_Styling=e((()=>{u=i(),o(),r(),c()})))()}init_Styling();export{MDXContent as default};