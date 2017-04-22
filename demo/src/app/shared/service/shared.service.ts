import {Injectable} from '@angular/core';
import {GalleryImage} from '../../gallery';

@Injectable()
export class SharedService {


  constructor() {
  }

  tempUrl;

  htmlString = `
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  <img src="assets/img/img12.jpg" alt="Flowers">
  <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
  <img src="assets/img/img14.jpg" alt="Frog">
  <img src="assets/img/img15.jpg" alt="Flowers 2">
  <img src="assets/img/img5.jpg" alt="Peacock">
  <p>remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  <img src="assets/img/img6.jpg" alt="Snow Mountains View">
  <img src="assets/img/img7.jpg" alt="City Sunset View">
  <img src="assets/img/img8.jpg" alt="Beatiful bird">
`;

  codes = {
    importModule: `
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
 `,
    loadImages: `
  constructor(private gallery: GalleryService) { }
  
  ngOnInit() {
    this.gallery.load(this.images);
  }
  `,
    gallerizeTemplate: `
  <div [gallerize] class="content">
    <img src="assets/img/img3.jpg" alt="Spring">
    <img src="assets/img/img4.jpg" alt="Fire">
    <img src="assets/img/img5.jpg" alt="Peacock">
  </div>
`,
    gallerizeModal: `
  <div [gallerize] class="content" [innerHtml]="dynamicHtml"></div>
  <gallery-modal></gallery-modal>
  
`,
    htmlString: `
  dynamicHtml = \`
    ${this.htmlString}
  \`;
  `,
    imagesScheme: `
  //Gallery images mock data
  images = [
    {
      src: 'assets/img/img2.jpg',
      thumbnail: 'assets/img/thumb/img2.jpg',
      text: 'See Sunset View'
    },
    {
      src: 'assets/img/img3.jpg',
      thumbnail: 'assets/img/thumb/img3.jpg',
      text: 'Spring'
    },
    // ...
  ];
  `,
    gridTemplate: `
  <div class="grid">
    <div *ngFor="let image of images; let i = index" (click)="gallery.set(i)">
      <img [src]="image.src"/>
    </div>
  </div>
  
  <gallery-modal></gallery-modal>
`
  };

  getImages(): GalleryImage[] {
    return [
      {
        src: 'assets/img/img2.jpg',
        thumbnail: 'assets/img/thumb/img2.jpg',
        text: 'See Sunset View'
      }, {
        src: 'assets/img/img3.jpg',
        thumbnail: 'assets/img/thumb/img3.jpg',
        text: 'Spring'
      }, {
        src: 'assets/img/img5.jpg',
        thumbnail: 'assets/img/thumb/img5.jpg',
        text: 'Peacock'
      }, {
        src: 'assets/img/img6.jpg',
        thumbnail: 'assets/img/thumb/img6.jpg',
        text: 'Snow Mountains View'
      }, {
        src: 'assets/img/img7.jpg',
        thumbnail: 'assets/img/thumb/img7.jpg',
        text: 'City Sunset View'
      }, {
        src: 'assets/img/img8.jpg',
        thumbnail: 'assets/img/thumb/img8.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img9.jpg',
        thumbnail: 'assets/img/thumb/img9.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img10.jpg',
        thumbnail: 'assets/img/thumb/img10.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img11.jpg',
        thumbnail: 'assets/img/thumb/img11.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img12.jpg',
        thumbnail: 'assets/img/thumb/img12.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img13.jpg',
        thumbnail: 'assets/img/thumb/img13.jpg',
        text: 'Beatiful bird'
      }, {
        src: 'assets/img/img14.jpg',
        thumbnail: 'assets/img/thumb/img14.jpg',
        text: 'Frog'
      }
    ];
  }
}
