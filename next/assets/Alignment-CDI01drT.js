import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,r as n,u as r}from"./blocks-DJ1APemM.js";import{a as i}from"./chunk-W22LQPXL-CChX7ad3.js";import{i as a,r as o}from"./react-NI1vexfW.js";import{a as s,i as c,n as l,r as u}from"./Alignment.stories-CkdmpAo6.js";function _createMdxContent(e){let r={code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t,{title:`Documentations/Alignment`}),`
`,(0,d.jsx)(r.h2,{id:`snap-alignment--index-accuracy`,children:`Snap Alignment & Index Accuracy`}),`
`,(0,d.jsxs)(r.p,{children:[`The gallery determines the `,(0,d.jsx)(r.code,{children:`activeIndex`}),` based on a `,(0,d.jsx)(r.strong,{children:`Snap Anchor`}),`. The `,(0,d.jsx)(r.code,{children:`snapAlign`}),` property defines where that anchor sits in the viewport.`]}),`
`,(0,d.jsx)(r.h3,{id:`properties`,children:`Properties`}),`
`,(0,d.jsxs)(r.table,{children:[(0,d.jsx)(r.thead,{children:(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.th,{style:{textAlign:`left`},children:`Input`}),(0,d.jsx)(r.th,{style:{textAlign:`left`},children:`Type`}),(0,d.jsx)(r.th,{style:{textAlign:`left`},children:`Default`}),(0,d.jsx)(r.th,{style:{textAlign:`left`},children:`Description`})]})}),(0,d.jsxs)(r.tbody,{children:[(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`snapAlign`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`'start' | 'center' | 'end'`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`'center'`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:`Sets the target "Anchor" point in the viewport.`})]}),(0,d.jsxs)(r.tr,{children:[(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`forceSnap`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`boolean`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:(0,d.jsx)(r.code,{children:`false`})}),(0,d.jsx)(r.td,{style:{textAlign:`left`},children:`When true, adds dynamic padding to ensure every item can hit the Anchor.`})]})]})]}),`
`,(0,d.jsx)(r.hr,{}),`
`,(0,d.jsx)(r.h3,{id:`how-it-works-the-anchor-concept`,children:`How it Works: The "Anchor" Concept`}),`
`,(0,d.jsxs)(r.p,{children:[`To understand why `,(0,d.jsx)(r.code,{children:`snapAlign`}),` is necessary, imagine a physical "Target" or "Anchor" positioned in your gallery viewport:`]}),`
`,(0,d.jsxs)(r.ul,{children:[`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:`start`})}),`: The Anchor is the `,(0,d.jsx)(r.strong,{children:`left edge`}),` (or right in RTL).`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:`center`})}),`: The Anchor is the `,(0,d.jsx)(r.strong,{children:`exact middle`}),`.`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:(0,d.jsx)(r.code,{children:`end`})}),`: The Anchor is the `,(0,d.jsx)(r.strong,{children:`right edge`}),` (or left in RTL).`]}),`
`]}),`
`,(0,d.jsxs)(r.p,{children:[`An item only becomes "active" (`,(0,d.jsx)(r.code,{children:`activeIndex`}),`) when it physically reaches that Anchor.`]}),`
`,(0,d.jsx)(r.h4,{id:`the-edge-problem`,children:`The "Edge" Problem`}),`
`,(0,d.jsx)(r.p,{children:`By default, a scroll container stops as soon as the last item touches the end of the viewport.`}),`
`,(0,d.jsxs)(r.ul,{children:[`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsxs)(r.strong,{children:[`In `,(0,d.jsx)(r.code,{children:`start`}),` mode`]}),`, the last item's `,(0,d.jsx)(r.em,{children:`start edge`}),` may never reach the `,(0,d.jsx)(r.em,{children:`left edge`}),` of the screen because there is no more content to scroll.`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:`Result:`}),` The last item can never be "active," and your `,(0,d.jsx)(r.code,{children:`activeIndex`}),` will stay stuck on a previous item.`]}),`
`]}),`
`,(0,d.jsx)(r.hr,{}),`
`,(0,d.jsxs)(r.h3,{id:`the-forcesnap-solution`,children:[`The `,(0,d.jsx)(r.code,{children:`forceSnap`}),` Solution`]}),`
`,(0,d.jsxs)(r.p,{children:[`When you enable `,(0,d.jsx)(r.code,{children:`forceSnap`}),`, the gallery calculates the exact amount of "ghost space" (padding) needed at the boundaries.`]}),`
`,(0,d.jsxs)(r.ol,{children:[`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsxs)(r.strong,{children:[`Start Alignment + `,(0,d.jsx)(r.code,{children:`forceSnap`})]}),`: Adds padding to the `,(0,d.jsx)(r.strong,{children:`end`}),` of the gallery. This allows the last item to travel all the way to the start anchor.`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsxs)(r.strong,{children:[`End Alignment + `,(0,d.jsx)(r.code,{children:`forceSnap`})]}),`: Adds padding to the `,(0,d.jsx)(r.strong,{children:`start`}),` of the gallery. This allows the first item to travel all the way to the end anchor.`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsxs)(r.strong,{children:[`Center Alignment + `,(0,d.jsx)(r.code,{children:`forceSnap`})]}),`: Adds padding to `,(0,d.jsx)(r.strong,{children:`both`}),` sides. This ensures every item—from first to last—can be perfectly centered.`]}),`
`]}),`
`,(0,d.jsxs)(r.h4,{id:`when-should-i-use-forcesnap`,children:[`When should I use `,(0,d.jsx)(r.code,{children:`forceSnap`}),`?`]}),`
`,(0,d.jsxs)(r.ul,{children:[`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:`Use it`}),` if you need an accurate `,(0,d.jsx)(r.code,{children:`activeIndex`}),` for every item (e.g., for paginators or thumbnails).`]}),`
`,(0,d.jsxs)(r.li,{children:[(0,d.jsx)(r.strong,{children:`Disable it`}),` if you want a "standard" list feel where the scroll simply stops at the natural boundaries of the content.`]}),`
`]}),`
`,(0,d.jsx)(r.h2,{id:`examples`,children:`Examples`}),`
`,(0,d.jsxs)(r.p,{children:[`Example using `,(0,d.jsx)(r.code,{children:`snapAlign="center"`}),` and `,(0,d.jsx)(r.code,{children:`forceSnap`}),`:`]}),`
`,(0,d.jsx)(n,{of:l}),`
`,(0,d.jsxs)(r.p,{children:[`Example using `,(0,d.jsx)(r.code,{children:`snapAlign="start"`}),` and `,(0,d.jsx)(r.code,{children:`forceSnap`}),`:`]}),`
`,(0,d.jsx)(n,{of:c}),`
`,(0,d.jsxs)(r.p,{children:[`Example using `,(0,d.jsx)(r.code,{children:`snapAlign="end"`}),` and `,(0,d.jsx)(r.code,{children:`forceSnap`}),`:`]}),`
`,(0,d.jsx)(n,{of:u})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var d;function init_Alignment(){return(init_Alignment=e((()=>{d=i(),o(),r(),s()})))()}init_Alignment();export{MDXContent as default};