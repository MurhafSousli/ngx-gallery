import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-CJ1PzqyO.js";import{a as o,f as s,i as c,n as l,p as u,r as d,t as f}from"./pixabay.service-5iiNeSx-.js";var p=t({AutoItemSizeExample:()=>y,DefaultItemsPerViewExample:()=>h,FixedItemSizeExample:()=>v,FrictionItemsPerViewExample:()=>_,MutlipleItemsPerViewExample:()=>g,__namedExportsOrder:()=>b}),m,h,g,_,v,y,b;function init_Layout_stories(){return(init_Layout_stories=e((()=>{a(),n(),u(),o(),d(),m=r.meta({title:`Documentations/Layout`,component:s,decorators:[i({imports:[c]})]}),h=m.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),g=m.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),_=m.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="1.4" forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),v=m.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="150">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),y=m.story({tags:[`!dev`],loaders:[async()=>({items:await f(`Flowers`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="auto" forceSnap>
          <img *galleryItemDef="let item"
                galleryImage
                [src]="item.src"
                [alt]="item.alt"/>
        <gallery-nav/>
      </gallery>
    `})}),h.input.parameters={...h.input.parameters,docs:{...h.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...h.input.parameters?.docs?.source}}},g.input.parameters={...g.input.parameters,docs:{...g.input.parameters?.docs,source:{originalSource:`meta.story({
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
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...g.input.parameters?.docs?.source}}},_.input.parameters={..._.input.parameters,docs:{..._.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="1.4" forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,..._.input.parameters?.docs?.source}}},v.input.parameters={...v.input.parameters,docs:{...v.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="150">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...v.input.parameters?.docs?.source}}},y.input.parameters={...y.input.parameters,docs:{...y.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getHDImages('Flowers')
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
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="auto" forceSnap>
          <img *galleryItemDef="let item"
                galleryImage
                [src]="item.src"
                [alt]="item.alt"/>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...y.input.parameters?.docs?.source}}},b=[`DefaultItemsPerViewExample`,`MutlipleItemsPerViewExample`,`FrictionItemsPerViewExample`,`FixedItemSizeExample`,`AutoItemSizeExample`]})))()}export{p as a,_ as i,h as n,g as o,v as r,init_Layout_stories as s,y as t};