import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-CJ1PzqyO.js";import{a as o,c as s,i as c,l,n as u,r as d}from"./pixabay.service-5iiNeSx-.js";var f=t({Counter:()=>m,CustomCounter:()=>h,__namedExportsOrder:()=>g}),p,m,h,g;function init_Counter_stories(){return(init_Counter_stories=e((()=>{a(),n(),l(),o(),d(),p=r.meta({title:`Documentations/Counter`,component:s,decorators:[i({imports:[c]})],args:{align:`top`},argTypes:{align:{control:`radio`,options:[`top`,`bottom`],table:{type:{summary:`'top' | 'bottom'`},defaultValue:{summary:`'top'`}}}}}),m=p.story({loaders:[async()=>({items:await u()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-counter [align]="align"/>
      </gallery>
    `})}),h=p.story({tags:[`!dev`],loaders:[async()=>({items:await u()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery #gallery="gallery" class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <div class="g-panel custom-counter" gallerySlot gallerySlotAlign="start">
          Slide {{ gallery.activeIndex() + 1 }} of {{ gallery.itemsCount() }}
        </div>
      </gallery>
    `,styles:[`
      .custom-counter {
        margin-top: 0.4rem;
        padding: 0.3rem 0.6rem ;
        border-radius: 16px;
        font-size: 14px;
      }
    `]})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
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
        <gallery-counter [align]="align"/>
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
      <gallery #gallery="gallery" class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <div class="g-panel custom-counter" gallerySlot gallerySlotAlign="start">
          Slide {{ gallery.activeIndex() + 1 }} of {{ gallery.itemsCount() }}
        </div>
      </gallery>
    \`,
    styles: [\`
      .custom-counter {
        margin-top: 0.4rem;
        padding: 0.3rem 0.6rem ;
        border-radius: 16px;
        font-size: 14px;
      }
    \`]
  })
})`,...h.input.parameters?.docs?.source}}},g=[`Counter`,`CustomCounter`]})))()}export{init_Counter_stories as i,f as n,h as r,m as t};