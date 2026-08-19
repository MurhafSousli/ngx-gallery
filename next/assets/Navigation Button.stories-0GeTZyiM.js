import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{a as o,i as s,n as c,r as l,v as u,y as d}from"./pixabay.service-CQKQDv3x.js";var f=t({CustomNavPositionExample:()=>h,CustomNavTemplateExample:()=>m,__namedExportsOrder:()=>g}),p,m,h,g;function init_Navigation_Button_stories(){return(init_Navigation_Button_stories=e((()=>{a(),n(),o(),d(),l(),p=r.meta({component:u,decorators:[i({imports:[s]})],args:{},argTypes:{type:{name:`galleryNavButton`,table:{defaultValue:{summary:null}}}}}),m=p.story({tags:[`!dev`],loaders:[async()=>({items:await c()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav>
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </gallery-nav>
      </gallery>
    `})}),h=p.story({tags:[`!dev`],loaders:[async()=>({items:await c()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <div gallerySlot gallerySlotAlign="end" gallerySlotJustify="end">
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </div>
      </gallery>
    `})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
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
        <gallery-nav>
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </gallery-nav>
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
        <div gallerySlot gallerySlotAlign="end" gallerySlotJustify="end">
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </div>
      </gallery>
    \`
  })
})`,...h.input.parameters?.docs?.source}}},g=[`CustomNavTemplateExample`,`CustomNavPositionExample`]})))()}export{init_Navigation_Button_stories as i,m as n,f as r,h as t};