import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Genre } from '../Genre';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html'
})
export class AddGenreComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private genreService: GenresService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = false;
    if (this.invalidFormInputs()) {
      this.removeFormInputs();
      return;
    }
    this.loading = true;
    this.addGenre();
  }

  addGenre(): void {
    const genre: Genre = { id: null, name: this.f.name.value };
    this.genreService.addGenre(genre)
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
    if (this.f.name.value === '' || this.f.name.value === null) {
      return true;
    }
    return false;
  }

  errorMessage(): string {
    return 'Name is required!';
  }

}
