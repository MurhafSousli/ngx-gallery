import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    SectionTitleComponent,
    MatIconModule,
    FooterComponent
  ]
})
export class DocumentationComponent implements OnInit {

  constructor(private _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('Getting Started | ng-gallery');
  }
}
