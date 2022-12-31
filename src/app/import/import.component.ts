import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  /**
   *
   * player list data from step-1
   * @type {*}
   * @memberof ImportComponent
   */
  importData: any;
  /**
   *
   * fav player data from step-2
   * @type {*}
   * @memberof ImportComponent
   */
  favPlayer: any;
  /**
   *
   * stores the current step index
   * @memberof ImportComponent
   */
  step = 0;
  /**
   *
   * stores the all steps reference
   * @type {*}
   * @memberof ImportComponent
   */
  @ViewChild('steps', { static: false }) steps: any;
  /**
   * Creates an instance of ImportComponent.
   * @memberof ImportComponent
   */
  constructor() { }

  /**
   *
   * component initialization
   * @memberof ImportComponent
   */
  ngOnInit(): void {
  }
  /**
   *
   * handling each step data and error validation
   * @param {*} ev
   * @return {*}
   * @memberof ImportComponent
   */
  next(ev: any) {
    const element = this.steps.nativeElement.childNodes;
    if (!(ev?.data)) {
      ev.error ? element[ev.step - 1].classList.add('error') : element[ev.step - 1].classList.remove('error');
      return;
    }
    switch (ev.step) {
      case 1:
        this.importData = ev.data;
        this.step = 1;
        element[ev.step - 1].classList.add('blue-bg');
        break;
      case 2:
        this.favPlayer = ev.data;
        this.step = 2;
        element[ev.step - 1].classList.add('blue-bg');
        element[ev.step].classList.add('blue-bg');
        this.steps
        break;
      default:
        break;
    }
  }
  previous(ev: any) {
    this.step = ev.step;
  }

}
