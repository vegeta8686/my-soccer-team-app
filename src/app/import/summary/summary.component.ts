import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  /**
   *
   * stores the step-1 data
   * @type {*}
   * @memberof SummaryComponent
   */
  @Input() importData: any;
  /**
   *
   * stores the step-2 data
   * @type {*}
   * @memberof SummaryComponent
   */
  @Input() favPlayer: any;
  /**
   *
   * moves to previous pge
   * @memberof SummaryComponent
   */
  @Output() previousPage = new EventEmitter();
  /**
   *
   * total no position in team
   * @memberof SummaryComponent
   */
  allPosition = {
    goalkeepers: 0,
    forwards: 0,
    defenders: 0,
    midfielders: 0
  }
  /**
   * Creates an instance of SummaryComponent.
   * @param {Router} route
   * @memberof SummaryComponent
   */
  constructor(private route: Router) { }

  /**
   *
   * initialize the component
   * @memberof SummaryComponent
   */
  ngOnInit(): void {
    if (sessionStorage && sessionStorage.getItem('position')) {
      this.allPosition = JSON.parse(sessionStorage.getItem('position') || '');
    }
    if (sessionStorage && sessionStorage.getItem('myTeam')) {
      let myTeam: any = sessionStorage.getItem('myTeam');
      if (myTeam) {
        myTeam = JSON.parse(myTeam);
        if (myTeam && myTeam.length > 0) {
          myTeam.forEach((player: any) => {
            this.checkPosition(myTeam);
          });
        }
      }
    }
    if (this.favPlayer?.favPlayer) {
      this.checkPosition(this.favPlayer.favPlayer);
    }
  }

  /**
   *
   * goes to previous page
   * @memberof SummaryComponent
   */
  previous() {
    this.previousPage.emit({ step: 1 });
  }
  /**
   *
   * move to home page
   * @memberof SummaryComponent
   */
  next() {
    sessionStorage.setItem('player', JSON.stringify(this.favPlayer));
    sessionStorage.setItem('position', JSON.stringify(this.allPosition));
    this.route.navigate(['/home']);
  }
  /**
   *
   * counts the position of team
   * @param {*} team
   * @memberof SummaryComponent
   */
  checkPosition(team: any) {
    const position = team[2] ? team[2].toLowerCase().replace(' ', '') : '';
    switch (position) {
      case 'forward':
        console.log(this.allPosition.forwards);

        this.allPosition.forwards++;
        break;
      case 'defender':
        this.allPosition.defenders++;
        break;
      case 'goalkeeper':
        this.allPosition.goalkeepers++;
        break;
      case 'midfielder':
        this.allPosition.midfielders++;
        break;
      default:
        break;
    }
  }
}
