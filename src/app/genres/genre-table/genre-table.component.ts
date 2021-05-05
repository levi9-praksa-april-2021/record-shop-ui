import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddGenreComponent } from '../add-genre/add-genre.component';
import { Genre, GenresPage } from '../Genre';
import { GenresService } from '../genres.service';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';

@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  providers: [DialogService]
})
export class GenreTableComponent implements OnInit {
  genres: Genre[];

  public ref: DynamicDialogRef;

  constructor(
    private genresService: GenresService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService
  ) {}

  showAddForm(): void {
    this.ref = this.dialogService.open(AddGenreComponent, {
      header: 'Add genre',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getGenres();
        this.messageService.add({
          severity: 'success', summary: 'Genre adding successful', detail: 'You have successfully added genre!' });
      }
    });
  }

  showUpdateForm(genre: any): void {
    this.ref = this.dialogService.open(UpdateGenreComponent, {
      data: {
        genre: genre
      },
      header: 'Update genre',
      width: '30%',
      dismissableMask: true
    });

    this.ref.onClose.subscribe((submitted) => {
      if (submitted) {
        this.getGenres();
        this.messageService.add({ severity: 'success', summary: 'Genre updating successful', detail: 'You have successfully updated genre!' });
      }
    });
  }

  showDeleteForm(id: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this genre?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.genresService.deleteGenre(id)
        .subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfuly deleted genre!' });
            this.getGenres();
          });
        },
      reject: () => {
      }
    });
  }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genresService.getGenres().subscribe(genres => this.genres = genres);

  }

}
