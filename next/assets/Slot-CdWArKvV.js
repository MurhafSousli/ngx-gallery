import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,n,u as r}from"./blocks-JKEW4qnp.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{n as s,r as c,t as l}from"./Slot.stories-Dx0f_ggc.js";function _createMdxContent(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t,{title:`Gallery Slot`,of:s}),`
`,(0,u.jsx)(r.h1,{id:`gallery-slot`,children:`Gallery Slot`}),`
`,(0,u.jsxs)(r.p,{children:[`Use `,(0,u.jsx)(r.code,{children:`gallerySlot`}),` to place custom projected content inside the gallery layout.`]}),`
`,(0,u.jsx)(r.p,{children:`A slot can float over the main slider or dock to one of the gallery grid areas. Slot content remains fixed in place and does not participate in slide navigation or item indexing.`}),`
`,(0,u.jsx)(r.h3,{id:`positioning-model`,children:`Positioning Model`}),`
`,(0,u.jsxs)(r.p,{children:[(0,u.jsx)(r.code,{children:`gallerySlot`}),` supports three positioning inputs:`]}),`
`,(0,u.jsxs)(r.ul,{children:[`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`gallerySlot`}),` — docking position (optional)`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`gallerySlotAlign`}),` — vertical alignment`]}),`
`,(0,u.jsxs)(r.li,{children:[(0,u.jsx)(r.code,{children:`gallerySlotJustify`}),` — horizontal alignment`]}),`
`]}),`
`,(0,u.jsx)(r.h4,{id:`default-behavior`,children:`Default Behavior`}),`
`,(0,u.jsx)(r.p,{children:`If no explicit docking position is provided, the slot is positioned as a floating overlay above the main slider.`}),`
`,(0,u.jsx)(r.h4,{id:`examples`,children:`Examples`}),`
`,(0,u.jsx)(r.pre,{children:(0,u.jsx)(r.code,{className:`language-html`,children:`<gallery [items]="items">
  <img *galleryItemDef="let item"
       [src]="item.src"
       [alt]="item.alt" />

  <!-- Floating bottom-right overlay -->
  <div gallerySlot
       gallerySlotAlign="bottom"
       gallerySlotJustify="end">
    This is a fixed box floating in the bottom right corner.
  </div>

  <!-- Docked at the top, centered -->
  <div gallerySlot="top">
    This is a fixed box docked in the top center above the main slider.
  </div>

  <!-- Docked at the right, vertically centered -->
  <div gallerySlot="end"
       gallerySlotAlign="center">
    This is a fixed box docked to the right center of the main slider.
  </div>
</gallery>
`})}),`
`,(0,u.jsx)(r.h2,{id:`api`,children:`API`}),`
`,(0,u.jsx)(n,{of:l})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var u;function init_Slot(){return(init_Slot=e((()=>{u=i(),o(),r(),c()})))()}init_Slot();export{MDXContent as default};