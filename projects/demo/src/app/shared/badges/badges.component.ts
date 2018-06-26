import { Component } from '@angular/core';

@Component({
  selector: 'badges',
  templateUrl: './badges.component.html',
  styles: [`
    :host {
      margin-bottom: 2em;
    }
    a {
      text-decoration: none;
      margin-left: 0.3em;
    }
  `]
})
export class BadgesComponent {

}
