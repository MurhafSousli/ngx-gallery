import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,r,u as i}from"./blocks-DJ1APemM.js";import{a}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as o,r as s}from"./react-NI1vexfW.js";import{i as c,n as l,t as u}from"./Navigation Button.stories-BJlWWqbh.js";import{i as d,n as f,r as p,t as m}from"./Navigation.stories-C-PLzdLz.js";function _createMdxContent(e){let i={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,strong:`strong`,...o(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t,{of:f}),`
`,(0,h.jsx)(i.h1,{id:`navigation`,children:`Navigation`}),`
`,(0,h.jsxs)(i.p,{children:[`The `,(0,h.jsx)(i.code,{children:`<gallery-nav>`}),` component adds "Next" and "Previous" controls to your gallery.`]}),`
`,(0,h.jsx)(i.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,h.jsx)(i.p,{children:`Add the component inside your gallery container:`}),`
`,(0,h.jsx)(i.pre,{children:(0,h.jsx)(i.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item" [src]="item.src" [alt]="item.alt">
  <gallery-nav/>
</gallery>
`})}),`
`,(0,h.jsx)(i.h2,{id:`behavioral-options`,children:`Behavioral Options`}),`
`,(0,h.jsx)(i.h4,{id:`show-disabled-buttons`,children:`Show Disabled Buttons`}),`
`,(0,h.jsxs)(i.p,{children:[`By default, navigation buttons are hidden when you reach the first or last item.
If you prefer to keep them visible but in a `,(0,h.jsx)(i.code,{children:`disabled`}),` state (to prevent layout shifts), add the `,(0,h.jsx)(i.code,{children:`showDisabledButtons`}),` attribute.`]}),`
`,(0,h.jsx)(i.pre,{children:(0,h.jsx)(i.code,{className:`language-html`,children:`<gallery-nav showDisabledButtons/>
`})}),`
`,(0,h.jsxs)(i.blockquote,{children:[`
`,(0,h.jsxs)(i.p,{children:[(0,h.jsx)(i.strong,{children:`Note:`}),` If the gallery has the loop attribute enabled, buttons will always stay active and visible,
as there are no boundaries.`]}),`
`]}),`
`,(0,h.jsx)(i.h3,{id:`basic-navigation-example`,children:`Basic Navigation Example`}),`
`,(0,h.jsx)(r,{of:m}),`
`,(0,h.jsx)(i.h3,{id:`outside-navigation-example`,children:`Outside Navigation Example`}),`
`,(0,h.jsx)(r,{of:p}),`
`,(0,h.jsx)(i.h2,{id:`customization`,children:`Customization`}),`
`,(0,h.jsx)(i.h4,{id:`custom-templates`,children:`Custom Templates`}),`
`,(0,h.jsxs)(i.p,{children:[`You can provide your own button elements using the `,(0,h.jsx)(i.code,{children:`galleryNavButton`}),` directive.
These buttons will automatically inherit the gallery's navigation logic and disabled states.`]}),`
`,(0,h.jsx)(i.pre,{children:(0,h.jsx)(i.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item" [src]="item.src" [alt]="item.alt">

  <gallery-nav>
    <button galleryNavButton="next">Next</button>
    <button galleryNavButton="prev">Prev</button>
  </gallery-nav>
</gallery>
`})}),`
`,(0,h.jsx)(i.h3,{id:`custom-navigation-template-example`,children:`Custom Navigation Template Example`}),`
`,(0,h.jsx)(r,{of:l}),`
`,(0,h.jsx)(i.h3,{id:`custom-navigation-position-example`,children:`Custom Navigation Position Example`}),`
`,(0,h.jsx)(r,{of:u}),`
`,(0,h.jsx)(i.h2,{id:`gallerynav-api`,children:`GalleryNav API`}),`
`,(0,h.jsx)(n,{of:m}),`
`,(0,h.jsx)(i.h2,{id:`gallerynavbutton-api`,children:`GalleryNavButton API`}),`
`,(0,h.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var h;function init_Navigation(){return(init_Navigation=e((()=>{h=a(),s(),i(),d(),c()})))()}init_Navigation();export{MDXContent as default};