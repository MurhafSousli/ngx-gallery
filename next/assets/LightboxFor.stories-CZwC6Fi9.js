import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-CJ1PzqyO.js";import{r as o,t as s}from"./pixabay.service-5iiNeSx-.js";import{i as c,n as l,r as u,t as d}from"./lightbox.module-DstVOESe.js";var f=t({LightboxForGalleryExample:()=>h,LightboxForGridExample:()=>m,__namedExportsOrder:()=>g}),p,m,h,g;function init_LightboxFor_stories(){return(init_LightboxFor_stories=e((()=>{a(),n(),l(),c(),o(),p=r.meta({title:`Addons/Lightbox`,component:u,decorators:[i({imports:[d]})]}),m=p.story({name:`LightboxForGrid`,loaders:[async()=>({items:await s(`Nature`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items" gap="48">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"
               [style.object-fit]="'cover'"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <div class="grid">
        @for (item of items; track i; let i = $index) {
          <div class="grid-item"
               [lightboxFor]="lightbox"
               [lightboxIndex]="i">
            <img class="grid-image" loading="lazy" [src]="item.thumb"/>
          </div>
        }
      </div>
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
    `]})]}),h=p.story({name:`LightboxForGallery`,loaders:[async()=>({items:await s(`Ship`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <gallery [items]="items">
        <button *galleryItemDef="let item" [lightboxFor]="lightbox">
          <img galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
        </button>

        <gallery-nav/>

        <gallery-counter/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage
                 [src]="item.thumb"
                 [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
    </gallery>
    `})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'LightboxForGrid',
  loaders: [async () => ({
    items: await getHDImages('Nature')
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
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items" gap="48">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"
               [style.object-fit]="'cover'"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <div class="grid">
        @for (item of items; track i; let i = $index) {
          <div class="grid-item"
               [lightboxFor]="lightbox"
               [lightboxIndex]="i">
            <img class="grid-image" loading="lazy" [src]="item.thumb"/>
          </div>
        }
      </div>
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
})`,...m.input.parameters?.docs?.source}}},h.input.parameters={...h.input.parameters,docs:{...h.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'LightboxForGallery',
  loaders: [async () => ({
    items: await getHDImages('Ship')
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
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <gallery [items]="items">
        <button *galleryItemDef="let item" [lightboxFor]="lightbox">
          <img galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
        </button>

        <gallery-nav/>

        <gallery-counter/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage
                 [src]="item.thumb"
                 [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
    </gallery>
    \`
  })
})`,...h.input.parameters?.docs?.source}}},g=[`LightboxForGridExample`,`LightboxForGalleryExample`]})))()}export{init_LightboxFor_stories as i,m as n,f as r,h as t};