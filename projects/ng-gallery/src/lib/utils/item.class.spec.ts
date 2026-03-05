import {
  ITEM_TYPE,
  IframeItemData,
  ImageItemData,
  VideoItemData,
  VimeoItemData,
  YoutubeItemData
} from 'ng-gallery';
import { IframeItem, ImageItem, VideoItem, VimeoItem, YoutubeItem } from './item.class';

describe('Gallery Item Classes', () => {
  it('should create an ImageItem with correct type and data', () => {
    const data: ImageItemData = { src: 'image.jpg' };
    const item = new ImageItem(data);
    expect(item.type).toBe(ITEM_TYPE.Image);
    expect(item.data).toEqual(data);
  });

  it('should create a VideoItem with correct type and data', () => {
    const data: VideoItemData = { src: 'video.mp4' };
    const item = new VideoItem(data);
    expect(item.type).toBe(ITEM_TYPE.Video);
    expect(item.data).toEqual(data);
  });

  it('should create an IframeItem with correct type and data', () => {
    const data: IframeItemData = { src: 'https://example.com' };
    const item = new IframeItem(data);
    expect(item.type).toBe(ITEM_TYPE.Iframe);
    expect(item.data).toEqual(data);
  });

  it('should create a YoutubeItem with correct type and transformed data when thumb is not provided', () => {
    const data: YoutubeItemData = { src: 'abc123' };
    const item = new YoutubeItem(data);
    expect(item.type).toBe(ITEM_TYPE.Youtube);
    expect(item.data.src).toBe('https://youtube.com/embed/abc123');
    expect(item.data.thumb).toBe('//img.youtube.com/vi/abc123/default.jpg');
  });

  it('should create a YoutubeItem with correct type and transformed data when thumb is provided', () => {
    const data: YoutubeItemData = { src: 'abc123', thumb: 'https://example.com/thumb-abc123' };
    const item = new YoutubeItem(data);
    expect(item.type).toBe(ITEM_TYPE.Youtube);
    expect(item.data.src).toBe('https://youtube.com/embed/abc123');
    expect(item.data.thumb).toBe('https://example.com/thumb-abc123');
  });

  it('should create a VimeoItem with correct type and transformed data when thumb is not provided', () => {
    const data: VimeoItemData = { src: '456789' };
    const item = new VimeoItem(data);
    expect(item.type).toBe(ITEM_TYPE.Vimeo);
    expect(item.data.src).toBe('https://player.vimeo.com/video/456789');
    expect(item.data.thumb).toBe('//vumbnail.com/456789.jpg');
  });

  it('should create a VimeoItem with correct type and transformed data when thumb is provided', () => {
    const data: VimeoItemData = { src: '456789', thumb: 'https://example.com/thumb-456789' };
    const item = new VimeoItem(data);
    expect(item.type).toBe(ITEM_TYPE.Vimeo);
    expect(item.data.src).toBe('https://player.vimeo.com/video/456789');
    expect(item.data.thumb).toBe('https://example.com/thumb-456789');
  });
});
