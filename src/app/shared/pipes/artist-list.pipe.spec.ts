import { ArtistListPipe } from './artist-list.pipe';

describe('ArtistListPipe', () => {
  it('create an instance', () => {
    const pipe = new ArtistListPipe();
    expect(pipe).toBeTruthy();
  });
});
