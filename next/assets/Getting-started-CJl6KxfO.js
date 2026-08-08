import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,u as n}from"./blocks-DJ1APemM.js";import{a as r}from"./chunk-W22LQPXL-CChX7ad3.js";import{i,r as a}from"./react-NI1vexfW.js";function _createMdxContent(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{title:`Documentations/Getting Started`}),`
`,(0,o.jsx)(n.h1,{id:`getting-started`,children:`Getting Started`}),`
`,(0,o.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,o.jsx)(n.p,{children:`Install the package via npm:`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-bash`,children:`npm i ng-gallery@next @angular/cdk
`})}),`
`,(0,o.jsx)(n.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,o.jsxs)(n.p,{children:[`To get started, pass an array of items to the `,(0,o.jsx)(n.code,{children:`<gallery>`}),` component. Use `,(0,o.jsx)(n.code,{children:`*galleryItemDef`}),` to define the item template.`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <div *galleryItemDef="let item; index as i">
    Slide {{ i + 1 }}
  </div>
</gallery>
`})}),`
`,(0,o.jsxs)(n.blockquote,{children:[`
`,(0,o.jsxs)(n.p,{children:[`Learn more about `,(0,o.jsx)(n.a,{href:`?path=/docs/documentations-item-templates--docs`,children:`Item Templates`}),`.`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{id:`features-and-layout-extensions`,children:`Features and Layout Extensions`}),`
`,(0,o.jsx)(n.p,{children:`You can extend the gallery interface by nesting specific components and directives inside the main container`}),`
`,(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:`UI Components`})}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`<gallery-nav>`}),`: Renders next and previous navigation arrows.`]}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`<gallery-thumbs>`}),`: Adds a thumbnail navigation track. Requires a `,(0,o.jsx)(n.code,{children:`*galleryItemDef`}),` to render the thumb images.`]}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`<gallery-counter>`}),`: Displays the current slide index and total count.`]}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`gallerySlot`}),`: Used for "static" content (like watermarks or static buttons) that stays in place while the slides transition.`]}),`
`,(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:`Example:`})}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item"
       galleryImage
       [src]="item.src"
       [alt]="item.alt"/>

  <div gallerySlot>Optional Fixed Template</div>

  <gallery-nav/>

  <gallery-counter/>

  <gallery-thumbs>
    <img *galleryItemDef="let item"
         galleryImage
         [src]="item.thumb"
         [alt]="item.alt + '_thumb'"/>
  </gallery-thumbs>
</gallery>
`})}),`
`,(0,o.jsxs)(n.p,{children:[`You can provide global settings for your gallery using `,(0,o.jsx)(n.code,{children:`provideGalleryOptions`}),` within your application providers.`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-ts`,children:`import { provideGalleryOptions } from 'ng-gallery';

export const appConfig = {
  providers: [
    provideGalleryOptions({
      // Configuration options
    })
  ]
};
`})})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var o;function init_Getting_started(){return(init_Getting_started=e((()=>{o=r(),a(),n()})))()}init_Getting_started();export{MDXContent as default};