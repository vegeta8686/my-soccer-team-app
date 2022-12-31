import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COLUMNS } from 'src/app/constants/player';

@Component({
  selector: 'app-import-players',
  templateUrl: './import-players.component.html',
  styleUrls: ['./import-players.component.scss']
})
export class ImportPlayersComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('inputFile', { static: false }) inputFileRef: any;
  /**
   *
   * stores the players data
   * @type {*}
   * @memberof ImportPlayersComponent
   */
  playerRecords: any;
  /**
   *
   * stores the static column names
   * @memberof ImportPlayersComponent
   */
  staticColumns = COLUMNS;
  /**
   *
   * stores the extracted columns
   * @type {*}
   * @memberof ImportPlayersComponent
   */
  columns: any;
  /**
   *
   * stores the validation
   * @memberof ImportPlayersComponent
   */
  errorMsg = '';
  /**
   *
   * stores the selected file name
   * @memberof ImportPlayersComponent
   */
  selectedFile = ''
  /**
   *
   * extracted data
   * @memberof ImportPlayersComponent
   */
  @Output() extractedData = new EventEmitter();
  /**
   *
   * step 1 data
   * @type {*}
   * @memberof ImportPlayersComponent
   */
  @Input() importData: any;
  /**
   * Creates an instance of ImportPlayersComponent.
   * @param {FormBuilder} fb
   * @memberof ImportPlayersComponent
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      teamName: [''],
      fileName: [''],
      records: [[]],
      headers: [[]]
    })
  }

  /**
   *
   * initialize the component
   * @memberof ImportPlayersComponent
   */
  ngOnInit(): void {
    if (this.importData) {
      this.form.patchValue(this.importData);
      this.selectedFile = this.importData?.fileName;
    }
  }
  /**
   *
   * on click put ref value empty to trigger change method
   * @param {*} ev
   * @memberof ImportPlayersComponent
   */
  onClick(ev: any) {
    this.inputFileRef.value = '';
  }
  /**
   *
   * opens the file explorer
   * @param {*} ev
   * @memberof ImportPlayersComponent
   */
  onSelect(ev: any) {
    const file = ev.target.files[0];
    if (!file) return;
    if (this.isCsvFile(file)) {
      const reader = new FileReader();
      this.errorMsg = '';
      this.selectedFile = file.name;
      this.form.get('fileName')?.patchValue(this.selectedFile);
      reader.readAsText(file);
      reader.onload = () => {
        let playerArray = (<string>reader.result).split(/\r\n|\n/);
        this.extractPlayers(playerArray);
      };
      reader.onerror = () => {
        this.errorMsg = 'Some Error Occured while parsing ! please reupload file'
      }
    } else {
      this.errorMsg = 'Please upload valid .csv file';
    }
    this.extractedData.emit({ error: this.errorMsg, step: 1 });
  }

  /**
   *
   * check if csv file is uploaded or not
   * @param {*} file
   * @return {*}
   * @memberof ImportPlayersComponent
   */
  isCsvFile(file: any) {
    return file.name.endsWith('.csv');
  }
  /**
   *
   * extract data and prepare list
   * @param {*} data
   * @memberof ImportPlayersComponent
   */
  extractPlayers(data: any) {
    this.columns = data[0].split(',')
    const rows: any = [];
    if (this.columns.length === this.staticColumns.length) {
      data.forEach((ele: any) => {
        if (ele) {
          const row = ele.split(',')
          rows.push(row);
        }
      });
      this.playerRecords = rows.length > 1 ? rows.slice(1) : [];
      this.form.get('records')?.setValue(this.playerRecords);
      this.form.get('headers')?.setValue(this.columns);
    } else {
      this.errorMsg = 'Some Fields are missing! Please check whether your having all the columns shown below';
    }
    this.extractedData.emit({ error: this.errorMsg, step: 1 });
  }
  /**
   *
   * on continue move to next step
   * @memberof ImportPlayersComponent
   */
  onContinue() {
    this.extractedData.emit({ data: this.form.value, step: 1 });
  }
  /**
   *
   * disable the continue button if no data
   * @return {*}
   * @memberof ImportPlayersComponent
   */
  isDisable() {
    return (this.form?.get('teamName')?.value && this.form?.get('records')?.value.length > 0);
  }
}
