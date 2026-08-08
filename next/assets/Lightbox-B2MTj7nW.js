import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,r as n,u as r}from"./blocks-DJ1APemM.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Lightbox.stories-BgEWweIF.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Addons/Lightbox`,name:`Lightbox Usage`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`lightbox`,children:`Lightbox`}),`
`,(0,u.jsx)(r.p,{children:`Basic usage`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<ng-template lightbox #lightbox="lightbox">
  <gallery [items]="items">
    <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
  </gallery>
</ng-template>

<button (click)="lightbox.showModal(initialIndex)">Open lightbox</button>
`})}),`
`,(0,u.jsx)(n,{of:l}),`
`,(0,u.jsx)(r.p,{children:`Replace the default close button with a custom one`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<ng-template #custom lightbox>
  <div class="some-content">Hello Lightbox</div>
</ng-template>
`})}),`
`,(0,u.jsx)(r.p,{children:`Hide the close button`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<ng-template #custom lightbox hideCloseButton>
  <div class="some-content">Hello Lightbox</div>
</ng-template>
`})})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Lightbox(){return(init_Lightbox=e((()=>{u=i(),o(),r(),c()})))()}init_Lightbox();export{MDXContent as default};