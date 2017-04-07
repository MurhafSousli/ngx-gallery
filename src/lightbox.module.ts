import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LightBoxComponent} from './component/light-box.component';
import {LightBoxService} from './service/light-box.service';
import {LightBoxNavComponent} from './component/light-box-nav/light-box-nav.component';
import {LazyLoadImageDirective} from "./directive/lazyload-image.directive";
import {LightBoxImagesComponent} from './component/light-box-images/light-box-images.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LightBoxService
  ],
  declarations: [
    LightBoxComponent,
    LightBoxNavComponent,
    LazyLoadImageDirective,
    LightBoxImagesComponent
  ],
  exports: [
    LightBoxComponent
  ]
})
export class LightboxModule {
}
