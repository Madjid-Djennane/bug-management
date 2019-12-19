import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  constructor(private projectService: ProjectService, private loginService: LoginService) { }

  projectModel = new Project('', '', '', '', null, null);

  existUser = true;
  currentMember = '';
  members = [];
  users = [];
  projects = [];
  request = {};


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
      title : this.projectModel.name,
      description : this.projectModel.description,
      admin: this.loginService.getTokenSubject().subject,
      members: this.members
    };
    console.log(this.request);
    this.projectService.add(this.request)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err.statusText);
        }
      );
  }
}
