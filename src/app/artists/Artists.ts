export class Artist {
    id: number;
    firstName: string;
    lastName: string;

    constructor(id: number, firstName: string, lastName: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
    }
}


  
export class ArtistsPage {
  data: Artist[];
  links: Map<string, string>;

  constructor(data: Artist[]) {
    this.data = data;
  }
}