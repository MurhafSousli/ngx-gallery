import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Http} from '@angular/http';
import {MdDialog} from '@angular/material';
import {GalleryService} from '../../gallery';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';
import {GalleryConfig} from "../../gallery/service/gallery.config";

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

  animateOptions = [
    'fade',
    'slide',
    'none'
  ];

  constructor(public gallery: GalleryService, public dialog: MdDialog, public http: Http) {
    this.config = gallery.config;
  }

  ngOnInit() {
    /** Get all pre-made themes */
    this.http.get('../../../assets/themes.json')
      .subscribe(res => {
        this.themes = res.json();
        this.currTheme = Object.assign({}, this.themes[0]);
      });
  }

  /** Update config with the selected theme */
  setTheme(theme) {
    this.gallery.config = Object.assign({}, this.gallery.config, theme.config);
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


  updateDesc(e) {
    this.config.description = e;
    this.updateConfig();
  }

  updateBullets(e) {
    this.config.bullets = e;
    this.updateConfig();
  }

  updateThumbs(e) {
    this.config.thumbnails = e;
    this.updateConfig();
  }

  updatePlayer(e) {
    this.config.player = e;
    this.updateConfig();
  }

  updateLoader(e) {
    this.config.loader = e;
    this.updateConfig();
  }

  updateHeight(e) {
    this.config.height = e;
    this.updateConfig();
  }

  updateWidth(e) {
    this.config.width = e;
    this.updateConfig();
  }

  updateAnimate(e) {
    this.config.animation = e;
    this.updateConfig();
  }

  updateConfig() {
    this.value.emit(this.config);
  }

}
