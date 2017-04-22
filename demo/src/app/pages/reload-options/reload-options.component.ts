import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/service/shared.service';

@Component({
  selector: 'reload-options',
  template: `<p>
    Refreshing...
  </p>`,
  styles: [`
   :host{
     display: flex;
     justify-content: center;
     align-content: center;
     font-size: 2em;
     height: 90vh;
   } 
  `]
})
export class ReloadOptionsComponent implements OnInit {

  constructor(public shared: SharedService, public router: Router) {
  }

  ngOnInit() {

    setTimeout(() => {
      // redirect to previous route
      console.log(this.shared.tempUrl);
      this.router.navigate([this.shared.tempUrl]);
    }, 300);
  }
}
