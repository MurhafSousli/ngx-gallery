import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'reload-options',
  template: '<p>Loading...</p>',
  styleUrls: ['./reload.component.scss']
})
export class ReloadComponent implements OnInit {

  constructor(public shared: SharedService, public router: Router) {
  }

  ngOnInit() {

    setTimeout(() => {
      // redirect to previous route
      this.router.navigate([this.shared.tempUrl]);
    }, 300);
  }
}
