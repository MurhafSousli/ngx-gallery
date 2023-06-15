import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout/flex';
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
  standalone: true,
  imports: [FlexModule, RouterLink, RouterLinkActive, SectionTitleComponent, MatIconModule, ExtendedModule, RouterOutlet, FooterComponent]
})
export class DocumentationComponent implements OnInit {

  constructor(private _title: Title) {
  }

  ngOnInit() {
    this._title.setTitle('Getting Started | ng-gallery');
  }
}
