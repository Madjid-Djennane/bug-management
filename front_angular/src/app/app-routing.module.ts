import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { IssueComponent } from './issue/issue.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProjectFormComponent } from './project-form/project-form.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'addUser', component : UserFormComponent},
  {path : 'addProject', component: ProjectFormComponent, canActivate : [AuthGuard]},
  {path : 'issue', component: IssueComponent, canActivate : [AuthGuard]},
  {path : 'updateIssue/:_id', component: IssueFormComponent, canActivate : [AuthGuard]},
  {path : 'addIssue', component : IssueFormComponent, canActivate : [AuthGuard]},
  {path : 'user', component : UserComponent, canActivate : [AuthGuard]},
  {path : 'home', component : MainComponent, canActivate : [AuthGuard],
    children:[]
  },
  {path: "**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  UserFormComponent,
  IssueFormComponent,
  IssueComponent,
  MainComponent,
  UserComponent,
  ProjectFormComponent,
  PageNotFoundComponent
];
