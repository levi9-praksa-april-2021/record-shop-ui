import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Artist } from '../Artists';
import { ArtistsService } from '../artists.service';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html'
})
export class UpdateArtistComponent implements OnInit {

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  artist: any;
  firstName: string;
  lastName: string;

  constructor(
    private artistService: ArtistsService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.artist = this.config.data.artist;
    this.firstName = this.artist.firstName;
    this.lastName = this.artist.lastName;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.invalidFormInputs()) {
      return;
    }
    this.loading = true;
    this.updateArtist();
  }

  updateArtist(): void {
    const updatedArtist: Artist = { id: this.artist.id, firstName: this.firstName, lastName: this.lastName };
    this.artistService.updateArtist(updatedArtist)
      .subscribe(
        () => {
          this.loading = false;
          this.ref.close(this.submitted);
        });
  }

  get f(): any { return this.updateForm.controls; }

  invalidFormInputs(): boolean {
    if (this.f.firstName.value === '' || this.f.firstName.value === null) {
      return true;
    }
    if (this.f.lastName.value === '' || this.f.lastName.value === null) {
      return true;
    }

    if (this.areFirstNamesSame() && this.areLastNamesSame()) {
      return true;
    }

    return false;
  }

  areFirstNamesSame(): boolean {
    return this.artist.firstName === this.firstName;
  }

  areLastNamesSame(): boolean {
    return this.artist.lasttName === this.lastName;
  }

  errorMessage(): string {
    return 'Name is required!';
  }

}
