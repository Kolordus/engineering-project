import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {UsersComponent} from './components/admin/users/users.component';
import {SurveysComponent} from './components/admin/surveys/surveys.component';
import {SubjectsTableComponent} from './components/admin/subjects/subjects-table.component';
import {RatedSurveysComponent} from './components/home/rated-surveys/rated-surveys.component';
import {UnratedSurveysComponent} from './components/home/unrated-surveys/unrated-surveys.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'surveys', component: SurveysComponent},
      {path: 'subjects', component: SubjectsTableComponent}
    ]},
  {path: 'home',
    component: HomeComponent,
    children: [
      {path: 'rated-subjects', component: RatedSurveysComponent},
      {path: 'unrated-subjects', component: UnratedSurveysComponent}
    ]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  HomeComponent,
  RegisterComponent,
  AdminComponent,
  UsersComponent,
  SubjectsTableComponent,
  SurveysComponent,
  RatedSurveysComponent,
  UnratedSurveysComponent,
  NotFoundComponent
];
