import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Autoplay.stories-C0s70-L7.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Addons/Autoplay`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`autoplay`,children:`Autoplay`}),`
`,(0,u.jsx)(r.p,{children:`Enables automatic progression through gallery items, similar to a slideshow.`}),`
`,(0,u.jsx)(r.h3,{id:`usage`,children:`Usage`}),`
`,(0,u.jsxs)(r.p,{children:[`Add the `,(0,u.jsx)(r.code,{children:`autoplay`}),` attribute to the `,(0,u.jsx)(r.code,{children:`<gallery>`}),` component:`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<gallery autoplay/>
`})}),`
`,(0,u.jsx)(r.p,{children:`This will enable autoplay for the gallery.`}),`
`,(0,u.jsx)(r.h3,{id:`behavior`,children:`Behavior`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsx)(r.li,{children:`Playback begins only after the current item reaches the ready state.`}),`
`,(0,u.jsxs)(r.li,{children:[`Playback pauses when:`,`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsx)(r.li,{children:`The pointer is hovering over the gallery.`}),`
`,(0,u.jsx)(r.li,{children:`The gallery is being scrolled (e.g., user interaction).`}),`
`]}),`
`]}),`
`]}),`
`,(0,u.jsx)(r.h3,{id:`configuration`,children:`Configuration`}),`
`,(0,u.jsx)(r.p,{children:`The interval between item transitions is configured using the autoplayInterval input (milliseconds).`}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[`Type: `,(0,u.jsx)(r.code,{children:`number`})]}),`
`,(0,u.jsxs)(r.li,{children:[`Default: `,(0,u.jsx)(r.code,{children:`3000`})]}),`
`]}),`
`,(0,u.jsx)(r.p,{children:`Example with a custom interval and scroll behavior:`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<gallery [items]="items"
         [autoplay]="autoplay"
         autoplayInterval="2500"
         autoplayScrollBehavior="auto">
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
</gallery>

<button (click)="autoplay = true">Play</button>
<button (click)="autoplay = false">Stop</button>
`})}),`
`,(0,u.jsx)(r.h2,{id:`api`,children:`API`}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Autoplay(){return(init_Autoplay=e((()=>{u=i(),o(),r(),c()})))()}init_Autoplay();export{MDXContent as default};