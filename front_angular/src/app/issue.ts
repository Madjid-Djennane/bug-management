export class Issue {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public description: string,
    public priority: string,
    public assignedTo: string,
    public category: string,
    public status: string,
    public project: string
  ) {}
}
