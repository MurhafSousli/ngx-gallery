import {Injectable} from '@angular/core';
import {GalleryImage} from '../../gallery';

@Injectable()
export class SharedService {

  constructor() {
  }

  importCode = `
  import { GalleryModule } from 'ng-gallery';
  
  export const galleryConfig : GalleryConfig = {
    // ...
  }
  
  @NgModule({
   imports: [
      // ...
      GalleryModule.forRoot(galleryConfig)
   ]
  })
 `;

  loadImageCode = `
  constructor(private gallery: GalleryService) { }
  
  ngOnInit() {
    this.gallery.load(images);
  }
  `;

  gallerizeTemplateCode = `
  <div [gallerize] class="content">
    <img src="assets/img/img3.jpg" alt="Spring">
    <img src="assets/img/img4.jpg" alt="Fire">
    <img src="assets/img/img5.jpg" alt="Peacock">
  </div>
  
`;

  gallerizeModalCode = `
  <div [gallerize] class="content" [innerHtml]="dynamicHtml"></div>
  <gallery-modal></gallery-modal>
`;

  galleryHtmlString = `
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  
  <img src="assets/img/img2.jpg" alt="See Sunset View">
  
  <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
  
  <img src="assets/img/img3.jpg" alt="Spring">
  <img src="assets/img/img4.jpg" alt="Fire">
  <img src="assets/img/img5.jpg" alt="Peacock">
  
  <p>remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  
  <img src="assets/img/img6.jpg" alt="Snow Mountains View">
  <img src="assets/img/img7.jpg" alt="City Sunset View">
  <img src="assets/img/img8.jpg" alt="Beatiful bird">
`;

  galleryHtmlStringCode = `
  dynamicHtml = \`
    ${this.galleryHtmlString}
  \`;
  `;

  galleryImageGridTemplate = `
  <div class="grid">
    <div *ngFor="let image of shared.getImages(); let i = index" (click)="gallery.setCurrent(i)">
      <img [src]="image.src"/>
    </div>
  </div>
  
  <gallery-modal></gallery-modal>
`;

  galleryImageArrayScheme = `
  //Gallery images mock data
  getImages() {
    return [
      {
        src: 'assets/img/img2.jpg',
        thumbnail: 'assets/img/thumb/img2_tn.jpg',
        text: 'See Sunset View'
      },
      {
        src: 'assets/img/img3.jpg',
        thumbnail: 'assets/img/thumb/img3_tn.jpg',
        text: 'Spring'
      },
      // ...
    ];
  }
  `;

  getImages(): GalleryImage[] {
    return [
      {
        src: 'assets/img/img2.jpg',
        thumbnail: 'assets/img/thumb/img2_tn.jpg',
        text: 'See Sunset View'
      }, {
        src: 'assets/img/img3.jpg',
        thumbnail: 'assets/img/thumb/img3_tn.jpg',
        text: 'Spring'
      }, {
        src: 'assets/img/img5.jpg',
        thumbnail: 'assets/img/thumb/img5_tn.jpg',
        text: 'Peacock'
      }, {
        src: 'assets/img/img6.jpg',
        thumbnail: 'assets/img/thumb/img6_tn.jpg',
        text: 'Snow Mountains View'
      }, {
        src: 'assets/img/img7.jpg',
        thumbnail: 'assets/img/thumb/img7_tn.jpg',
        text: 'City Sunset View'
      }, {
        src: 'assets/img/img8.jpg',
        thumbnail: 'assets/img/thumb/img8_tn.jpg',
        text: 'Beatiful bird'
      }
    ];
  }
}
