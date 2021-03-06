import { Artist } from "./artist";
import { Genre } from "./genre";


export interface Records {
  records: Record[];
};
export interface Record {
  id: number;
  title: string;

  price: number;
  stock: number;

  artists: Artist[];
  genres: Genre[];
};
