export class CreateAccessDto {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export class UpdateAccessDto {
  constructor(
    public name?: string,
    public description?: string,
    public status?: boolean
  ) {}
}

export class QueryAccessDto {
  constructor(public _id?: string) {}
}
