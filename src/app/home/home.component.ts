import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '../constants/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columns = COLUMNS;
  rows: any = [];
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage && sessionStorage.getItem('myTeam')) {
      let rows = sessionStorage.getItem('myTeam');
      if (rows) {
        rows = JSON.parse(rows);
        this.rows = rows;
      }
    }
    if (sessionStorage && sessionStorage.getItem('player')) {
      let player: any = sessionStorage.getItem('player');
      player = JSON.parse(player);
      this.rows.push(player?.favPlayer);
    }
    if (this.rows?.length) {
      sessionStorage.setItem('myTeam', JSON.stringify(this.rows));
    }
  }

}
