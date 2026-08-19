import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,r as n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{a as s,t as c}from"./Gallery.stories-pd06_cv3.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...a(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t,{title:`Addons/AutoHeight`}),`
`,(0,l.jsx)(r.h1,{id:`autoheight`,children:`AutoHeight`}),`
`,(0,l.jsxs)(r.p,{children:[`The `,(0,l.jsx)(r.strong,{children:`AutoHeight`}),` feature makes the gallery container automatically adapt
to the height of the currently active slide.`]}),`
`,(0,l.jsx)(r.p,{children:`This is useful when:`}),`
`,(0,l.jsxs)(r.ul,{children:[`
`,(0,l.jsx)(r.li,{children:`Slides have different heights`}),`
`,(0,l.jsx)(r.li,{children:`You want to avoid fixed-height layouts`}),`
`,(0,l.jsx)(r.li,{children:`You want smoother, content-driven layouts`}),`
`]}),`
`,(0,l.jsx)(r.h2,{id:`how-it-works`,children:`How it works`}),`
`,(0,l.jsx)(r.p,{children:`When the active slide changes, the directive:`}),`
`,(0,l.jsxs)(r.ol,{children:[`
`,(0,l.jsx)(r.li,{children:`Measures the active slide height`}),`
`,(0,l.jsx)(r.li,{children:`Updates the gallery container height`}),`
`,(0,l.jsx)(r.li,{children:`(Optionally) animates the height change if your gallery has transitions enabled`}),`
`]}),`
`,(0,l.jsx)(r.p,{children:`No manual resizing or layout hacks are needed.`}),`
`,(0,l.jsx)(r.h2,{id:`usage`,children:`Usage`}),`
`,(0,l.jsxs)(r.p,{children:[`Add the `,(0,l.jsx)(r.code,{children:`autoHeight`}),` attribute to the `,(0,l.jsx)(r.code,{children:`<gallery>`}),` component:`]}),`
`,(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:`language-html`,children:`<gallery [items]="items" autoHeight>
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
</gallery>
`})}),`
`,(0,l.jsx)(r.p,{children:`That’s it — height will now follow the active slide.`}),`
`,(0,l.jsx)(r.h2,{id:`example`,children:`Example`}),`
`,(0,l.jsx)(n,{of:c}),`
`,(0,l.jsx)(r.p,{children:`You can adjust transition duration by setting the CSS variable`}),`
`,(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:`language-css`,children:`@include gallery.ng-gallery-overrides((
  size-transition-ease: 400ms
));
`})}),`
`,(0,l.jsxs)(r.p,{children:[`or `,(0,l.jsx)(r.code,{children:`--g-size-transition-ease`}),`.`]}),`
`,(0,l.jsx)(r.h2,{id:`notes`,children:`Notes`}),`
`,(0,l.jsx)(r.p,{children:`Works best when slide content has intrinsic height (e.g. images with known aspect ratio)`}),`
`,(0,l.jsxs)(r.ul,{children:[`
`,(0,l.jsx)(r.li,{children:`If slide content loads asynchronously, height updates after content renders`}),`
`,(0,l.jsx)(r.li,{children:`Can be combined with transitions for smoother resizing`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var l;function init_AutoHeight(){return(init_AutoHeight=e((()=>{l=i(),o(),r(),s()})))()}init_AutoHeight();export{MDXContent as default};