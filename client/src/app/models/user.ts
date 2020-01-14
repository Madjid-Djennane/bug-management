export class User {
  constructor(


    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public lname: string,
    public uname: string,
    public email: string,
    public password: string,
    public pwd: string,
    public role: string,
    public projects: object[],
    public projectsAdmin: object[]
    ) {}


}
