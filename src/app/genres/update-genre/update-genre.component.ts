import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Genre } from '../Genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html'
})
export class UpdateGenreComponent implements OnInit {

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  genre: any;
  name: string;

  constructor(
    private genreService: GenresService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.genre = this.config.data.genre;
    this.name = this.genre.name;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.invalidFormInputs()) {
      return;
    }
    this.loading = true;
    this.updateCategory();
  }

  updateCategory(): void {
    const updatedGenre: Genre = { id: this.genre.id, name: this.name };
    this.genreService.updateGenre(updatedGenre)
      .subscribe(
        () => {
          this.loading = false;
          this.ref.close(this.submitted);
        });
  }

  get f(): any { return this.updateForm.controls; }

  invalidFormInputs(): boolean {
    if (this.f.name.value === '' || this.f.name.value === null || this.areNamesSame()) {
      return true;
    }
    return false;
  }

  areNamesSame(): boolean {
    return this.genre.name === this.name;
  }

  errorMessage(): string {
    return 'Name is required!';
  }

}
