!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@angular/core"),require("@angular/common"),require("rxjs/BehaviorSubject"),require("rxjs/Observable"),require("rxjs/Subject"),require("rxjs/add/observable/of"),require("rxjs/add/observable/interval"),require("rxjs/add/operator/switchMap"),require("rxjs/add/operator/finally"),require("rxjs/add/operator/take"),require("rxjs/add/operator/takeWhile"),require("rxjs/add/operator/do"),require("@angular/animations"),require("rxjs/add/observable/fromEvent"),require("rxjs/add/observable/from"),require("rxjs/add/operator/map")):"function"==typeof define&&define.amd?define(["exports","@angular/core","@angular/common","rxjs/BehaviorSubject","rxjs/Observable","rxjs/Subject","rxjs/add/observable/of","rxjs/add/observable/interval","rxjs/add/operator/switchMap","rxjs/add/operator/finally","rxjs/add/operator/take","rxjs/add/operator/takeWhile","rxjs/add/operator/do","@angular/animations","rxjs/add/observable/fromEvent","rxjs/add/observable/from","rxjs/add/operator/map"],t):t(e.ngGallery=e.ngGallery||{},e.ng.core,e.ng.common,e.Rx,e.Rx,e.Rx,e.Rx.Observable,e.Rx.Observable,e.Rx.Observable.prototype,e.Rx.Observable.prototype,e.Rx.Observable.prototype,e.Rx.Observable.prototype,e.Rx.Observable.prototype,e.ng.common)}(this,function(e,t,n,i,r,a,o,s,l,c,g,d,p,y){"use strict";function u(e){return new f(e)}var m={images:void 0,prevIndex:0,currIndex:0,hasNext:void 0,hasPrev:void 0,active:!1},b={style:{background:"#121519",width:"900px",height:"500px"},animation:"fade",loader:{width:"50px",height:"50px",position:"center",icon:"oval"},description:{position:"bottom",overlay:!1,text:!0,counter:!0,style:{color:"red"}},bullets:!1,player:{autoplay:!1,speed:3e3},thumbnails:{width:120,height:90,position:"left",space:30}},f=function(){function e(e){var t=this;this.config=b,this.state=new i.BehaviorSubject(m),this.config=Object.assign({},b,e),this.player=new a.Subject,this.player.switchMap(function(e){return e?t.playerEngine(e):r.Observable.of(null)}).subscribe()}return e.prototype.load=function(e){this.state.next({images:e,currIndex:0,hasNext:e.length>1,hasPrev:!1,active:!1})},e.prototype.set=function(e){var t=this.state.getValue();this.state.next(Object.assign({},t,{prevIndex:t.currIndex,currIndex:e,hasNext:e<t.images.length-1,hasPrev:e>0,active:!0}))},e.prototype.next=function(){var e=this.state.getValue();if(e.hasNext){var t=e.currIndex+1;this.set(t)}else this.set(0)},e.prototype.prev=function(){var e=this.state.getValue();if(e.hasPrev){var t=e.currIndex-1;this.set(t)}else this.set(e.images.length-1)},e.prototype.close=function(){var e=this.state.getValue();this.state.next(Object.assign({},e,{active:!1,play:!1})),this.stop()},e.prototype.reset=function(){this.state.next(m),this.stop()},e.prototype.play=function(e){var t=e||this.config.player.speed||2e3,n=this.state.getValue();this.state.next(Object.assign({},n,{play:!0,active:!0})),this.player.next(t)},e.prototype.stop=function(){this.player.next(0)},e.prototype.playerEngine=function(e){var t=this;return r.Observable.interval(e).takeWhile(function(){return t.state.getValue().play}).do(function(){t.next()}).finally(function(){t.state.next(Object.assign({},t.state.getValue(),{play:!1}))})},e}();f.decorators=[{type:t.Injectable}],f.ctorParameters=function(){return[{type:void 0,decorators:[{type:t.Optional}]}]};var x=function(){function e(e){this.gallery=e}return e.prototype.ngOnDestroy=function(){this.gallery.reset()},e}();x.decorators=[{type:t.Component,args:[{selector:"gallery",template:'<gallery-main *ngIf="gallery.state | async as state" [state]="state" [config]="gallery.config"></gallery-main>',changeDetection:t.ChangeDetectionStrategy.OnPush,styles:["\n    gallery-main{display:-webkit-box;display:-ms-flexbox;display:flex;height:500px}\n  "]}]}],x.ctorParameters=function(){return[{type:f}]};var h=function(){function e(e){this.gallery=e}return e}();h.decorators=[{type:t.Component,args:[{selector:"gallery-nav",template:'\n    <div *ngIf="state.images.length > 1" class="g-nav">\n\n      <div class="g-nav-prev" (click)="gallery.prev()">\n        <i class="prev-arrow-ico"></i>\n      </div>\n\n      <div class="g-nav-next" (click)="gallery.next()">\n        <i class="next-arrow-ico"></i>\n      </div>\n\n    </div>\n  ',styles:["\n    *{box-sizing:border-box}:host{z-index:1;position:absolute;left:0;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex}@media (max-width:480px){:host{display:none}}.g-nav{-webkit-box-flex:1;-ms-flex:1;flex:1;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;opacity:0;transition:all .4s linear;cursor:pointer}.g-nav:hover{opacity:1}.g-nav-next,.g-nav-prev{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;opacity:.7;position:relative;overflow:hidden;transition:all .2s ease;z-index:0}.g-nav-next:hover,.g-nav-prev:hover{opacity:1}.g-nav-next{padding-right:.7em;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.g-nav-prev{padding-left:.7em;width:20%}.next-arrow-ico,.prev-arrow-ico{width:45px;height:80px}.next-arrow-ico{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PiAgPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQxNC40OTYgNDE0LjQ5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDE0LjQ5NiA0MTQuNDk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxkZWZzIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iZHJvcHNoYWRvdyIgPiAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSIzIi8+ICAgPGZlT2Zmc2V0IGR4PSIyIiBkeT0iMiIgcmVzdWx0PSJvZmZzZXRibHVyIi8+ICAgPGZlTWVyZ2U+IDxmZU1lcmdlTm9kZS8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+ICAgPC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz4gIDxwb2x5Z29uIHN0eWxlPSJmaWxsOiNmZmY7IiBmaWx0ZXI9InVybCgjZHJvcHNoYWRvdykiIHBvaW50cz0iMTE4LjEyNiwwIDg5Ljc5NiwyOC4yMzggMjY4LjIyMywyMDcuMjQ4IDg5Ljc5NiwzODYuMjU4IDExOC4xMjYsNDE0LjQ5NiAzMjQuNywyMDcuMjQ4ICIvPjwvc3ZnPg==) no-repeat 50%}.prev-arrow-ico{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MTQuNDk2IDQxNC40OTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxNC40OTYgNDE0LjQ5NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxkZWZzIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iZHJvcHNoYWRvdyIgPiAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSIzIi8+ICAgPGZlT2Zmc2V0IGR4PSIyIiBkeT0iMiIgcmVzdWx0PSJvZmZzZXRibHVyIi8+ICAgPGZlTWVyZ2U+IDxmZU1lcmdlTm9kZS8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+ICAgPC9mZU1lcmdlPjwvZmlsdGVyPjwvZGVmcz48cG9seWdvbiBzdHlsZT0iZmlsbDojZmZmOyIgZmlsdGVyPSJ1cmwoI2Ryb3BzaGFkb3cpIiBwb2ludHM9IjMyNC43LDI4LjIzOCAyOTYuMzcsMCA4OS43OTYsMjA3LjI0OCAyOTYuMzcsNDE0LjQ5NiAzMjQuNywzODYuMjU4IDE0Ni4yNzMsMjA3LjI0OCAiLz48L3N2Zz4=) no-repeat 50%}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],h.ctorParameters=function(){return[{type:f}]},h.propDecorators={state:[{type:t.Input}]};var v=function(){function e(e,t,n){this.gallery=e,this.el=t,this.renderer=n}return e.prototype.ngOnInit=function(){var e=this;if(this.contStyle=this.getContainerStyle(),this.gallery.config.gestures){if("undefined"==typeof Hammer)throw Error("[NgGallery]: HammerJS is undefined, make sure it is loaded");var t=this.el.nativeElement,n=new Hammer(t);n.on("panstart",function(){e.renderer.removeClass(t,"g-pan-reset")}),n.on("panend",function(){e.renderer.addClass(t,"g-pan-reset")}),n.on("pan",function(n){e.renderer.setStyle(t,"transform","translate3d("+n.deltaX+"px, 0px, 0px)")}),n.on("swipeleft",function(){e.gallery.next()}),n.on("swiperight",function(){e.gallery.prev()})}},e.prototype.translateThumbs=function(){return"translate3d("+-(this.state.currIndex*this.config.width+this.config.width/2)+"px, 0, 0)"},e.prototype.getContainerStyle=function(){var e="top"===this.config.position?0:2;return this.renderer.setStyle(this.el.nativeElement,"order",e),{height:this.config.height+"px",margin:this.config.space+"px"}},e.prototype.getThumbImage=function(e){return"url("+(this.state.images[e].thumbnail||this.state.images[e].src)+")"},e}();v.decorators=[{type:t.Component,args:[{selector:"gallery-thumb",template:'\n    <div #container class="g-thumb-container" [ngStyle]="contStyle">\n\n      <div class="g-thumbs" [style.transform]="translateThumbs()">\n\n        <div class="g-thumb" *ngFor="let image of state.images; let i = index"\n             [class.g-thumb-current]="i === state.currIndex"\n             [style.width.px]="gallery.config.thumbnails.width"\n             [style.height.px]="gallery.config.thumbnails.height">\n\n          <div class="g-thumb-image" [style.backgroundImage]="getThumbImage(i)"\n               [tap] (tapClick)="gallery.set(i)">\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  ',styles:["\n    :host{display:block;z-index:1}.g-thumb-container{position:relative;z-index:2;width:100%;height:100%;left:0}.g-thumb-container,.g-thumbs{top:0;display:-webkit-box;display:-ms-flexbox;display:flex}.g-thumbs{position:absolute;left:50%;-webkit-box-align:center;-ms-flex-align:center;align-items:center;transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in;transition:transform .3s ease-in,-webkit-transform .3s ease-in;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-thumb{padding:8px;opacity:.5;transition:all .2s linear}.g-thumb-image{cursor:pointer;width:100%;height:100%;background-position:50%;background-size:cover;box-shadow:0 0 4px rgba(0,0,0,.3)}.g-thumb-current{opacity:1;padding:2px}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],v.ctorParameters=function(){return[{type:f},{type:t.ElementRef},{type:t.Renderer2}]},v.propDecorators={state:[{type:t.Input}],config:[{type:t.Input}]};var w=function(){function e(e,t){this.el=e,this.renderer=t}return e.prototype.ngOnInit=function(){var e=this.el.nativeElement;this.config.overlay&&this.renderer.setStyle(e,"position","absolute"),"top"===this.config.position?(this.renderer.setStyle(e,"order",0),this.renderer.setStyle(e,"top",0),this.renderer.setStyle(e,"bottom","unset")):(this.renderer.setStyle(e,"order",2),this.renderer.setStyle(e,"top","unset"),this.renderer.setStyle(e,"bottom",0))},e}();w.decorators=[{type:t.Component,args:[{selector:"gallery-text",template:'\n    <div class="g-text-container" [ngStyle]="config.style">\n      <div *ngIf="config.text" class="g-text" [innerHtml]="state.images[state.currIndex]?.text">\n      </div>\n      <div *ngIf="config.counter" class="g-number">\n        {{(state.currIndex + 1) + \'/\' + state.images.length}}\n      </div>\n    </div>\n  ',styles:["\n    *{box-sizing:border-box}:host{position:relative;left:0;right:0;z-index:1}.g-text-container{padding:1em 2em;color:#ccc;font-size:13px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:center;align-content:center;background-clip:padding-box;-webkit-font-smoothing:antialiased}.g-text{-webkit-box-flex:1;-ms-flex:1;flex:1}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],w.ctorParameters=function(){return[{type:t.ElementRef},{type:t.Renderer2}]},w.propDecorators={state:[{type:t.Input}],config:[{type:t.Input}]};var I=[y.trigger("imgAnimate",[y.state("fade",y.style({opacity:1})),y.transition("none => fade",[y.style({opacity:0}),y.animate("0.5s ease-in")])])],k=function(){function e(e,t,n){this.gallery=e,this.el=t,this.renderer=n}return e.prototype.ngOnInit=function(){var e=this;if(this.config.gestures){if("undefined"==typeof Hammer)throw Error("[NgGallery]: HammerJS is undefined, make sure it is loaded");var t=this.el.nativeElement,n=new Hammer(t);n.on("panstart",function(){e.renderer.removeClass(t,"g-pan-reset")}),n.on("panend",function(){e.renderer.addClass(t,"g-pan-reset")}),n.on("pan",function(n){e.renderer.setStyle(t,"transform","translate3d("+n.deltaX+"px, 0px, 0px)")}),n.on("swipeleft",function(){e.gallery.next()}),n.on("swiperight",function(){e.gallery.prev()})}},e.prototype.imageLoad=function(e){if(this.loading=!e,e)switch(this.config.animation){case"fade":this.animate="fade";break;default:this.animate="none"}else this.animate="none"},e}();k.decorators=[{type:t.Component,args:[{selector:"gallery-image",template:'\n    <div [@imgAnimate]="animate" class="g-image">\n      <img [lazyImage]="state.images[state.currIndex].src" (lazyLoad)="imageLoad($event)">\n    </div>\n\n    <gallery-loader *ngIf="loading" [config]="config.loader"></gallery-loader>\n  ',styles:["\n    :host{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:1;-ms-flex:1;flex:1;flex-direction:column;-webkit-transform:translateZ(0);transform:translateZ(0)}.g-image,:host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column}.g-image{position:absolute;left:0;right:0;top:0;bottom:0;background-repeat:no-repeat;background-size:contain;background-position:50%;z-index:1;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.g-image img{box-shadow:0 0 4px rgba(0,0,0,.3);pointer-events:none;display:block;max-width:100%;max-height:100%}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush,animations:I}]}],k.ctorParameters=function(){return[{type:f},{type:t.ElementRef},{type:t.Renderer2}]},k.propDecorators={state:[{type:t.Input}],config:[{type:t.Input}]};var j=function(){function e(e){this.gallery=e}return e.prototype.ngOnInit=function(){this.icon=this.getIcon(),this.styles=this.getStyle()},e.prototype.getIcon=function(){switch(this.config.icon){case"puff":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/puff.svg";case"spinning-circles":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg";case"three-dots":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/three-dots.svg";case"oval":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/oval.svg";case"ball-triangle":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg";case"bars":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/bars.svg";case"tail-spin":return"https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/tail-spin.svg";default:return this.config.icon}},e.prototype.getStyle=function(){switch(this.config.position){case"topLeft":return{"align-items":"flex-start","justify-content":"flex-start"};case"topRight":return{"align-items":"flex-start","justify-content":"flex-end"};case"bottomLeft":return{"align-items":"flex-end","justify-content":"flex-start"};case"bottomRight":return{"align-items":"flex-end","justify-content":"flex-end"};default:return{"align-items":"center","justify-content":"center"}}},e}();j.decorators=[{type:t.Component,args:[{selector:"gallery-loader",template:'\n    <div class="g-loader" [ngStyle]="styles">\n      <img [src]="icon" [style.width]="config.width" [style.height]="config.height"/>\n    </div>\n  ',styles:["\n    *{box-sizing:border-box}:host{z-index:1}.g-loader{z-index:2;position:absolute;width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;padding:1em}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],j.ctorParameters=function(){return[{type:f}]},j.propDecorators={config:[{type:t.Input}]};var S=function(){function e(e){this.gallery=e,this.closeButton=!0}return e.prototype.keyboardInput=function(e){switch(e.keyCode){case 37:this.gallery.prev();break;case 39:case 13:this.gallery.next();break;case 27:this.gallery.close();break;default:return}},e.prototype.ngOnDestroy=function(){this.gallery.reset()},e}();S.decorators=[{type:t.Component,args:[{selector:"gallery-modal",template:'\n    <div *ngIf="gallery.state | async as state">\n\n      <div *ngIf="state.active" class="g-modal">\n\n        <div class="g-btn-close-container">\n          <div *ngIf="closeButton" class="g-btn-close" (click)="gallery.close()"></div>\n        </div>\n\n        <gallery-main [@popup] [state]="state" [config]="gallery.config"></gallery-main>\n\n        <div class="g-overlay" (click)="gallery.close()"></div>\n\n      </div>\n\n    </div>\n  ',styles:["\n    *{box-sizing:border-box}.g-modal{position:fixed;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.6);z-index:1;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}@media (max-width:480px){.g-modal{padding:0}}.g-overlay{position:absolute;left:0;right:0;top:0;bottom:0}.g-btn-close-container{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}@media (max-width:480px){.g-btn-close-container{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.g-btn-close-container .g-btn-close{margin:.5em;position:relative;right:0;top:0}}.g-btn-close{position:absolute;right:1em;top:1em;z-index:2;cursor:pointer;width:30px;height:30px;transition:all .2s linear;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MCA1MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Q3NUE0QTsiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIvPjxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgcG9pbnRzPSIxNiwzNCAyNSwyNSAzNCwxNiAiLz48cG9seWxpbmUgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHBvaW50cz0iMTYsMTYgMjUsMjUgMzQsMzQgIi8+PC9zdmc+)}.g-btn-close:active{-webkit-transform:rotate(180deg) scale(.9);transform:rotate(180deg) scale(.9)}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush,animations:[y.trigger("popup",[y.state("in",y.style({opacity:.8,transform:"scale(0.2) translate3d(0, 100px, 0)"})),y.transition("void => *",[y.style({opacity:.8,transform:"scale(0.2) translate3d(0, 100px, 0)"}),y.animate(300)]),y.transition("* => void",[y.animate(300,y.style({opacity:1,transform:"scale(1)  translate3d(0, 0, 0)"}))])])]}]}],S.ctorParameters=function(){return[{type:f}]},S.propDecorators={closeButton:[{type:t.Input}],keyboardInput:[{type:t.HostListener,args:["window:keydown",["$event"]]}]};var z=function(){function e(e,t,n){this.gallery=e,this.renderer=t,this.el=n}return e.prototype.ngOnInit=function(){if(this.config.position){var e=void 0,t=void 0,n=void 0,i="unset",r="unset";switch(this.config.position){case"bottom":e="row",n="auto",t="100%","unset",r="0";break;case"left":e="column",t="auto",n="100%";break;case"right":t="auto",n="100%",e="column",i="0";break;default:e="row",n="auto",t="100%"}this.renderer.setStyle(this.el.nativeElement,"right",i),this.renderer.setStyle(this.el.nativeElement,"bottom",r),this.renderer.setStyle(this.el.nativeElement,"width",t),this.renderer.setStyle(this.el.nativeElement,"height",n),this.renderer.setStyle(this.el.nativeElement,"flex-direction",e)}},e}();z.decorators=[{type:t.Component,args:[{selector:"gallery-bullets",template:'\n    <div class="g-bullet"\n         *ngFor="let image of state.images; let i = index"\n         [class.g-bullet-curr]="i === state.currIndex"\n         (click)="gallery.set(i)">\n\n      <div class="g-bullet-inner" [ngStyle]="config.style"></div>\n\n    </div>\n  ',styles:["\n    :host{position:absolute;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.g-bullet,:host{display:-webkit-box;display:-ms-flexbox;display:flex}.g-bullet{cursor:pointer;z-index:1}.g-bullet-inner{margin:1em;height:4px;width:4px;background-color:hsla(0,0%,100%,.5);border-radius:2px;box-shadow:0 0 6px rgba(0,0,0,.8);transition:all .2s ease}.g-bullet-curr .g-bullet-inner{-webkit-transform:scale(1.5);transform:scale(1.5);background-color:#fff}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],z.ctorParameters=function(){return[{type:f},{type:t.Renderer2},{type:t.ElementRef}]},z.propDecorators={state:[{type:t.Input}],config:[{type:t.Input}]};var Z=function(){function e(e){this.gallery=e}return e.prototype.ngOnInit=function(){this.config.autoplay&&this.gallery.play()},e}();Z.decorators=[{type:t.Component,args:[{selector:"gallery-player",template:'\n    \x3c!--<div class="g-player-btns">--\x3e\n      \x3c!--<div *ngIf="!state.play" class="g-player-btn" (click)="gallery.play()">▶</div>--\x3e\n      \x3c!--<div *ngIf="state.play" class="g-player-btn" (click)="gallery.stop()">⏸</div>--\x3e\n    \x3c!--</div>--\x3e\n  ',styles:["\n    :host{position:absolute;z-index:1}.g-player-btns{display:-webkit-box;display:-ms-flexbox;display:flex;padding:.5em 1em}.g-player-btn{margin-right:.5em;color:#fff;cursor:pointer}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush}]}],Z.ctorParameters=function(){return[{type:f}]},Z.propDecorators={config:[{type:t.Input}],state:[{type:t.Input}]};var D=function(){function e(e){this.gallery=e}return e.prototype.ngOnInit=function(){var e=this.config.thumbnails.position;this.thumbDirection="left"===e||"right"===e?"row":"column"},e}();D.decorators=[{type:t.Component,args:[{selector:"gallery-main",template:'\n    <div class="g-container" [style.flexDirection]="thumbDirection" [ngStyle]="config.style">\n\n      <gallery-thumb *ngIf="config.thumbnails" [state]="state" [config]="config.thumbnails"\n                     [style.background]="config.style?.background"></gallery-thumb>\n\n      <div class="g-box">\n\n        <div class="g-image-box">\n\n          <gallery-image [state]="state" [config]="config" (loading)="loading = $event"></gallery-image>\n\n          <gallery-nav *ngIf="config.navigation" [state]="state"></gallery-nav>\n\n          \x3c!--<div class="g-layer" *ngIf="state.images[state.currIndex].layer" [innerHtml]="state.images[state.currIndex].layer"></div>--\x3e\n\n        </div>\n\n        <gallery-text *ngIf="config.description" [state]="state" [config]="config.description"></gallery-text>\n\n        <gallery-bullets *ngIf="config.bullets" [state]="state" [config]="config.bullets"></gallery-bullets>\n\n        <gallery-player *ngIf="config.player" [state]="state" [config]="config.player"></gallery-player>\n\n      </div>\n\n    </div>\n  ',styles:["\n    gallery-main{-webkit-box-flex:1;-ms-flex:1;flex:1;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}gallery-main *{box-sizing:border-box}.g-container{overflow:hidden;position:relative;z-index:1;max-height:100%;max-width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media (max-width:480px){.g-container{width:100%!important;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-ms-flex-direction:column!important;flex-direction:column!important}}.g-box{height:100%}.g-box,.g-image-box{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;height:100%}.g-layer{position:absolute;left:0;top:0;right:0;bottom:0;z-index:2}.g-pan-reset{transition:all .3s linear;-webkit-transform:translateZ(0)!important;transform:translateZ(0)!important}\n  "],changeDetection:t.ChangeDetectionStrategy.OnPush,encapsulation:t.ViewEncapsulation.None}]}],D.ctorParameters=function(){return[{type:f}]},D.propDecorators={state:[{type:t.Input}],config:[{type:t.Input}]};var P=function(){function e(e,t,n){this.el=e,this.renderer=t,this.gallery=n,this.srcList=[]}return e.prototype.pluck=function(e,t){for(var n=[],i=e.length;i--;)n.push(e[i][t]);return n.sort()},e.prototype.isEqual=function(e,t){if(e.length!==t.length)return!1;for(var n=e.length;n--;)if(e[n]!==t[n])return!1;return!0},e.prototype.ngOnInit=function(){var e=this,t=function(){var t=e.gallerize?e.el.nativeElement.querySelectorAll(e.gallerize):e.el.nativeElement;if(t&&(!e.content||e.content!==t.innerText)){e.content=t.innerText;var n=[],i=t.querySelectorAll("img");if(i&&i.length){var a=e.pluck(i,"src");if(e.isEqual(e.srcList,a))return;e.srcList=a,r.Observable.from(i).map(function(t,i){e.renderer.setStyle(t,"cursor","pointer"),e.renderer.setProperty(t,"onclick",function(){e.gallery.set(i)}),n.push({src:t.src,text:t.alt})}).finally(function(){return e.gallery.load(n)}).subscribe()}}},n=new MutationObserver(t),i={subtree:!0,childList:!0};n.observe(this.el.nativeElement,i),t()},e}();P.decorators=[{type:t.Directive,args:[{selector:"[gallerize]"}]}],P.ctorParameters=function(){return[{type:t.ElementRef},{type:t.Renderer2},{type:f}]},P.propDecorators={gallerize:[{type:t.Input}]};var O=function(){function e(e,n){var i=this;this.el=e,this.renderer=n,this.lazyWorker=new a.Subject,this.lazyLoad=new t.EventEmitter(!1),this.lazyWorker.switchMap(function(e){return r.Observable.of(e)}).subscribe(function(e){e?(i.renderer.setProperty(i.el.nativeElement,"src",e),i.lazyLoad.emit(!0)):i.lazyLoad.emit(!1)})}return Object.defineProperty(e.prototype,"lazyImage",{set:function(e){this.getImage(e)},enumerable:!0,configurable:!0}),e.prototype.getImage=function(e){var t=this;this.lazyWorker.next(!1);var n=this.renderer.createElement("img");n.src=e,n.onload=function(){t.lazyWorker.next(e)},n.onerror=function(e){console.error("[GalleryLazyDirective]:",e),t.lazyWorker.next(!1)}},e}();O.decorators=[{type:t.Directive,args:[{selector:"[lazyImage]"}]}],O.ctorParameters=function(){return[{type:t.ElementRef},{type:t.Renderer2}]},O.propDecorators={lazyImage:[{type:t.Input,args:["lazyImage"]}],lazyLoad:[{type:t.Output}]};var G=function(){function e(e,n,i){this.gallery=e,this.el=n,this.renderer=i,this.tapClick=new t.EventEmitter}return e.prototype.ngOnInit=function(){this.setTapEvent()},e.prototype.setTapEvent=function(){var e=this;if(this.gallery.config.gestures){if("undefined"==typeof Hammer)throw Error("[NgGallery]: HammerJS is undefined, make sure it is loaded");if("undefined"!=typeof Hammer){new Hammer(this.el.nativeElement).on("tap",function(){e.tapClick.emit(null)})}}else this.renderer.setProperty(this.el.nativeElement,"onclick",function(){e.tapClick.emit(null)})},e}();G.decorators=[{type:t.Directive,args:[{selector:"[tap]"}]}],G.ctorParameters=function(){return[{type:f},{type:t.ElementRef},{type:t.Renderer2}]},G.propDecorators={tap:[{type:t.Input}],tapClick:[{type:t.Output}]};var M=new t.InjectionToken("config"),H=function(){function e(){}return e.forRoot=function(t){return{ngModule:e,providers:[{provide:M,useValue:t},{provide:f,useFactory:u,deps:[M]}]}},e}();H.decorators=[{type:t.NgModule,args:[{imports:[n.CommonModule],declarations:[x,h,v,P,w,k,j,S,z,Z,D,G,O],exports:[x,P,S]}]}],H.ctorParameters=function(){return[]},e.GalleryModule=H,e.GalleryService=f,Object.defineProperty(e,"__esModule",{value:!0})});
