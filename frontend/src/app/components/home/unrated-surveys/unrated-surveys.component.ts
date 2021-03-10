import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../../services/user-info.service';
import {CreateNewSurveyDialogComponent} from '../../dialogs/createNewSurveyDialog/create-new-survey-dialog.component';
import {HttpService, Subject, Survey} from '../../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {ShowTokenComponent} from "../../dialogs/show-token/show-token.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-unrated-surveys',
  templateUrl: './unrated-surveys.component.html',
  styleUrls: ['./unrated-surveys.component.css']
})
export class UnratedSurveysComponent implements OnInit{

  surveyRatesFromDialog: Survey;
  subjectToRate: Subject;
  unratedSubjects$: Observable<Array<Subject>>;

  constructor(public userInfo: UserInfoService,
              private http: HttpService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.unratedSubjects$ = this.http.getUnratedSubjects();
  }


  openDialog(subjectName: string) {

    const newSurveyDialog = this.dialog.open(CreateNewSurveyDialogComponent, {
      height: '550px',
      width: '450px',
    });

    newSurveyDialog.afterClosed().subscribe(surveyDialogData => {
      this.surveyRatesFromDialog = surveyDialogData;

      if (this.surveyRatesFromDialog) {
        this.http.getSubjectByName(subjectName).subscribe(subjectByName => {
          this.subjectToRate = subjectByName;

          const saveNewSurvey: Survey = ({
            id: null,
            subject: this.subjectToRate,
            userId: this.userInfo.getUserId().toString(),
            rate1: this.surveyRatesFromDialog.rate1,
            rate2: this.surveyRatesFromDialog.rate2,
            rate3: this.surveyRatesFromDialog.rate3,
            opinion: this.surveyRatesFromDialog.opinion,
            token: btoa(this.surveyRatesFromDialog.rate1.toString() +
              this.surveyRatesFromDialog.rate2.toString() +
              this.surveyRatesFromDialog.rate3.toString() +
              this.surveyRatesFromDialog.opinion +
              this.subjectToRate.name +
              this.userInfo.getUsername()),
          });
          this.http.saveSurvey(saveNewSurvey).subscribe(() => {
            this.showToken(saveNewSurvey.token);
            this.userInfo.unratedSubjects$ = this.http.getUnratedSubjects();
            console.log(saveNewSurvey.subject);
          });
        });
      }
    });
  }

  showToken(token: string) {
    this.dialog.open(ShowTokenComponent, {
      height: '250px',
      width: '520px',
      data: {
        token: token,
      }
    });
  }
}
