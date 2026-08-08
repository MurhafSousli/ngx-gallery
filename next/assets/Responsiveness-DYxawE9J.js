import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{l as t,u as n}from"./blocks-DJ1APemM.js";import{a as r}from"./chunk-W22LQPXL-CChX7ad3.js";import{i,r as a}from"./react-NI1vexfW.js";function _createMdxContent(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,strong:`strong`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{title:`Addons/Responsiveness`}),`
`,(0,o.jsx)(n.h1,{id:`responsiveness`,children:`Responsiveness`}),`
`,(0,o.jsxs)(n.p,{children:[`To modify the gallery configuration for smaller screens, including adjustments to thumbnail positioning and size,
`,(0,o.jsx)(n.a,{href:`https://material.angular.dev/cdk/layout/overview`,rel:`nofollow`,children:`Angular CDK Layout`}),` provides an effective solution.`]}),`
`,(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:`Example`})}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-html`,children:`<gallery>
  <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

  <gallery-thumbs [position]="layout().thumbPosition"
                  [width]="layout().thumbWidth"
                  [height]="layout().thumbHeight">
    <button *galleryItemDef="let item" galleryThumbClick>
      <img galleryImage [src]="item.thumb" [alt]="item.alt"/>
    </button>
  </gallery-thumbs>
</gallery>
`})}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-ts`,children:`@Component({ ... })
export class ResponsiveLayoutComponent {

  private isSmallScreen$ = inject(BreakpointObserver)
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(map(result => result.matches));

  private isSmallScreen = toSignal(this.isSmallScreen$, { initialValue: false });

  layout = computed(() => {
    if (this.isSmallScreen()) {
      return {
        thumbPosition: 'bottom',
        thumbWidth: 80,
        thumbHeight: 80
      };
    }
    return {
      thumbPosition: 'start',
      thumbWidth: 120,
      thumbHeight: 90
    };
  })
}
`})})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var o;function init_Responsiveness(){return(init_Responsiveness=e((()=>{o=r(),a(),n()})))()}init_Responsiveness();export{MDXContent as default};