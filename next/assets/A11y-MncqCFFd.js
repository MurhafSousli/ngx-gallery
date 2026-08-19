import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./A11y.stories-ClPfbnPI.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Documentations/Accessibility`,of:l}),`
`,(0,u.jsx)(r.h1,{id:`accessibility`,children:`Accessibility`}),`
`,(0,u.jsx)(r.p,{children:`The gallery component provides several options to enhance its accessibility. You can customize the ARIA roles, labels, and role descriptions for the gallery container, items, and thumbnails.`}),`
`,(0,u.jsx)(r.h2,{id:`configuration`,children:`Configuration`}),`
`,(0,u.jsxs)(r.p,{children:[`You can provide global accessibility options using the `,(0,u.jsx)(r.code,{children:`provideGalleryA11yOptions`}),` function.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-ts`,children:`import { provideGalleryA11yOptions } from 'ng-gallery';

provideGalleryA11yOptions({
  containerLabel: 'Product Gallery',
  itemLabel: (index, total) => \`Image \${index + 1} of \${total}\`
});
`})}),`
`,(0,u.jsx)(r.h2,{id:`options`,children:`Options`}),`
`,(0,u.jsx)(n,{of:s}),`
`,(0,u.jsx)(r.h2,{id:`default-aria-structure`,children:`Default ARIA Structure`}),`
`,(0,u.jsx)(r.p,{children:`The following example demonstrates how the gallery translates configuration options into the DOM.`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<ng-gallery role="region"
            aria-label="Gallery"
            aria-roledescription="carousel">
  <g-slider>
    <ul class="g-slider-content">
      <li aria-roledescription="slide"
          aria-current="{ current }"
          aria-label="{ index + 1 } / { total }">
        <img src="..." alt="..." />
      </li>
    </ul>
  </g-slider>

  <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
    Slide \${ current } of \${ total }
  </div>

  <gallery-thumbs role="group"
                  aria-label="Gallery thumbnails"
                  aria-roledescription="carousel">
    <g-slider>
      <ul class="g-slider-content">
        <li>
          <button aria-roledescription="thumbnail"
                  aria-current="{ current }"
                  aria-label="Go to { index + 1 }">
            <img src="..." alt="" />
          </button>
        </li>
      </ul>
    </g-slider>
  </gallery-thumbs>
</ng-gallery>
`})})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_A11y(){return(init_A11y=e((()=>{u=i(),o(),r(),c()})))()}init_A11y();export{MDXContent as default};