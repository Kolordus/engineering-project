import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { ProfileComponent } from './components/home/profile/profile.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { TopnavComponent } from './components/topnav/topnav.component';
import {JwtInterceptor} from "./services/interceptor/JwtInterceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CreateNewSurveyDialogComponent,
    CheckSurveyDialogComponent,
    TokenDialogComponent,
    ShowTokenComponent,
    ProfileComponent,
    TopnavComponent,
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
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpService, UserInfoService, {
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
