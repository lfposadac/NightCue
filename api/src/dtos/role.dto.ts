export class CreateRoleDto {
  name: string;
  description: string;
  access_ids: string[];

  constructor(name: string, description: string, access_ids: string[]) {
    this.name = name;
    this.description = description;
    this.access_ids = access_ids;
  }
}

export class QueryRoleDto {
  constructor(public _id?: string) {}
}

export class UpdateRoleDto {
  constructor(
    public name?: string,
    public description?: string,
    public access_ids?: string[],
    public status?: string
  ) {}
}
