import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() showHeader;

}
