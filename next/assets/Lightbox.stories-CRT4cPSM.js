import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{r as o,t as s}from"./pixabay.service-CQKQDv3x.js";import{a as c,n as l,o as u,t as d}from"./lightbox.module-BnUqYw6O.js";var f=t({LightboxExample:()=>m,__namedExportsOrder:()=>h}),p,m,h;function init_Lightbox_stories(){return(init_Lightbox_stories=e((()=>{a(),n(),l(),u(),o(),p=r.meta({title:`Addons/Lightbox`,component:c,decorators:[i({imports:[d]})]}),m=p.story({name:`Lightbox`,loaders:[async()=>({items:await s(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    `}),decorators:[e=>({...e(),styles:[`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .grid-item {
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        background-color: #f0f0f0;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .grid-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      }

      .grid-item:hover .grid-image {
        transform: scale(1.08);
      }
    `]})]}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'Lightbox',
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
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    \`
  }),
  decorators: [story => ({
    ...story(),
    styles: [\`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .grid-item {
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        background-color: #f0f0f0;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .grid-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      }

      .grid-item:hover .grid-image {
        transform: scale(1.08);
      }
    \`]
  })]
})`,...m.input.parameters?.docs?.source}}},h=[`LightboxExample`]})))()}export{f as n,init_Lightbox_stories as r,m as t};