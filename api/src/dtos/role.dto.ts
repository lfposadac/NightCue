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
