import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-new-survey-dialog.component.html',
  styleUrls: ['./create-new-survey-dialog.component.css']
})
export class CreateNewSurveyDialogComponent implements OnInit {

  rates = ['1', '2', '3', '4', '5'];

  constructor() { }

  ngOnInit() {
  }



}
