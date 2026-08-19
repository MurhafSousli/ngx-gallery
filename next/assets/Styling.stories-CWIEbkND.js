import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{f as o,p as s,r as c,t as l}from"./pixabay.service-CQKQDv3x.js";import{n as u,t as d}from"./lightbox.module-BnUqYw6O.js";function mapToLightboxStyles(e){let t={};for(let[n,r]of Object.entries(e))r&&(t[`--lb-${n}`]=r);return t}var f,p;function init_helper(){return(init_helper=e((()=>{f={"container-shape":`26px`,"container-elevation-shadow":``,"backdrop-color":`rgba(0, 0, 0, 0.4)`,"backdrop-filter":`blur(0px) saturate(100%)`,"backdrop-filter-start":`blur(0px) saturate(100%)`,"duration-in":`300ms`,"duration-out":`300ms`,"opacity-start":`0`,"scale-start":`0.95`,"translate-start":`0, 20px`,"rotate-start":`0deg`,"timing-in":`ease`,"timing-out":`ease`},p={"container-shape":{name:`container-shape`,control:`text`,description:`Dialog border radius`,table:{category:`Appearance`,defaultValue:{summary:`26px`}}},"container-elevation-shadow":{name:`container-elevation-shadow`,control:`text`,description:`Dialog box shadow (elevation effect)`,table:{category:`Appearance`,defaultValue:{summary:`light-dark(...)`}}},"backdrop-color":{name:`backdrop-color`,control:`color`,description:`Final overlay background color`,table:{category:`Backdrop`,defaultValue:{summary:`rgba(0, 0, 0, 0.4)`}}},"backdrop-filter":{name:`backdrop-filter`,control:`text`,description:`Final backdrop filter effects (blur, saturate, etc.)`,table:{category:`Backdrop`,defaultValue:{summary:`blur(0px) saturate(100%)`}}},"backdrop-filter-start":{name:`backdrop-filter-start`,control:`text`,description:`Initial backdrop filter effects (before animation)`,table:{category:`Backdrop`,defaultValue:{summary:`blur(0px) saturate(100%)`}}},"duration-in":{name:`duration-in`,control:`text`,description:`Opening/enter animation duration`,table:{category:`Animation Duration`,defaultValue:{summary:`300ms`}}},"duration-out":{name:`duration-out`,control:`text`,description:`Closing/exit animation duration`,table:{category:`Animation Duration`,defaultValue:{summary:`300ms`}}},"opacity-start":{name:`opacity-start`,control:`text`,description:`Initial opacity (0-1)`,table:{category:`Initial Transform State`,defaultValue:{summary:`0`}}},"scale-start":{name:`scale-start`,control:`text`,description:`Initial scale transformation`,table:{category:`Initial Transform State`,defaultValue:{summary:`0.95`}}},"translate-start":{name:`translate-start`,control:`text`,description:`Initial translation (X Y format)`,table:{category:`Initial Transform State`,defaultValue:{summary:`0, 20px`}}},"rotate-start":{name:`rotate-start`,control:`text`,description:`Initial rotation angle`,table:{category:`Initial Transform State`,defaultValue:{summary:`0deg`}}},"timing-in":{name:`timing-in`,control:`text`,description:`Easing function for opening animation (ease, ease-out, cubic-bezier, etc.)`,table:{category:`Animation Timing`,defaultValue:{summary:`ease`}}},"timing-out":{name:`timing-out`,control:`text`,description:`Easing function for closing animation`,table:{category:`Animation Timing`,defaultValue:{summary:`ease`}}}}})))()}var m=t({StylingExample:()=>g,__namedExportsOrder:()=>_}),h,g,_;function init_Styling_stories(){return(init_Styling_stories=e((()=>{a(),n(),c(),init_helper(),s(),u(),h=r.type().meta({title:`Addons/Lightbox/Styling`,component:o,decorators:[i({imports:[d]})],parameters:{controls:{include:Object.keys(f)}},args:f,argTypes:p}),g=h.story({name:`Styling`,loaders:[async()=>({items:await l(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t,galleryStyle:mapToLightboxStyles(e)},template:`
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    `})}),g.input.parameters={...g.input.parameters,docs:{...g.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'Styling',
  loaders: [async () => ({
    items: await getHDImages('Boat')
  })],
  render: (args, {
    loaded: {
      items
    }
  }) => ({
    props: {
      ...args,
      items,
      // The helper function cleanly maps everything to '--g-key'
      galleryStyle: mapToLightboxStyles(args)
    },
    template: \`
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    \`
  })
})`,...g.input.parameters?.docs?.source}}},_=[`StylingExample`]})))()}export{m as n,init_Styling_stories as r,g as t};