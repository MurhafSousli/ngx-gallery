import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [MatButtonModule, FontAwesomeModule, DatePipe]
})
export class FooterComponent {
  todayDate: number = Date.now();
}
