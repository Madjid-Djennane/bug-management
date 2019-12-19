export class Project {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public admin: string,
    public members: string[],
    public issues: string[]
  ) {}
}
