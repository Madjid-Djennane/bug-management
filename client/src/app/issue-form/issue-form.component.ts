import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issue';
import { User } from '../models/user';
import { IssueService } from '../services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    private _IssueService: IssueService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private actRoute: ActivatedRoute) { }

  // Issue model
  issueModel = new Issue('' , '', 'default', 'default', 'default', 'Pending', null);

  issueId: string;
  projectId = null;

  // declare arrays :
  priorities = ['low', 'high', 'medium'];
  categories = ['Bug', 'Incident'];
  stats = ['Pending', 'QA', 'Implementation', 'Closed'];
  members = [];
  successMsg = '';

  // Gestion du select priority
  // tslint:disable-next-line: member-ordering
  priorityHasError = true;

    // Gestion du select category
    // tslint:disable-next-line: member-ordering
  categoryHasError = true;

        // Gestion du select status
      // tslint:disable-next-line: member-ordering
  statusHasError = true;

  submitted = false;

  ngOnInit() {

    this.issueId = this.actRoute.snapshot.paramMap.get('_id');
    this.projectId = this.actRoute.snapshot.paramMap.get('projectId');

    this._IssueService.getProjectUsers(this.projectId)
        .subscribe(
          data => {
          this.members = data['members'];
        },
          err => {
          console.error(err);
        }
      );

    if (this.issueId != null) {
      this._IssueService.getSpecificIssue(this.issueId)
        .subscribe((data: Issue) => {
          this.issueModel = data;
        },
          err => {
            console.log(err);
          }
        );
    }

  }

  validatePriority(value) {
    if (value === 'default') {
      this.priorityHasError = true;
    } else {
      this.priorityHasError = false;
    }
  }

    validateCategory(value) {
      if (value === 'default') {
        this.categoryHasError = true;
      } else {
        this.categoryHasError = false;
      }
    }

        validateStatus(value) {
          if (value === 'default') {
            this.statusHasError = true;
          } else {
            this.statusHasError = false;
          }
        }

        public onSubmit() {

          if (this.issueId === null) {
            delete this.issueModel._id;
            this.issueModel.project = this.projectId;
            this._IssueService.addIssue(this.issueModel)
            .subscribe(
              data => {
                  this.successMsg = 'Issue créee !';
                  setTimeout(() => {
                    this.successMsg = '';
                }, 3000);

                  this.ngOnInit();

              // this._router.navigate(['/template/home']);
              },
              error => {
                console.error('Erreur : ', error);
              }
            );
          }  else {
            this._IssueService.updateIssue(this.issueModel)
              .subscribe(
                data => {
                  this.successMsg = 'Issue modifiée !';
                  setTimeout(() => {
                    this.successMsg = '';
                  }, 3000);

                //  this._router.navigate(['/template/home']);
                },
                error => {
                  console.error('Erreur : ', error);
                }
              );
          }

        }


}
