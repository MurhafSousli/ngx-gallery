import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,r as n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{i as s,n as c,r as l,t as u}from"./LightboxFor.stories-CtYWhIL4.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...a(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t,{title:`Addons/LightboxFor`,name:`LightboxFor Usage`,of:l}),`
`,(0,d.jsx)(r.h1,{id:`lightboxfor-directive`,children:`LightboxFor directive`}),`
`,(0,d.jsxs)(r.p,{children:[`Alternatively you can use the `,(0,d.jsx)(r.code,{children:`lightboxFor`}),` directive to open the lightbox programmatically.`]}),`
`,(0,d.jsx)(r.pre,{children:(0,d.jsx)(r.code,{className:`language-html`,children:`<ng-template lightbox #lightbox="lightbox">
  <gallery [items]="items">
    <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
  </gallery>
</ng-template>

<button [lightboxFor]="lightbox" [lightboxIndex]="initialIndex">Open Lightbox</button>
`})}),`
`,(0,d.jsx)(n,{of:c}),`
`,(0,d.jsx)(r.h2,{id:`open-lightbox-from-gallery-item`,children:`Open lightbox from gallery item`}),`
`,(0,d.jsx)(n,{of:u})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var d;function init_LightboxFor(){return(init_LightboxFor=e((()=>{d=i(),o(),r(),s()})))()}init_LightboxFor();export{MDXContent as default};