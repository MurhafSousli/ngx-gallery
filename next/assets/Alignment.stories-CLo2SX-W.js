import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{a as o,f as s,i as c,n as l,p as u,r as d}from"./pixabay.service-CQKQDv3x.js";var f=t({CenterAlingmentExample:()=>m,EndAlingmentExample:()=>g,StartAlingmentExample:()=>h,__namedExportsOrder:()=>_}),p,m,h,g,_;function init_Alignment_stories(){return(init_Alignment_stories=e((()=>{a(),n(),u(),o(),d(),p=r.meta({title:`Documentations/Alignment`,component:s,decorators:[i({imports:[c]})]}),m=p.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),h=p.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="start"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),g=p.story({tags:[`!dev`],loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="end"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
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
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
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
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="start"
              forceSnap>
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
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="end"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...g.input.parameters?.docs?.source}}},_=[`CenterAlingmentExample`,`StartAlingmentExample`,`EndAlingmentExample`]})))()}export{init_Alignment_stories as a,h as i,m as n,g as r,f as t};