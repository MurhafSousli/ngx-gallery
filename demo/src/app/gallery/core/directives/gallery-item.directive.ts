import {
  Directive,
  Input,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { GalleryItem, GalleryItemComponent } from '../models';

@Directive({
  selector: '[item]'
})
export class GalleryItemDirective implements OnInit {

  @Input() item: GalleryItem;
  @Input() type: 'slide' | 'thumb' = 'slide';

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(this.item[this.type === 'slide' ? 'component' : 'thumbComponent']);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const galleryItem: GalleryItemComponent = componentRef.instance;
    galleryItem.data = this.item.data;
  }

}
