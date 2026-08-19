import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{l as o,u as s}from"./angular-platform-C1Qx4yaX.js";import{a as c,f as l,i as u,n as d,p as f,r as p,t as m}from"./pixabay.service-CQKQDv3x.js";import{n as h,t as g}from"./helper-DIP3oNzo.js";var _=t({AutoHeightExample:()=>w,BasicExample:()=>x,GalleryExample:()=>b,GapExample:()=>S,MultipleExample:()=>C,__namedExportsOrder:()=>T}),v,y,b,x,S,C,w,T;function init_Gallery_stories(){return(init_Gallery_stories=e((()=>{a(),n(),s(),f(),c(),p(),h(),{fn:v}=__STORYBOOK_MODULE_TEST__,y=r.meta({title:`Documentations/Gallery`,component:l,decorators:[i({imports:[u,o]})],args:{loop:!1,snapAlign:`center`,forceSnap:!1,disableScroll:!1,disableMouseScroll:!1,itemsPerView:1,gap:1,steps:1,itemSize:null,orientation:`horizontal`,scrollBehavior:`smooth`,scrollDuration:468,resizeDebounceTime:468,scrollEase:{x1:.42,y1:0,x2:.58,y2:1},activeIndexChange:v(),anchorIndexChange:v()},argTypes:{items:{control:!1,table:{defaultValue:{summary:`[]`}}},...g}}),b=y.story({name:`Gallery`,loaders:[async()=>({items:await m(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items"
               [loop]="loop"
               [gap]="gap"
               [itemsPerView]="itemsPerView"
               [itemSize]="itemSize"
               [steps]="steps"
               [snapAlign]="snapAlign"
               [forceSnap]="forceSnap"
               [resizeDebounceTime]="resizeDebounceTime"
               [orientation]="orientation"
               [scrollDuration]="scrollDuration"
               [scrollBehavior]="scrollBehavior"
               [disableScroll]="disableScroll"
               [disableMouseScroll]="disableMouseScroll"
               (activeIndexChange)="activeIndexChange($event)"
               (anchorIndexChange)="anchorIndexChange($event)">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        <gallery-nav/>
      </gallery>
    `})}),x=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),S=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="1.4" forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),C=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `})}),w=y.story({tags:[`!dev`],loaders:[async()=>({items:await m(`newyork`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" autoHeight>
        <div *galleryItemDef="let item; index as i"
             class="slide"
             [style.height.px]="i % 2 == 1 ? 150 : 200">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav outside/>
      </gallery>
    `,styles:[`
      gallery.gallery-example {
        height: unset !important;
      }
    `]})}),b.input.parameters={...b.input.parameters,docs:{...b.input.parameters?.docs,source:{originalSource:`meta.story({
  name: 'Gallery',
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
      <gallery [items]="items"
               [loop]="loop"
               [gap]="gap"
               [itemsPerView]="itemsPerView"
               [itemSize]="itemSize"
               [steps]="steps"
               [snapAlign]="snapAlign"
               [forceSnap]="forceSnap"
               [resizeDebounceTime]="resizeDebounceTime"
               [orientation]="orientation"
               [scrollDuration]="scrollDuration"
               [scrollBehavior]="scrollBehavior"
               [disableScroll]="disableScroll"
               [disableMouseScroll]="disableMouseScroll"
               (activeIndexChange)="activeIndexChange($event)"
               (anchorIndexChange)="anchorIndexChange($event)">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        <gallery-nav/>
      </gallery>
    \`
  })
})`,...b.input.parameters?.docs?.source}}},x.input.parameters={...x.input.parameters,docs:{...x.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    \`
  })
})`,...x.input.parameters?.docs?.source}}},S.input.parameters={...S.input.parameters,docs:{...S.input.parameters?.docs,source:{originalSource:`meta.story({
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
})`,...S.input.parameters?.docs?.source}}},C.input.parameters={...C.input.parameters,docs:{...C.input.parameters?.docs,source:{originalSource:`meta.story({
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
})`,...C.input.parameters?.docs?.source}}},w.input.parameters={...w.input.parameters,docs:{...w.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getHDImages('newyork')
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
      <gallery class="gallery-example" [items]="items" autoHeight>
        <div *galleryItemDef="let item; index as i"
             class="slide"
             [style.height.px]="i % 2 == 1 ? 150 : 200">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav outside/>
      </gallery>
    \`,
    styles: [\`
      gallery.gallery-example {
        height: unset !important;
      }
    \`]
  })
})`,...w.input.parameters?.docs?.source}}},T=[`GalleryExample`,`BasicExample`,`GapExample`,`MultipleExample`,`AutoHeightExample`]})))()}export{init_Gallery_stories as a,_ as i,x as n,b as r,w as t};