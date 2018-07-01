import { Component } from '@angular/core';

@Component({
  selector: 'badges',
  templateUrl: './badges.component.html',
  styles: [`
    :host {
      margin-bottom: 2em;
      display: flex;
      flex-wrap: wrap;
      padding: 1em;
      justify-content: center;
    }
    a {
      text-decoration: none;
      margin-left: 0.3em;
    }
  `]
})
export class BadgesComponent {

}
