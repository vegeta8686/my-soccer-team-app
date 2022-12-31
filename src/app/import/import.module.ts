import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportPlayersComponent } from './import-players/import-players.component';
import { AddFavPlayerComponent } from './add-fav-player/add-fav-player.component';
import { SummaryComponent } from './summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportComponent,
    ImportPlayersComponent,
    AddFavPlayerComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
    ReactiveFormsModule
  ]
})
export class ImportModule { }
