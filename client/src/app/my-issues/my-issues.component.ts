import { Component, OnInit } from '@angular/core';
import { MyissueService } from '../services/myissue.service';
import { Issue } from '../models/issue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-issues',
  templateUrl: './my-issues.component.html',
  styleUrls: ['./my-issues.component.scss']
})
export class MyIssuesComponent implements OnInit {

  constructor(private myIssueService: MyissueService, private router: Router) { }

  issues;
  successMsg = '';
  status = ['Pending', 'Implementation', 'QA', 'Closed'];

  button: string;

  ngOnInit() {

    this.myIssueService.getMyIssues()
      .subscribe(
        (data) => {
          this.issues = data;
        },
        err => {
          console.error(err);
        }
      );

  }

  nextStep(issueId) {
    this.myIssueService.nextStep(issueId)
      .subscribe(
        data => {
/*           this.successMsg = 'Done !';
          setTimeout(() => {
            this.successMsg = '';
          }, 2000); */

        this.ngOnInit();
        },
        err => {
          console.error(err);
        }
      );
  }

}
