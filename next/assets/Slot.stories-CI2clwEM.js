import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-CJ1PzqyO.js";import{a as o,b as s,i as c,n as l,r as u,x as d}from"./pixabay.service-5iiNeSx-.js";var f=t({Slot:()=>m,__namedExportsOrder:()=>h}),p,m,h;function init_Slot_stories(){return(init_Slot_stories=e((()=>{n(),d(),o(),a(),u(),p=r.meta({title:`Documentations/Slot`,component:s,decorators:[i({imports:[c]})],args:{position:`center`,align:`center`,justify:`center`},argTypes:{position:{name:`gallerySlot`,control:`select`,options:[`center`,`top`,`bottom`,`start`,`end`],table:{type:{summary:`'center' | 'top' | 'bottom' | 'start' | 'end'`},defaultValue:{summary:`'center'`}}},align:{name:`gallerySlotAlign`,control:`select`,options:[`start`,`end`,`center`,`stretch`],table:{type:{summary:`'start' | 'end' | 'center' | 'stretch'`},defaultValue:{summary:`'center'`}}},justify:{name:`gallerySlotJustify`,control:`select`,options:[`start`,`end`,`center`,`stretch`],table:{type:{summary:`'start' | 'end' | 'center' | 'stretch'`},defaultValue:{summary:`'center'`}}}}}),m=p.story({name:`Slot`,loaders:[async()=>({items:await l()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <div class="static-panel"
             [gallerySlot]="position"
             [gallerySlotAlign]="align"
             [gallerySlotJustify]="justify">
          Static Content
        </div>
      </gallery>
    `,styles:[`
      .gallery-example {
        height: 300px !important;
      }
      .static-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0 0 0 / 0.5);
        border: 1px solid black;
        font-size: 20px;
        font-family: monospace, monospace;
        width: 250px;
        height: 75px;
        color: coral;
      }
    `]})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'Slot',
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

        <div class="static-panel"
             [gallerySlot]="position"
             [gallerySlotAlign]="align"
             [gallerySlotJustify]="justify">
          Static Content
        </div>
      </gallery>
    \`,
    styles: [\`
      .gallery-example {
        height: 300px !important;
      }
      .static-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0 0 0 / 0.5);
        border: 1px solid black;
        font-size: 20px;
        font-family: monospace, monospace;
        width: 250px;
        height: 75px;
        color: coral;
      }
    \`]
  })
})`,...m.input.parameters?.docs?.source}}},h=[`Slot`]})))()}export{f as n,init_Slot_stories as r,m as t};