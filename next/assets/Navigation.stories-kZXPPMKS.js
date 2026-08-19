import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{_ as o,a as s,g as c,i as l,n as u,r as d}from"./pixabay.service-CQKQDv3x.js";var f=t({NavigationExample:()=>m,OutsideNavExample:()=>h,__namedExportsOrder:()=>g}),p,m,h,g;function init_Navigation_stories(){return(init_Navigation_stories=e((()=>{a(),n(),s(),o(),d(),p=r.meta({title:`Documentations/Navigation`,component:c,decorators:[i({imports:[l]})],args:{showDisabledButtons:!1,outside:!1},argTypes:{outside:{control:`boolean`,table:{defaultValue:{summary:`false`}}},showDisabledButtons:{control:`boolean`,table:{defaultValue:{summary:`false`}}}}}),m=p.story({name:`Navigation`,loaders:[async()=>({items:await u()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav [showDisabledButtons]="showDisabledButtons" [outside]="outside"/>
      </gallery>
    `})}),h=p.story({tags:[`!dev`],loaders:[async()=>({items:await u()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav outside showDisabledButtons/>
      </gallery>
    `})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'Navigation',
  loaders: [async () => ({
    items: await getSlides()
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
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav [showDisabledButtons]="showDisabledButtons" [outside]="outside"/>
      </gallery>
    \`
  })
})`,...m.input.parameters?.docs?.source}}},h.input.parameters={...h.input.parameters,docs:{...h.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getSlides()
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
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav outside showDisabledButtons/>
      </gallery>
    \`
  })
})`,...h.input.parameters?.docs?.source}}},g=[`NavigationExample`,`OutsideNavExample`]})))()}export{init_Navigation_stories as i,f as n,h as r,m as t};