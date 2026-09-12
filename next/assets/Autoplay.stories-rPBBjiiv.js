import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-kKzLW__x.js";import{a as o,i as s,o as c,r as l,s as u,t as d}from"./pixabay.service-BBp6Zvkd.js";var f=t({Autoplay:()=>m,__namedExportsOrder:()=>h}),p,m,h;function init_Autoplay_stories(){return(init_Autoplay_stories=e((()=>{a(),n(),u(),o(),l(),p=r.meta({title:`Addons/Autoplay`,component:c,decorators:[i({imports:[s]}),(e,t)=>{let n=e(),r=t.args.uiColor,i=t.args.uiBgColor;return r&&requestAnimationFrame(()=>{let e=document.querySelector(`gallery`);e?.style.setProperty(`--g-autoplay-stroke-color`,r),console.log(`Set ${r}`),i&&e?.style.setProperty(`--g-autoplay-background-color`,i)}),n}],args:{autoplay:!0,autoplayInterval:3e3,autoplayScrollBehavior:`smooth`,autoplayDirection:`forward`,autoplayPause:`hover`,showSpinner:!0,showProgressbar:!0,uiColor:`#3b78ff`},argTypes:{autoplay:{control:`boolean`,table:{defaultValue:{summary:`true`}}},autoplayInterval:{control:{type:`number`,min:0,step:500},table:{defaultValue:{summary:`3000`}}},autoplayScrollBehavior:{control:`radio`,options:[`smooth`,`auto`],table:{defaultValue:{summary:`smooth`}}},autoplayDirection:{control:`radio`,options:[`forward`,`backward`,`ping-pong`],table:{type:{summary:`forward | backward | ping-pong`},defaultValue:{summary:`forward`}}},autoplayPause:{control:`radio`,options:[`hover`,`click`,`never`],table:{type:{summary:`hover | click | never`},defaultValue:{summary:`hover`}}},autoplayChange:{type:`function`,action:`autoplayChange`,table:{category:`Outputs`}},showSpinner:{control:`boolean`,table:{disable:!0}},showProgressbar:{control:`boolean`,table:{disable:!0}},uiColor:{control:`color`},uiBgColor:{control:`color`}}}),m=p.story({loaders:[async()=>({items:await d(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery loop
               [items]="items"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior"
               [autoplayDirection]="autoplayDirection"
               [autoplayPause]="autoplayPause"
               (autoplayChange)="autoplayChange($event)">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        @if (showSpinner) {
          <gallery-autoplay gallerySlot gallerySlotJustify="end" gallerySlotAlign="start"/>
        }
        @if (showProgressbar) {
          <gallery-autoplay gallerySlot gallerySlotAlign="end" mode="progressbar"/>
        }
      </gallery>
    `})}),h=[`Autoplay`],m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
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
      items
    },
    template: \`
      <gallery loop
               [items]="items"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior"
               [autoplayDirection]="autoplayDirection"
               [autoplayPause]="autoplayPause"
               (autoplayChange)="autoplayChange($event)">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        @if (showSpinner) {
          <gallery-autoplay gallerySlot gallerySlotJustify="end" gallerySlotAlign="start"/>
        }
        @if (showProgressbar) {
          <gallery-autoplay gallerySlot gallerySlotAlign="end" mode="progressbar"/>
        }
      </gallery>
    \`
  })
})`,...m.input.parameters?.docs?.source}}}})))()}export{f as n,init_Autoplay_stories as r,m as t};