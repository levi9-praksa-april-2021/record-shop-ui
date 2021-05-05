import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Artist, ArtistsPage } from 'src/app/artists/Artists';
import { ArtistsService } from 'src/app/artists/artists.service';
import { Genre, GenresPage } from 'src/app/genres/Genre';
import { GenresService } from 'src/app/genres/genres.service';
import { RecordsService } from '../records.service';
import {Record} from 'src/app/core/model/record';
import { RecordRequest } from '../Record';
@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html'
})
export class AddRecordComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;

  artists: Artist[];
  genres: Genre[];

  constructor(
    private recordService: RecordsService,
    private genresService: GenresService,
    private artistsService: ArtistsService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.readArtists();
    this.readGenres();

    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      album: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      selectedArtists: [[], Validators.required],
      selectedGenres: [[], Validators.required]
    });
  }

  readArtists(): void {
    this.artistsService.getArtists().subscribe(artists => this.artists = artists);
  }

  readGenres(): void {
    this.genresService.getGenres().subscribe(genres => this.genres = genres);
  }

  onSubmit(): void {
    this.submitted = false;
    if (this.invalidFormInputs()) {
      this.removeFormInputs();
      return;
    }
    this.loading = true;
    this.addRecord();
  }

  addRecord(): void {
    const record: RecordRequest = {title: this.f.title.value, album: this.f.album.value, price: this.f.price.value, stock: this.f.stock.value, genreIds: this.f.selectedGenres.value, artistIds: this.f.selectedArtists.value};
    console.log(record)
    this.recordService.addRecord(record)
      .subscribe(
        () => {
          this.submitted = true;
          this.loading = false;
          this.removeFormInputs();
          this.ref.close(this.submitted);
        });
  }

  get f(): any { return this.addForm.controls; }

  removeFormInputs(): void {
    this.addForm.reset();
  }

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
    return false;
  }

  errorMessage(): string {
    return 'Fields are required!';
  }

}
