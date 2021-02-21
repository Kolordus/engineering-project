import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../../services/user-info.service';
import {HttpService} from '../../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {CheckSurveyDialogComponent} from '../../dialogs/check-survey-dialog/check-survey-dialog.component';
import {checkIfClassIsExported} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {TokenDialogComponent} from "../../dialogs/token-dialog/token-dialog.component";

@Component({
  selector: 'app-rated-surveys',
  templateUrl: './rated-surveys.component.html',
  styleUrls: ['./rated-surveys.component.css']
})
export class RatedSurveysComponent implements OnInit {

  constructor(public userInfo: UserInfoService,
              private http: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.userInfo.userSurveys$ = this.http.getUserSurveys();
  }

  checkSurvey() {
    const checkSurveyDialog = this.dialog.open(CheckSurveyDialogComponent, {
      height: '200px',
      width: '400px'
    });

    checkSurveyDialog.afterClosed().subscribe(data => {

      if (data !== undefined) {
        this.http.checkSurvey(data).subscribe(response => {
          this.dialog.open(TokenDialogComponent, {
            height: '130px',
            width: '200px',
            data: {
              message: response,
            }
          });
        });
      }
    });

  }

}
