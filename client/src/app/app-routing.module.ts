import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { IssueComponent } from './issue/issue.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MyIssuesComponent } from './my-issues/my-issues.component';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'addUser', component : UserFormComponent},
  {path : 'template', component : TemplateComponent, canActivate : [AuthGuard],
    children: [
      {path : 'addProject', component: ProjectFormComponent, canActivate : [AuthGuard]},
      {path : 'editProject/:projectId', component: EditProjectComponent, canActivate : [AuthGuard]},
      {path : 'issue/:id/:title', component: IssueComponent, canActivate : [AuthGuard]},
      {path : 'updateIssue/:_id/:projectId', component: IssueFormComponent, canActivate : [AuthGuard]},
      {path : 'addIssue/:projectId', component : IssueFormComponent, canActivate : [AuthGuard]},
      {path : 'getIssues', component : MyIssuesComponent, canActivate : [AuthGuard]},
      {path : 'profil', component: ProfilComponent, canActivate : [AuthGuard]},
      {path : 'user', component : UserComponent, canActivate : [AuthGuard]},
      {path : 'home', component : MainComponent, canActivate : [AuthGuard]},
    ]

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
  EditProjectComponent,
  MyIssuesComponent,
  PageNotFoundComponent
];
