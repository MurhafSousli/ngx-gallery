import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {GalleryService} from '../../gallery';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';

@Component({
  selector: 'gallery-options',
  templateUrl: './gallery-options.component.html',
  styleUrls: ['./gallery-options.component.scss']
})
export class GalleryOptionsComponent implements OnInit {

  currTheme;

  themes = [
    {
      name: 'Default'
      ,
      config: {
        width: '900px',
        height: '500px',
        description: {
          position: 'bottom',
          overlay: true,
          text: true,
          counter: true
        },
        thumbnails: {
          width: 120,
          height: 90,
          position: 'top'
        }
      }
    },
    {
      name: 'Style1'
      ,
      config: {
        width: '800px',
        height: '400px',
        description: {
          position: 'bottom',
          overlay: false,
          text: false,
          counter: true
        },
        thumbnails: {
          width: 120,
          height: 90,
          position: 'top'
        }
      }
    }
  ];

  animateOptions = [
    'fade',
    'slide',
    'none'
  ];

  constructor(private gallery: GalleryService, public dialog: MdDialog) {

  }

  ngOnInit() {
    this.currTheme = Object.assign({}, this.themes[0]);
  }

  setTheme(theme) {
    this.gallery.config = Object.assign({}, this.gallery.config, theme.config);
  }

  importConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.readOnly = true;
    dialogRef.componentInstance.config = this.gallery.config;
  }

  exportConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.gallery.config = Object.assign({}, this.gallery.config, result);
    });
  }

}
