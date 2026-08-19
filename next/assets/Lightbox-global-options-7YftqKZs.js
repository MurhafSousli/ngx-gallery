import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Lightbox-global-options.stories--cCWe0wX.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{of:s}),`
`,(0,u.jsx)(r.h1,{id:`lightbox-global-options`,children:`Lightbox Global Options`}),`
`,(0,u.jsx)(r.p,{children:`All configuration options for the Lightbox addon can be managed globally in one place. These settings control the behavior of the overlay, the backdrop, and the dialog closing policies.`}),`
`,(0,u.jsx)(r.h2,{id:`global-configuration`,children:`Global Configuration`}),`
`,(0,u.jsxs)(r.p,{children:[`You can define the default behavior for all Lightbox instances across your application using the `,(0,u.jsx)(r.code,{children:`provideLightboxOptions`}),` provider. This ensures consistent modal behavior without repeating configuration on every open call.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-ts`,children:`import { provideLightboxOptions } from 'ng-gallery/lightbox';

export const appConfig = {
  providers: [
    provideLightboxOptions({
      // Configure lightbox behavior in one place
      hasBackdrop: true,
      closedBy: 'any',
      hideCloseButton: false
    })
  ]
};
`})}),`
`,(0,u.jsx)(r.h2,{id:`options-reference`,children:`Options Reference`}),`
`,(0,u.jsx)(r.p,{children:`The following table details the available configuration properties for the Lightbox addon.`}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Lightbox_global_options(){return(init_Lightbox_global_options=e((()=>{u=i(),o(),r(),c()})))()}init_Lightbox_global_options();export{MDXContent as default};