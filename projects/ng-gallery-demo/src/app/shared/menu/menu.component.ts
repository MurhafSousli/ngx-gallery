import { Component, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [MatButtonModule, RouterLink, RouterLinkActive, FontAwesomeModule]
})
export class MenuComponent {
  toolbar: InputSignal<boolean> = input<boolean>(true);
}
