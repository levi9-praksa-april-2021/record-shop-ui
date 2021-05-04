import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CardModule} from 'primeng/card';
import {GMapModule} from 'primeng/gmap';
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {DataViewModule} from 'primeng/dataview';
import {AccordionModule} from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ArtistListPipe } from './pipes/artist-list.pipe';
import { GenreListPipe } from './pipes/genre-list.pipe';

@NgModule({
  declarations: [ArtistListPipe, GenreListPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CarouselModule,
    ConfirmPopupModule,
    ScrollPanelModule,
    CardModule,
    GMapModule,
    RatingModule,
    DropdownModule,
    TableModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputTextModule,
    DataViewModule,
    AccordionModule
  ],
  exports: [
        ArtistListPipe,
        GenreListPipe,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CarouselModule,
        ConfirmPopupModule,
        ScrollPanelModule,
        CardModule,
        GMapModule,
        RatingModule,
        DropdownModule,
        TableModule,
        DynamicDialogModule,
        ConfirmDialogModule,
        InputTextModule,
        DataViewModule,
        AccordionModule
  ],
  providers: [
    ConfirmationService,
    ArtistListPipe,
    GenreListPipe
  ]
})
export class SharedModule { }
