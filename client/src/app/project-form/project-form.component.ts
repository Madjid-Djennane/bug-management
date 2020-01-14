import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {


  constructor(private projectService: ProjectService, private loginService: LoginService,
              private router: Router) { }

  projectModel = new Project('', '', '', '', null, null);

  existUser = true;
  currentMember = '';
  members = [];
  users = [];
  projects = [];
  request = {};
  successMsg = '';


  ngOnInit() {
    this.projectService.addProjet()
      .subscribe(
        data => {
          Object.keys(data).forEach(key => {
            if (key === 'users') {
              this.users = data[key];
            } else {
              this.projects = data[key];
            }
          });
        },
        err => {
          console.log(err.statusText);
        }
      );

  }

  addmember(value) {

    if (this.users.indexOf(value) === -1 ) {
      this.existUser = false;
    } else {
      this.existUser = true;
      this.members.push(value);
      this.currentMember = '';
    }
  }

  removemember(value) {
    this.members.splice(this.members.indexOf(value), 1);
  }

  onSubmit() {

    this.request = {
      title : this.projectModel.title,
      description : this.projectModel.description,
      admin: this.loginService.getTokenSubject().subject,
      members: this.members
    };

    this.projectService.add(this.request)
      .subscribe(
        data => {
          this.successMsg = 'Projet créé !';
          setTimeout(() => {
            this.successMsg = '';
          }, 3000);

          // this.router.navigate(['/template/home']);
        },
        err => {
          console.log(err.statusText);
        }
      );
  }
}
