import { Artist, ArtistsPage } from "../artists/Artists";
import { Genre, GenresPage } from "../genres/Genre";

export class RecordRequest {
    id?: number;
    title: string;
    album: string;
    price: number;
    stock: number;
    artistIds: number[];
    genreIds: number[];

    constructor(title: string, album: string, price: number, stock: number, artists: number[], genres: number[]) {
      this.title = title;
      this.album = album;
      this.price = price;
      this.stock = stock;
      this.artistIds = artists;
      this.genreIds = genres;
    }
}
