import { NgGalleryDemoPage } from './app.po';

describe('ng-gallery-demo App', () => {
  let page: NgGalleryDemoPage;

  beforeEach(() => {
    page = new NgGalleryDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
