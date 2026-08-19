import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,n as r,o as i,t as a}from"./preview-_FN3rE7K.js";import{a as o,i as s,o as c,r as l,s as u,t as d}from"./pixabay.service-CQKQDv3x.js";var f=t({Autoplay:()=>m,__namedExportsOrder:()=>h}),p,m,h;function init_Autoplay_stories(){return(init_Autoplay_stories=e((()=>{a(),n(),u(),o(),l(),p=r.meta({title:`Addons/Autoplay`,component:c,decorators:[i({imports:[s]})],args:{autoplay:!0,autoplayInterval:3e3,autoplayScrollBehavior:`smooth`},argTypes:{autoplay:{control:`boolean`,table:{defaultValue:{summary:`true`}}},autoplayInterval:{control:{type:`number`,min:0,step:500},table:{defaultValue:{summary:`3000`}}},autoplayScrollBehavior:{control:`radio`,options:[`smooth`,`auto`],table:{defaultValue:{summary:`smooth`}}}}}),m=p.story({loaders:[async()=>({items:await d(`Boat`)})],render:(e,{loaded:{items:t}})=>({props:{...e,items:t},template:`
      <gallery [items]="items"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `})}),m.input.parameters={...m.input.parameters,docs:{...m.input.parameters?.docs,source:{originalSource:`meta.story({
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
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    \`
  })
})`,...m.input.parameters?.docs?.source}}},h=[`Autoplay`]})))()}export{f as n,init_Autoplay_stories as r,m as t};