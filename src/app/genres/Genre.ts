export class Genre {
    id: number;
    name: string;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
}


  
export class GenresPage {
  data: Genre[];
  links: Map<string, string>;

  constructor(data: Genre[]) {
    this.data = data;
  }
}