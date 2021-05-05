import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Artist } from 'src/app/artists/Artists';
import { ArtistsService } from 'src/app/artists/artists.service';
import { Genre } from 'src/app/genres/Genre';
import { GenresService } from 'src/app/genres/genres.service';
import { Record } from '../Record';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html'
})
export class UpdateRecordComponent implements OnInit {

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  record: any;
  title: string;
  album: string;
  price: number;
  stock: number;
  selectedArtists: Artist[];
  selectedGenres: Genre[];

  artists: Artist[];
  genres: Genre[];

  constructor(
    private recordService: RecordsService,
    private genresService: GenresService,
    private artistsService: ArtistsService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.record = this.config.data.record;
    this.title = this.record.title;
    this.album = this.record.album;
    this.price = this.record.price;
    this.stock = this.record.stock;
    this.selectedArtists = this.record.artists;
    this.selectedGenres = this.record.genres;
  }

  ngOnInit(): void {
    this.readArtists();
    this.readGenres();

    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      album: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      selectedArtists: ['', Validators.required],
      selectedGenres: ['', Validators.required]
    });
  }

  readArtists(): void {
    // this.artistsService.getArtists().subscribe(artists => this.artists = artists.data);

    const artists: Artist[] = [new Artist(1, "Artist1 firstname", "Artist1 lastname"), new Artist(2, "Artist2 firstname", "Artist2 lastname")];
    this.artists = artists;
  }

  readGenres(): void {
    // this.genresService.getGenres().subscribe(genres => this.genres = genres.data);

    const genres: Genre[] = [new Genre(1, "genre1"), new Genre(2, "genre2")];
    this.genres = genres;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.invalidFormInputs()) {
      return;
    }
    this.loading = true;
    this.updateRecord();
  }

  updateRecord(): void {
    const updatedRecord: Record = { id: this.record.id, title: this.title, album: this.album, price: this.price, stock: this.stock, artists: null, genres: null };
    this.recordService.updateRecord(updatedRecord)
      .subscribe(
        () => {
          this.loading = false;
          this.ref.close(this.submitted);
        });
  }

  get f(): any { return this.updateForm.controls; }

  invalidFormInputs(): boolean {
    if (this.f.title.value === '' || this.f.title.value === null) {
      return true;
    }
    if (this.f.album.value === '' || this.f.album.value === null) {
      return true;
    }
    if (this.f.price.value === '' || this.f.price.value === null) {
      return true;
    }
    if (this.f.stock.value === '' || this.f.stock.value === null) {
      return true;
    }
    if (this.f.selectedArtists.value === null || this.f.selectedArtists.value.length === 0) {
      return true;
    }
    if (this.f.selectedGenres.value === null || this.f.selectedGenres.value.length === 0) {
      return true;
    }

    if (this.areTitlesSame() && this.areAlbumsSame() && this.arePricesSame() && this.areStocksSame() && this.areArtistsSame() && this.areGenresSame()) {
      return true;
    }
    
    return false;
  }

  areTitlesSame(): boolean {
    return this.record.title === this.title;
  }

  areAlbumsSame(): boolean {
    return this.record.album === this.album;
  }

  arePricesSame(): boolean {
    return this.record.price === this.price;
  }

  areStocksSame(): boolean {
    return this.record.stock === this.stock;
  }

  areArtistsSame(): boolean {
    let missing = this.selectedArtists.filter(item => this.record.artists.indexOf(item) < 0);
    if (missing) {
      return false;
    }
    return true;
  }

  areGenresSame(): boolean {
    let missing = this.selectedGenres.filter(item => this.record.genres.indexOf(item) < 0);
    if (missing) {
      return false;
    }
    return true;
  }

  errorMessage(): string {
    return 'Fields are required!';
  }

}
