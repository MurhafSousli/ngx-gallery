import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,r,u as i}from"./blocks-JKEW4qnp.js";import{a}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as o,r as s}from"./react-NI1vexfW.js";import{i as c,n as l,r as u,t as d}from"./Counter.stories-BgA3g-l-.js";function _createMdxContent(e){let i={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...o(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t,{of:l}),`
`,(0,f.jsx)(i.h1,{id:`gallery-counter`,children:`Gallery Counter`}),`
`,(0,f.jsxs)(i.p,{children:[`The `,(0,f.jsx)(i.code,{children:`gallery-counter`}),` displays the current slide position relative to the total items (e.g., `,(0,f.jsx)(i.code,{children:`1 / 10`}),`).`]}),`
`,(0,f.jsx)(i.p,{children:`It automatically handles:`}),`
`,(0,f.jsxs)(i.ul,{children:[`
`,(0,f.jsxs)(i.li,{children:[(0,f.jsx)(i.strong,{children:`Internationalization:`}),` Numbers are formatted using the `,(0,f.jsx)(i.code,{children:`DecimalPipe`}),` based on the app's `,(0,f.jsx)(i.code,{children:`LOCALE_ID`}),`.`]}),`
`,(0,f.jsxs)(i.li,{children:[(0,f.jsx)(i.strong,{children:`RTL Support:`}),` Correctly displays the index/total ratio for Right-to-Left languages.`]}),`
`,(0,f.jsxs)(i.li,{children:[(0,f.jsx)(i.strong,{children:`Accessibility:`}),` The counter is marked as `,(0,f.jsx)(i.code,{children:`aria-live="polite"`}),` internally so screen readers announce index changes.`]}),`
`]}),`
`,(0,f.jsx)(i.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,f.jsx)(i.p,{children:`Simply drop the component inside the gallery.`}),`
`,(0,f.jsx)(i.pre,{children:(0,f.jsx)(i.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt">
  <gallery-counter/>
</gallery>
`})}),`
`,(0,f.jsx)(r,{of:d}),`
`,(0,f.jsxs)(i.p,{children:[`You can toggle the vertical alignment between `,(0,f.jsx)(i.code,{children:`top`}),` (default) and `,(0,f.jsx)(i.code,{children:`bottom`}),`.`]}),`
`,(0,f.jsx)(i.pre,{children:(0,f.jsx)(i.code,{className:`language-html`,children:`<gallery-counter align="bottom"/>
`})}),`
`,(0,f.jsx)(i.h2,{id:`custom-counter-template-example`,children:`Custom Counter Template Example`}),`
`,(0,f.jsxs)(i.p,{children:[`While the default component uses the `,(0,f.jsx)(i.code,{children:`/`}),` separator, you may want to provide a localized text string like `,(0,f.jsx)(i.code,{children:`Slide 1 of 12`}),`.`]}),`
`,(0,f.jsxs)(i.p,{children:[`When to use a Custom Template If you need a specific text format or custom styling,
bypass the `,(0,f.jsx)(i.code,{children:`gallery-counter`}),` component and use the `,(0,f.jsx)(i.code,{children:`gallerySlot`}),` directive directly with the gallery's public signals.`]}),`
`,(0,f.jsx)(r,{of:u}),`
`,(0,f.jsxs)(i.p,{children:[`For more info about `,(0,f.jsx)(i.code,{children:`gallerySlot`}),`, see the `,(0,f.jsx)(i.a,{href:`/docs/documentations-slot--docs`,children:`Gallery Slot`}),` page.`]}),`
`,(0,f.jsx)(i.h2,{id:`api`,children:`API`}),`
`,(0,f.jsx)(n,{of:d})]})}function MDXContent(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var f;function init_Counter(){return(init_Counter=e((()=>{f=a(),s(),i(),c()})))()}init_Counter();export{MDXContent as default};