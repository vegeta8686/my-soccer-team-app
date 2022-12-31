import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-fav-player',
  templateUrl: './add-fav-player.component.html',
  styleUrls: ['./add-fav-player.component.scss']
})
export class AddFavPlayerComponent implements OnInit {

  /**
   *
   * stores the player list
   * @type {*}
   * @memberof AddFavPlayerComponent
   */
  @Input() playerList: any;
  /**
   *
   * stores the fav player data
   * @type {*}
   * @memberof AddFavPlayerComponent
   */
  @Input() favPlayerData: any;
  /**
   *
   * stores the selected player data
   * @memberof AddFavPlayerComponent
   */
  @Output() selectedPlayerData = new EventEmitter();
  /**
   *
   * stores the player fav
   * @type {*}
   * @memberof AddFavPlayerComponent
   */
  selectedPlayer: any;
  /**
   *
   * stores the selected row index
   * @type {*}
   * @memberof AddFavPlayerComponent
   */
  selectedRow: any;
  /**
   *
   * moves to next page
   * @memberof AddFavPlayerComponent
   */
  @Output() previousPage = new EventEmitter();
  /**
   * Creates an instance of AddFavPlayerComponent.
   * @memberof AddFavPlayerComponent
   */
  constructor() { }

  /**
   *
   * initialize the component
   * @memberof AddFavPlayerComponent
   */
  ngOnInit(): void {
    if(this.favPlayerData) {
      this.selectedPlayer = this.favPlayerData.favPlayer;
      this.selectedRow = this.favPlayerData.index;
    }
  }
  /**
   *
   * sets fav player
   * @param {*} player
   * @param {number} rowIndex
   * @memberof AddFavPlayerComponent
   */
  favPlayer(player: any, rowIndex: number) {
    this.selectedPlayer = player;
    this.selectedRow = rowIndex;
  }
  /**
   *
   * moves to next step
   * @memberof AddFavPlayerComponent
   */
  submit() {
    const playerData = {
      favPlayer: this.selectedPlayer,
      index: this.selectedRow
    }
    this.selectedPlayerData.emit({data: playerData, step: 2});
  }
  /**
   *
   * return to previous step
   * @memberof AddFavPlayerComponent
   */
  return() {
    this.previousPage.emit({ step: 0 });
  }

}
