import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService,
              private actRoute: ActivatedRoute) { }

  projectId: string;
  project = new Project('', '', '', '', [], []);

  existUser = true;
  currentMember = '';
  members = [];
  users = [];
  projects = [];
  successMsg = '';

  request = {
    project : null,
    members : []
  };

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

    this.projectId = this.actRoute.snapshot.paramMap.get('projectId');

    this.projectService.getProject(this.projectId)
      .subscribe(
        (data: Project) => {
          this.project = data;

          this.project.members.forEach(element => {
              this.members.push(element['email']);

            });
        },
        err => {
          console.error(err);
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
    //console.log(this.members);

    this.request.project = this.project;
    this.request.members = this.members;

    this.projectService.updateProject(this.request)
      .subscribe(
        data => {
          this.successMsg = 'Projet modifié !';
          setTimeout(() => {
            this.successMsg = '';
          }, 3000);
          // this.router.navigate(['/template/home']);
        },
        err => {
          console.error(err);
        });
  }



}
