import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {GalleryService} from '../../gallery';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';
import {Http} from "@angular/http";

@Component({
  selector: 'gallery-options',
  templateUrl: './gallery-options.component.html',
  styleUrls: ['./gallery-options.component.scss']
})
export class GalleryOptionsComponent implements OnInit {

  currTheme;

  themes;

  animateOptions = [
    'fade',
    'slide',
    'none'
  ];

  constructor(public gallery: GalleryService, public dialog: MdDialog, public http: Http) {

  }

  ngOnInit() {
    this.http.get('../../../assets/themes.json')
      .subscribe(res => {
        this.themes = res.json();
        this.currTheme = Object.assign({}, this.themes[0]);
      });
  }

  setTheme(theme) {
    this.gallery.config = Object.assign({}, this.gallery.config, theme.config);
  }

  exportConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.readOnly = true;
    dialogRef.componentInstance.config = this.gallery.config;
  }

  importConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.gallery.config = Object.assign({}, this.gallery.config, result);
    });
  }

}
