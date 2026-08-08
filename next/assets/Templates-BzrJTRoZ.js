import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,u as n}from"./blocks-DJ1APemM.js";import{a as r}from"./chunk-W22LQPXL-CChX7ad3.js";import{i,r as a}from"./react-NI1vexfW.js";function _createMdxContent(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{title:`Documentations/Item Templates`}),`
`,(0,o.jsx)(n.h1,{id:`item-templates`,children:`Item Templates`}),`
`,(0,o.jsx)(n.p,{children:`Use item template directives to control how gallery items are rendered.`}),`
`,(0,o.jsx)(n.p,{children:`The gallery supports three template directives:`}),`
`,(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:`Directive`}),(0,o.jsx)(n.th,{children:`Purpose`}),(0,o.jsx)(n.th,{children:`Required`})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:`*galleryItemDef`})}),(0,o.jsx)(n.td,{children:`Template for rendering gallery and thumbnail items`}),(0,o.jsx)(n.td,{children:`Yes`})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:`*galleryItemLoaderDef`})}),(0,o.jsx)(n.td,{children:`Template shown while an item is loading`}),(0,o.jsx)(n.td,{children:`No`})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:`*galleryItemErrorDef`})}),(0,o.jsx)(n.td,{children:`Template shown when an item fails to load`}),(0,o.jsx)(n.td,{children:`No`})]})]})]}),`
`,(0,o.jsx)(n.h2,{id:`shared-template-context`,children:`Shared Template Context`}),`
`,(0,o.jsx)(n.p,{children:`All item template directives expose the same template context:`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`let item`}),` — the current entry from the `,(0,o.jsx)(n.code,{children:`items`}),` input`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`index`}),` — item index`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`count`}),` — total number of items`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`state`}),` — `,(0,o.jsx)(n.code,{children:`'loading' | 'ready' | 'error'`})]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`active`}),` — whether this item is the currently snapped item (updates after movement ends).`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`anchor`}),` — whether this item is aligned with the snap anchor (updates in real-time during movement).`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`visible`}),` — whether the item is currently visible`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`first`}),` — whether it is the first item`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`last`}),` — whether it is the last item`]}),`
`]}),`
`,(0,o.jsx)(n.p,{children:`This means loader and error templates can access the same contextual information as the primary item template.`}),`
`,(0,o.jsx)(n.h2,{id:`primary-item-template-example`,children:`Primary Item Template Example`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <div *galleryItemDef="let item">
    <img galleryImage [src]="item.imgUrl" [alt]="img.alt"/>
  </div>
</gallery>
`})}),`
`,(0,o.jsxs)(n.blockquote,{children:[`
`,(0,o.jsxs)(n.p,{children:[`Learn more about `,(0,o.jsx)(n.a,{href:`?path=/docs/documentations-using-images--docs`,children:`Using Images`})]}),`
`]}),`
`,(0,o.jsx)(n.h2,{id:`mixed-content-example`,children:`Mixed Content Example`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <ng-container *galleryItemDef="let item">
    @if (item.type === 'image') {
      <img galleryImage [src]="item.src" [alt]="item.alt" />
    } @else if (item.type === 'video') {
      <video controls [poster]="item.poster" width="100%" height="100%">
        <source [src]="item.src" type="video/mp4" />
      </video>
    } @else {
      Other types
    }
  </ng-container>
</gallery>
`})}),`
`,(0,o.jsx)(n.h2,{id:`loader-and-error-templates`,children:`Loader and Error Templates`}),`
`,(0,o.jsx)(n.p,{children:`Use loader and error templates to customize item states inside each gallery item.`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

  <!-- loading indicator -->
  <div *galleryItemLoaderDef="let item; index as i">
    Loading item {{ i + 1 }}...
  </div>

  <!-- error fallback -->
  <div *galleryItemErrorDef="let item; index as i">
    ⚠️ Unable to load item {{ i + 1 }}
  </div>
</gallery>
`})}),`
`,(0,o.jsx)(n.h2,{id:`global-overlay-loader`,children:`Global Overlay Loader`}),`
`,(0,o.jsx)(n.p,{children:`If you want a single gallery-level loader instead of per-item state templates, use a projected slot.`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery #gallery="gallery" [items]="items">
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

  @if (gallery.activeItem().state() === 'loading') {
    <my-loader gallerySlot />
  }
</gallery>
`})}),`
`,(0,o.jsx)(n.p,{children:`Use this approach when the loading UI should stay fixed in the gallery layout rather than being rendered inside each item.`})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var o;function init_Templates(){return(init_Templates=e((()=>{o=r(),a(),n()})))()}init_Templates();export{MDXContent as default};