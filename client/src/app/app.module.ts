import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'; // loading bar
/* import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 */

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IssueComponent } from './issue/issue.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TemplateComponent } from './template/template.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// MDB Angular Pro
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    MainComponent,
    IssueComponent,
    UserComponent,
    PageNotFoundComponent,
    LoginComponent,
    ProjectFormComponent,
    TemplateComponent,
    EditProjectComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
    HttpClientModule,
    SlimLoadingBarModule,
    AngularFontAwesomeModule
    /* MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule, */

  ],
  providers: [LoginService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
