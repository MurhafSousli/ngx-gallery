import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-CJ1PzqyO.js";import{l as o,u as s}from"./angular-platform-C7BvCspe.js";import{a as c,d as l,i as u,n as d,r as f,t as p,u as m}from"./pixabay.service-5iiNeSx-.js";import{n as h,t as g}from"./helper-DIP3oNzo.js";var _=t({BasicThumbExample:()=>x,ThumbAutosizeExample:()=>w,ThumbDetachedExample:()=>T,ThumbDotsExample:()=>S,ThumbNavExample:()=>E,ThumbPositionExample:()=>C,Thumbnails:()=>b,__namedExportsOrder:()=>D}),v,y,b,x,S,C,w,T,E,D;function init_Thumbnails_stories(){return(init_Thumbnails_stories=e((()=>{a(),n(),s(),c(),l(),f(),h(),{fn:v}=__STORYBOOK_MODULE_TEST__,y=r.meta({title:`Documentations/Thumbnails`,component:m,decorators:[i({imports:[u,o]})],args:{position:`bottom`,itemSize:120,thickness:90,itemsPerView:1,gap:1,scrollBehavior:`smooth`,scrollDuration:268,steps:`page`,loop:!1,detach:!1,floating:!1,snapAlign:`center`,forceSnap:!1,disableScroll:!1,disableMouseScroll:!1,activeIndexChange:v(),anchorIndexChange:v()},argTypes:{...g,thickness:{control:{type:`number`,min:0,step:10},table:{defaultValue:{summary:`90`}}},detach:{control:`boolean`,table:{defaultValue:{summary:`false`}}},floating:{control:`boolean`,table:{defaultValue:{summary:`false`}}},position:{control:`radio`,options:[`top`,`bottom`,`start`,`end`],table:{type:{summary:`'top' | 'bottom' | 'start' | 'end'`},defaultValue:{summary:`'bottom'`}}},orientation:{control:!1,table:{type:{summary:`signal<'horizontal' | 'vertical'>`},defaultValue:{summary:null}}},resizeDebounceTime:{control:!1,table:{disable:!0}},scrollEase:{control:!1,table:{disable:!0}}}}),b=y.story({loaders:[async()=>({items:await p(`Diamond`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs [position]="position"
                        [gap]="gap"
                        [initialIndex]="initialIndex"
                        [thickness]="thickness"
                        [itemSize]="itemSize"
                        [itemsPerView]="itemsPerView"
                        [snapAlign]="snapAlign"
                        [forceSnap]="forceSnap"
                        [scrollBehavior]="scrollBehavior"
                        [scrollDuration]="scrollDuration"
                        [disableMouseScroll]="disableMouseScroll"
                        [disableScroll]="disableScroll"
                        [detach]="detach"
                        [loop]="loop"
                        [floating]="floating">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `})}),x=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide" [style.background]="item.src">Slide {{ i + 1 }}</div>

        <gallery-thumbs floating itemSize="6" thickness="6" gap="6">
          <button *galleryItemDef="let item; index as i" class="dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    `,styles:[`
      gallery-thumbs {
        margin: 20px;
      }
    `]})}),S=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" style="gap: 10px" [items]="items" orientation="vertical" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="end" itemSize="10" thickness="10" gap="6">
          <button *galleryItemDef="let item" galleryThumbClick class="slide dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    `,styles:[`
      .dot-thumb {
        background: #4b5659;
        border-radius: 50%;
        opacity: 0.5; /* Slightly dimmer when inactive */
        transition: opacity 0.2s ease;
        overflow: hidden;
      }

      .g-slider-item.g-active-item .dot-thumb {
        color: Canvas;
        background: #b4e900;
        background: linear-gradient(0deg, #87de1d, #b4e900);
      }
    `]})}),C=y.story({tags:[`!dev`],loaders:[async()=>({items:await d()})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="start" itemSize="100">
          <button *galleryItemDef="let item; index as i"  galleryThumbClick>
            <div class="slide-thumb">{{ i + 1 }}</div>
          </button>
        </gallery-thumbs>
      </gallery>
    `,styles:[`
      .gallery-example {
        height: 300px !important;
      }
    `]})}),w=y.story({tags:[`!dev`],loaders:[async()=>({items:await p(`flowers`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs itemSize="auto">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `})}),T=y.story({tags:[`!dev`],loaders:[async()=>({items:await p(`rocket`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs detach>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `})}),E=y.story({tags:[`!dev`],loaders:[async()=>({items:await p(`rocket`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery class="g-glass-theme" [items]="items">
        <img *galleryItemDef="let item" galleryImage [ngSrc]="item.src" [placeholder]="item.placeholder" fill [alt]="item.alt"/>

        <gallery-nav/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [ngSrc]="item.thumb" [placeholder]="item.placeholder"  fill [alt]="item.alt + '_thumb'"/>
          </button>
          <gallery-nav/>
        </gallery-thumbs>
      </gallery>
    `})}),b.input.parameters={...b.input.parameters,docs:{...b.input.parameters?.docs,source:{originalSource:`meta.story({
  loaders: [async () => ({
    items: await getHDImages('Diamond')
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
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs [position]="position"
                        [gap]="gap"
                        [initialIndex]="initialIndex"
                        [thickness]="thickness"
                        [itemSize]="itemSize"
                        [itemsPerView]="itemsPerView"
                        [snapAlign]="snapAlign"
                        [forceSnap]="forceSnap"
                        [scrollBehavior]="scrollBehavior"
                        [scrollDuration]="scrollDuration"
                        [disableMouseScroll]="disableMouseScroll"
                        [disableScroll]="disableScroll"
                        [detach]="detach"
                        [loop]="loop"
                        [floating]="floating">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
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
        <div *galleryItemDef="let item; index as i" class="slide" [style.background]="item.src">Slide {{ i + 1 }}</div>

        <gallery-thumbs floating itemSize="6" thickness="6" gap="6">
          <button *galleryItemDef="let item; index as i" class="dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    \`,
    styles: [\`
      gallery-thumbs {
        margin: 20px;
      }
    \`]
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
      <gallery class="gallery-example" style="gap: 10px" [items]="items" orientation="vertical" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="end" itemSize="10" thickness="10" gap="6">
          <button *galleryItemDef="let item" galleryThumbClick class="slide dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    \`,
    styles: [\`
      .dot-thumb {
        background: #4b5659;
        border-radius: 50%;
        opacity: 0.5; /* Slightly dimmer when inactive */
        transition: opacity 0.2s ease;
        overflow: hidden;
      }

      .g-slider-item.g-active-item .dot-thumb {
        color: Canvas;
        background: #b4e900;
        background: linear-gradient(0deg, #87de1d, #b4e900);
      }
    \`]
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
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="start" itemSize="100">
          <button *galleryItemDef="let item; index as i"  galleryThumbClick>
            <div class="slide-thumb">{{ i + 1 }}</div>
          </button>
        </gallery-thumbs>
      </gallery>
    \`,
    styles: [\`
      .gallery-example {
        height: 300px !important;
      }
    \`]
  })
})`,...C.input.parameters?.docs?.source}}},w.input.parameters={...w.input.parameters,docs:{...w.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getHDImages('flowers')
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
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs itemSize="auto">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    \`
  })
})`,...w.input.parameters?.docs?.source}}},T.input.parameters={...T.input.parameters,docs:{...T.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getHDImages('rocket')
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
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs detach>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    \`
  })
})`,...T.input.parameters?.docs?.source}}},E.input.parameters={...E.input.parameters,docs:{...E.input.parameters?.docs,source:{originalSource:`meta.story({
  tags: ['!dev'],
  loaders: [async () => ({
    items: await getHDImages('rocket')
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
      <gallery class="g-glass-theme" [items]="items">
        <img *galleryItemDef="let item" galleryImage [ngSrc]="item.src" [placeholder]="item.placeholder" fill [alt]="item.alt"/>

        <gallery-nav/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [ngSrc]="item.thumb" [placeholder]="item.placeholder"  fill [alt]="item.alt + '_thumb'"/>
          </button>
          <gallery-nav/>
        </gallery-thumbs>
      </gallery>
    \`
  })
})`,...E.input.parameters?.docs?.source}}},D=[`Thumbnails`,`BasicThumbExample`,`ThumbDotsExample`,`ThumbPositionExample`,`ThumbAutosizeExample`,`ThumbDetachedExample`,`ThumbNavExample`]})))()}export{C as a,init_Thumbnails_stories as c,E as i,w as n,b as o,S as r,_ as s,x as t};