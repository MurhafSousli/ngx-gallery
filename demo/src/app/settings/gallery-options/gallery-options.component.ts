import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Http} from '@angular/http';
import {MdDialog} from '@angular/material';
import {GalleryService, GalleryConfig} from '../../gallery';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';

@Component({
  selector: 'gallery-options',
  templateUrl: './gallery-options.component.html',
  styleUrls: ['./gallery-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryOptionsComponent implements OnInit {

  @Output() value = new EventEmitter();
  config: GalleryConfig;

  currTheme;
  themes;

  // animateOptions = [
  //   'fade',
  //   'slide',
  //   'none'
  // ];
  animateOptions = [
    'fade',
    'none'
  ];

  constructor(public gallery: GalleryService, public dialog: MdDialog, public http: Http, public cd: ChangeDetectorRef) {
    this.config = gallery.config;
  }

  ngOnInit() {
    /** Get all pre-made themes */
    this.http.get('assets/themes.json')
      .subscribe(res => {
        this.themes = res.json();
        this.currTheme = Object.assign({}, this.themes[0]);
        this.cd.markForCheck();
      });
  }

  /** Export config dialog */
  exportConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.readOnly = true;
    dialogRef.componentInstance.config = this.gallery.config;
  }

  /** Import config dialog */
  importConfig() {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.gallery.config = Object.assign({}, this.gallery.config, result);
    });
  }

  /** Update config with the selected theme */
  themeChanged(theme) {
    this.config = Object.assign({}, theme.config);
    this.value.emit(this.config);
  }

  gesturesChanged(e) {
    this.config.gestures = e;
    this.value.emit(this.config);
  }

  descChanged(e) {
    this.config.description = e;
    this.value.emit(this.config);
  }

  bulletsChanged(e) {
    this.config.bullets = e;
    this.value.emit(this.config);
  }

  thumbsChanged(e) {
    this.config.thumbnails = e;
    this.value.emit(this.config);
  }

  playerChanged(e) {
    this.config.player = e;
    this.value.emit(this.config);
  }

  loaderChanged(e) {
    this.config.loader = e;
    this.value.emit(this.config);
  }

  animateChanged(e) {
    this.config.animation = e;
    this.value.emit(this.config);
  }

  navChanged(e) {
    this.config.navigation = e;
    this.value.emit(this.config);
  }

  styleChanged(e) {
    this.config.style = e;
    this.value.emit(this.config);
  }

}
