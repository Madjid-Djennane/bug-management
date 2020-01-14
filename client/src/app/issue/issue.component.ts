import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issue';
import { Project } from '../models/project';
import { IssueService } from '../services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private issueService: IssueService, private router: Router,
              private actRoute: ActivatedRoute ) { }

  issues: Issue[];
  projectId = null;
  admin: boolean;
  title: string;

  project: Project;

  ngOnInit() {

    this.projectId = this.actRoute.snapshot.paramMap.get('id');
    this.title = this.actRoute.snapshot.paramMap.get('title');

    this.issueService.getIssue(this.projectId)
            .subscribe((data: Issue[]) => {
              this.issues = data;
            });

    this.issueService.isAdmin(this.projectId)
            .subscribe(
              (data: boolean) => {
                this.admin = data;
              },
              err => {
                console.error(err);
              }
            );
  }

  takeIssue(issueId) {
    this.issueService.takeIssue(issueId)
      .subscribe(
        data => {
          this.router.navigate(['/template/home']);
        },
        err => {
          console.error(err);
        }
      );
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(res => {
      console.log('Deleted');
    });
    window.location.reload();
  }

  isAdmin(projectId) {

  }

}



