import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LightBoxService} from "../../service/light-box.service";

@Component({
  selector: 'light-box-nav',
  templateUrl: './light-box-nav.component.html',
  styleUrls: ['./light-box-nav.component.scss']
})
export class LightBoxNavComponent implements OnInit {

  @Input() state;

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch(event.keyCode){
      case 39:  //prev
        this.lightbox.prev();
        break;
      case 37:  //next
        this.lightbox.next();
        break;
      case 13:  //enter
        this.lightbox.next();
        break;
      case 27:  //esc
        this.lightbox.close();
        break;
      default: return;
    }
  }

  constructor(private lightbox: LightBoxService) { }

  ngOnInit() {
  }

}
