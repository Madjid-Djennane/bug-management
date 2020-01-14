export class Issue {
  constructor(
    public _id: string,
    public description: string,
    public priority: string,
    public assignedTo: string,
    public category: string,
    public status: string,
    public project: string
  ) {}
}
