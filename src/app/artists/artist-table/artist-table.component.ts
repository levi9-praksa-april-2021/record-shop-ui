import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddArtistComponent } from '../add-artist/add-artist.component';
import { Artist, ArtistsPage } from '../Artists';
import { ArtistsService } from '../artists.service';
import { UpdateArtistComponent } from '../update-artist/update-artist.component';

@Component({
  selector: 'app-artist-table',
  templateUrl: './artist-table.component.html',
  providers: [DialogService]
})
export class ArtistTableComponent implements OnInit {

  artistsPage: ArtistsPage;

  public ref: DynamicDialogRef;

  constructor(
    private artistsService: ArtistsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService
  ) {}

  showAddForm(): void {
    this.ref = this.dialogService.open(AddArtistComponent, {
      header: 'Add artist',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getArtists();
        this.messageService.add({
          severity: 'success', summary: 'Artist adding successful', detail: 'You have successfully added artist!' });
      }
    });
  }

  showUpdateForm(artist: any): void {
    this.ref = this.dialogService.open(UpdateArtistComponent, {
      data: {
        artist: artist
      },
      header: 'Update artist',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getArtists();
        this.messageService.add({ severity: 'success', summary: 'Artist updating successful', detail: 'You have successfully updated artist!' });
      }
    });
  }

  showDeleteForm(id: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this artist?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.artistsService.deleteArtist(id)
        .subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfuly deleted artist!' });
            this.getArtists();
          });
        },
      reject: () => {
      }
    });
  }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(): void {
    // this.artistsService.getArtists().subscribe(artists => this.artistsPage = artists);

    const genres: Artist[] = [new Artist(1, "Artist1 firstname", "Artist1 lastname"), new Artist(2, "Artist2 firstname", "Artist2 lastname")]
    const result: ArtistsPage = new ArtistsPage(genres);
    this.artistsPage = result;
  }

}
