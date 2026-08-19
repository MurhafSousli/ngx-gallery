import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{i as t,n,o as r,t as i}from"./preview-_FN3rE7K.js";import{a,f as o,i as s,p as c,r as l,t as u}from"./pixabay.service-CQKQDv3x.js";var d,f,p,m,h;function init_Playground_stories(){return(init_Playground_stories=e((()=>{i(),t(),c(),a(),l(),d=n.type().meta({title:`Documentations/Playground`,component:o,decorators:[r({imports:[s]})],args:{debug:!0,thumbs:!0,thumbPosition:`bottom`,loop:!1,disableScroll:!1,disableMouseScroll:!1,itemSize:null,itemsPerView:1,orientation:`horizontal`,snapAlign:`center`,forceSnap:!1,scrollEase:{x1:.42,y1:0,x2:.58,y2:1},scrollDuration:468,resizeTransitionDuration:468,thickness:90,bullets:!0,nav:!0,imageSize:`contain`,thumbImageSize:`cover`,thumbsPerView:5,thumbSize:120,thumbSnapAlign:`center`,thumbForceSnap:!1,thumbDisabled:!1,disableThumbScroll:!1,disableThumbMouseScroll:!1,counterAlign:`bottom`,scrollBehavior:`smooth`,thumbFloating:!1},argTypes:{items:{control:!1,table:{defaultValue:{summary:`[]`}}},initialIndex:{control:!1,table:{defaultValue:{summary:`0`}}},gap:{control:{type:`number`,min:0,step:1},table:{defaultValue:{summary:`1`}}},itemsPerView:{control:{type:`number`,min:1,step:1},table:{defaultValue:{summary:`1`}}},itemSize:{control:{type:`text`},table:{defaultValue:{summary:`null`}}},scrollBehavior:{control:`radio`,options:[`smooth`,`auto`],table:{defaultValue:{summary:`smooth`}}},resizeDebounceTime:{control:{type:`number`,min:0,step:50},table:{defaultValue:{summary:`468`}}},scrollDuration:{control:{type:`number`,min:0,step:50},table:{defaultValue:{summary:`468`}}},scrollEase:{control:!1,table:{defaultValue:{summary:`{ x1: 0.42, y1: 0, x2: 0.58, y2: 1 }`}}},loop:{control:`boolean`,table:{defaultValue:{summary:`false`}}},disableScroll:{control:`boolean`,table:{defaultValue:{summary:`false`}}},disableMouseScroll:{control:`boolean`,table:{defaultValue:{summary:`false`}}},snapAlign:{control:`radio`,options:[`center`,`start`,`end`],table:{type:{summary:`'center' | 'start' | 'end'`},defaultValue:{summary:`'center'`}}},forceSnap:{control:`boolean`,table:{defaultValue:{summary:`false`}}},orientation:{control:`radio`,options:[`horizontal`,`vertical`],table:{type:{summary:`'horizontal' | 'vertical'`},defaultValue:{summary:`'horizontal'`}}},thumbPosition:{control:`radio`,options:[`top`,`bottom`,`start`,`end`],table:{type:{summary:`'top' | 'bottom' | 'start' | 'end'`},defaultValue:{summary:`'bottom'`}}},hasNext:{table:{disable:!0}},hasPrev:{table:{disable:!0}},renderedItems:{table:{disable:!0}},itemsCount:{table:{disable:!0}},next:{table:{disable:!0}},prev:{table:{disable:!0}},goTo:{table:{disable:!0}},visibleEntries:{table:{disable:!0}},isOneItemPerView:{table:{disable:!0}},anchorIndex:{table:{disable:!0}},activeIndex:{table:{disable:!0}},hasVisibleItems:{table:{disable:!0}},activeItem:{table:{disable:!0}}}}),f=d.story({loaders:[async()=>({items:await u(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [style.--g-item-image-size]="imageSize"
             [items]="items"
             [itemSize]="itemSize"
             [itemsPerView]="itemsPerView"
             [snapAlign]="snapAlign"
             [forceSnap]="forceSnap"
             [resizeDebounceTime]="resizeDebounceTime"
             [loop]="loop"
             [orientation]="orientation"
             [scrollDuration]="scrollDuration"
             [scrollBehavior]="scrollBehavior"
             [disableScroll]="disableScroll"
             [disableMouseScroll]="disableMouseScroll">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        @if (nav) {
          <gallery-nav/>
        }

        @if (counter) {
          <gallery-counter [align]="counterAlign"/>
        }

        @if (thumbs) {
          <gallery-thumbs [style.--g-thumb-image-size]="thumbImageSize"
                          [snapAlign]="thumbSnapAlign"
                          [forceSnap]="thumbForceSnap"
                          [itemsPerView]="thumbsPerView"
                          [itemSize]="thumbSize"
                          [thickness]="thickness"
                          [disableScroll]="disableThumbScroll"
                          [disableMouseScroll]="disableThumbMouseScroll"
                          [position]="thumbPosition"
                          [floating]="thumbFloating">
            <button *galleryItemDef="let item" galleryThumbClick>
              <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
            </button>
          </gallery-thumbs>
        }

        @if (debug) {
          <gallery-debug/>
        }
      </gallery>
    `})}),p=d.story({tags:[`!dev`],loaders:[async()=>({items:await u(`newyork`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `})}),m=d.story({tags:[`!dev`],loaders:[async()=>({items:await u(`newyork`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items" autoHeight>
        <gallery-nav/>
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `})}),f.input.parameters={...f.input.parameters,docs:{...f.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery [style.--g-item-image-size]="imageSize"
             [items]="items"
             [itemSize]="itemSize"
             [itemsPerView]="itemsPerView"
             [snapAlign]="snapAlign"
             [forceSnap]="forceSnap"
             [resizeDebounceTime]="resizeDebounceTime"
             [loop]="loop"
             [orientation]="orientation"
             [scrollDuration]="scrollDuration"
             [scrollBehavior]="scrollBehavior"
             [disableScroll]="disableScroll"
             [disableMouseScroll]="disableMouseScroll">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        @if (nav) {
          <gallery-nav/>
        }

        @if (counter) {
          <gallery-counter [align]="counterAlign"/>
        }

        @if (thumbs) {
          <gallery-thumbs [style.--g-thumb-image-size]="thumbImageSize"
                          [snapAlign]="thumbSnapAlign"
                          [forceSnap]="thumbForceSnap"
                          [itemsPerView]="thumbsPerView"
                          [itemSize]="thumbSize"
                          [thickness]="thickness"
                          [disableScroll]="disableThumbScroll"
                          [disableMouseScroll]="disableThumbMouseScroll"
                          [position]="thumbPosition"
                          [floating]="thumbFloating">
            <button *galleryItemDef="let item" galleryThumbClick>
              <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
            </button>
          </gallery-thumbs>
        }

        @if (debug) {
          <gallery-debug/>
        }
      </gallery>
    \`
  })
})`,...f.input.parameters?.docs?.source}}},p.input.parameters={...p.input.parameters,docs:{...p.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    \`
  })
})`,...p.input.parameters?.docs?.source}}},m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
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
      <gallery [items]="items" autoHeight>
        <gallery-nav/>
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    \`
  })
})`,...m.input.parameters?.docs?.source}}},h=[`Playground`,`BasicExample`,`AutoHeightExample`]})))()}init_Playground_stories();export{m as AutoHeightExample,p as BasicExample,f as Playground,h as __namedExportsOrder};