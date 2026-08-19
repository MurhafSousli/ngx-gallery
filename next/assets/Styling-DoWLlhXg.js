import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Styling.stories-UGIAg32B.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h4:`h4`,p:`p`,pre:`pre`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Documentations/Styling`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`-gallery-customization-guide`,children:`🎨 Gallery Customization Guide`}),`
`,(0,u.jsx)(r.p,{children:`You can customize the appearance and behavior of the gallery using CSS variables. We provide a SCSS mixin for a clean integration, or you can override the variables directly.`}),`
`,(0,u.jsx)(r.h4,{id:`using-the-scss-mixin`,children:`Using the SCSS Mixin`}),`
`,(0,u.jsxs)(r.p,{children:[`The recommended way to apply these overrides globally is by using the `,(0,u.jsx)(r.code,{children:`ng-gallery-overrides`}),` mixin.`]}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-css`,children:`@use 'ng-gallery' as gallery;

:root {
  @include gallery.ng-gallery-overrides((
    layout-gap: 4px,
    button-size: 60px
  ));
}
`})}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Styling(){return(init_Styling=e((()=>{u=i(),o(),r(),c()})))()}init_Styling();export{MDXContent as default};