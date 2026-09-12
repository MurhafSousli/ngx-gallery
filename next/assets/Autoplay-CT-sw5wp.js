import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-CihIRCq3.js";import{a as i}from"./chunk-W22LQPXL-BxjltZfW.js";import{i as a,r as o}from"./react-C77DJ2jK.js";import{n as s,r as c,t as l}from"./Autoplay.stories-rPBBjiiv.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Addons/Autoplay`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`autoplay`,children:`Autoplay`}),`
`,(0,u.jsx)(r.p,{children:`Enables automatic slide progression through gallery items.`}),`
`,(0,u.jsx)(r.h3,{id:`behavior`,children:`Behavior`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsx)(r.li,{children:`Slides advance only after the current item finishes loading.`}),`
`,(0,u.jsxs)(r.li,{children:[`Playback pauses on user interactions based on `,(0,u.jsx)(r.code,{children:`autoplayPause`}),` settings or active scrolling.`]}),`
`]}),`
`,(0,u.jsx)(r.h3,{id:`quick-start`,children:`Quick Start`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<gallery autoplay [items]="items" />
`})}),`
`,(0,u.jsx)(r.h3,{id:`full-example`,children:`Full Example`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<gallery [items]="items"
         [autoplay]="autoplay"
         autoplayPause="hover"
         autoplayInterval="2500"
         autoplayDirection="ping-pong"
         autoplayScrollBehavior="auto"
         (autoplayChange)="onAutoplayChange($event)">
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
</gallery>

<button (click)="autoplay = true">Play</button>
<button (click)="autoplay = false">Stop</button>
`})}),`
`,(0,u.jsx)(r.h2,{id:`api`,children:`API`}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Autoplay(){return(init_Autoplay=e((()=>{u=i(),o(),r(),c()})))()}init_Autoplay();export{MDXContent as default};