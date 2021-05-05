import { Artist, ArtistsPage } from "../artists/Artists";
import { Genre, GenresPage } from "../genres/Genre";

export class Record {
    id: number;
    title: string;
    album: string;
    price: number;
    stock: number;
    artists: Artist[];
    genres: Genre[];

    constructor(id: number, title: string, album: string, price: number, stock: number, artists: Artist[], genres: Genre[]) {
      this.id = id;
      this.title = title;
      this.album = album;
      this.price = price;
      this.stock = stock;
      this.artists = artists;
      this.genres = genres;
    }
}
  
export class RecordsPage {
  data: Record[];
  links: Map<string, string>;

  constructor(data: Record[]) {
    this.data = data;
  }
}