import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private _IssueService: IssueService) { }

  issues : Issue[];

  ngOnInit() {
    this._IssueService.getIssue()
            .subscribe((data : Issue[]) => {
              this.issues = data;
            });
  }



}
