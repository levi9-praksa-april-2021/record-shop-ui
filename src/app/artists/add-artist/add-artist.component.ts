import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Artist } from '../Artists';
import { ArtistsService } from '../artists.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html'
})
export class AddArtistComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private artistService: ArtistsService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = false;
    if (this.invalidFormInputs()) {
      this.removeFormInputs();
      return;
    }
    this.loading = true;
    this.addArtist();
  }

  addArtist(): void {
    const artist: Artist = { id: null, firstName: this.f.firstName.value, lastName: this.f.lastName.value};
    this.artistService.addArtist(artist)
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
    if (this.f.firstName.value === '' || this.f.firstName.value === null) {
      return true;
    }
    if (this.f.lastName.value === '' || this.f.lastName.value === null) {
      return true;
    }
    return false;
  }

  errorMessage(): string {
    return 'Name is required!';
  }

}
