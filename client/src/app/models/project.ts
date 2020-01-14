export class Project {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public admin: string,
    public members: string[],
    public issues: string[]
  ) {}
}
