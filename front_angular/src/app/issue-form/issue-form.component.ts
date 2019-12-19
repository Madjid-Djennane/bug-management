import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssueService } from '../issue.service';
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

  issueModel = new Issue('' , '', 'default', '', 'default', 'default', null);


    id = '';

  // declare arrays :
  priorities = ['low', 'high', 'medium'];
  categories = ['Bug', 'Incident'];
  stats = ['Pending', 'QA', 'Implementation', 'Closed'];

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
    this.id = this.actRoute.snapshot.paramMap.get('_id');

    if (this.id != null) {
      this._IssueService.getSpecificIssue(this.id)
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

    validateCategory(value){
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

          if (this.id === null) {
            delete this.issueModel._id;
            this._IssueService.addIssue(this.issueModel)
            .subscribe(
              data => {
                console.log(data);
                this._router.navigate(['/issue']);
              },
              error => {
                console.error('Erreur : ', error);
              }
            );
          }  else {
            this._IssueService.updateIssue(this.issueModel)
              .subscribe(
                data => {
                  this._router.navigate(['/issue']);
                },
                error => {
                  console.error('Erreur : ', error);
                }
              );
          }

        }


}
