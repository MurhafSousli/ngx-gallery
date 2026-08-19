import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Global-options.stories-COB7l4al.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Documentations/Global Options`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`global-options`,children:`Global Options`}),`
`,(0,u.jsx)(r.p,{children:`All configuration options for the gallery component and its subcomponents (such as the slider, thumbnails, navigation, and counter) can be managed globally in one place.`}),`
`,(0,u.jsxs)(r.p,{children:[`You can define the default behavior for all gallery instances across your application using the `,(0,u.jsx)(r.code,{children:`provideGalleryOptions`}),` provider.
This ensures a consistent experience and reduces the need for repeated property binding.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-ts`,children:`import { provideGalleryOptions } from 'ng-gallery';

export const appConfig = {
  providers: [
    provideGalleryOptions({
      // Example: Enable loop and set a custom gap
      loop: true,
      gap: 10,
      thumbPosition: 'left'
    })
  ]
};
`})}),`
`,(0,u.jsx)(r.h2,{id:`options-reference`,children:`Options Reference`}),`
`,(0,u.jsx)(r.p,{children:`The following table details all available configuration properties, grouped by their functional area (Slider, Thumbnails, Player, etc.).`}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Global_options(){return(init_Global_options=e((()=>{u=i(),o(),r(),c()})))()}init_Global_options();export{MDXContent as default};