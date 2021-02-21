import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {UserInfoService} from './services/user-info.service';
import {CommonModule} from '@angular/common';
import {CreateNewSurveyDialogComponent} from './components/dialogs/createNewSurveyDialog/create-new-survey-dialog.component';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import { CheckSurveyDialogComponent } from './components/dialogs/check-survey-dialog/check-survey-dialog.component';
import { TokenDialogComponent } from './components/dialogs/token-dialog/token-dialog.component';
import { ShowTokenComponent } from './components/dialogs/show-token/show-token.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CreateNewSurveyDialogComponent,
    CheckSurveyDialogComponent,
    TokenDialogComponent,
    ShowTokenComponent,
  ],
  entryComponents: [CreateNewSurveyDialogComponent, CheckSurveyDialogComponent, TokenDialogComponent, ShowTokenComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [HttpService, UserInfoService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
