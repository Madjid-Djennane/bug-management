import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Projects } from '../models/Projects';
import { Project } from '../models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private mainService: MainService, private router: Router) { }

  projects: Projects;
  adminProject: Project[];
  memberProject: Project[];

  ngOnInit() {

      this.mainService.getProjects()
        .subscribe(
          (data: Projects) => {
            this.projects = data;
            this.adminProject = this.projects.admin;
            this.memberProject = this.projects.member;
          },
          err => {
            console.log(err);
          }
        );
  }

  deleteProject(projectId) {
    this.mainService.deleteProject(projectId)
      .subscribe(
        data => {

          window.location.reload();
          // this.router.navigate(['/template/home']);
        },
        err => {
          console.error(err);
        }
      );
  }

}
