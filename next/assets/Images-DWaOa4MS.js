import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,u as n}from"./blocks-DJ1APemM.js";import{a as r}from"./chunk-W22LQPXL-CChX7ad3.js";import{i,r as a}from"./react-NI1vexfW.js";function _createMdxContent(e){let n={code:`code`,h1:`h1`,h3:`h3`,p:`p`,pre:`pre`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{title:`Documentations/Using Images`}),`
`,(0,o.jsx)(n.h1,{id:`using-images`,children:`Using Images`}),`
`,(0,o.jsxs)(n.p,{children:[`The `,(0,o.jsx)(n.code,{children:`galleryImage`}),` directive is applied to `,(0,o.jsx)(n.code,{children:`<img>`}),` elements within a `,(0,o.jsx)(n.code,{children:`galleryItemDef`}),`. It handles layout styling and
synchronization between the browser's native loading events and the gallery's internal Signal-based state.`]}),`
`,(0,o.jsx)(n.h3,{id:`usage`,children:`Usage`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item"
       galleryImage
       [src]="item.src"
       [alt]="img.alt"/>
</gallery>
`})}),`
`,(0,o.jsx)(n.h3,{id:`image-fit-customization`,children:`Image Fit Customization`}),`
`,(0,o.jsxs)(n.p,{children:[`Control the image `,(0,o.jsx)(n.code,{children:`object-fit`}),` via Sass overrides:`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-css`,children:`@include gallery.ng-gallery-overrides((
  item-image-size: 'cover',
  thumb-image-size: 'contain'
));
`})}),`
`,(0,o.jsxs)(n.p,{children:[`Or with CSS variables `,(0,o.jsx)(n.code,{children:`--g-item-image-size`}),` and `,(0,o.jsx)(n.code,{children:`--g-thumb-image-size`}),`.`]}),`
`,(0,o.jsxs)(n.h3,{id:`the-directive-is-also-compatible-with-ngoptimizedimage`,children:[`The directive is also compatible with `,(0,o.jsx)(n.code,{children:`NgOptimizedImage`})]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items" [itemSize]="500" [style.height.px]="300">
  <img *galleryItemDef="let item"
       galleryImage
       [ngSrc]="item.src"
       [placeholder]="item.placeholder"
       width="500"
       height="300"
       [alt]="img.alt"/>
</gallery>
`})}),`
`,(0,o.jsx)(n.p,{children:`Or`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item"
       galleryImage
       [ngSrc]="item.src"
       [placeholder]="item.placeholder"
       fill
       [alt]="img.alt"/>
</gallery>
`})})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var o;function init_Images(){return(init_Images=e((()=>{o=r(),a(),n()})))()}init_Images();export{MDXContent as default};