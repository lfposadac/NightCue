export class UpdateUserDto {
  constructor(
    public roleId?: string,
    public name?: string,
    public lastName?: string,
    public password?: string,
    public email?: string,
    public cellphone?: string,
    public phone?: string,
    public address?: string,
    public urlProfilePhoto?: string,
    public lastSessionDate?: string,
    public score?: number,
    public status?: boolean
  ) {}
}

export class QueryUserDto {
  constructor(public _id?: string, public roleId?: string) {}
}

export class CreateUserDto {
  roleId: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  cellphone?: string;
  phone?: string;
  address?: string;

  constructor(
    roleId: string,
    name: string,
    lastName: string,
    password: string,
    email: string,
    cellphone?: string,
    phone?: string,
    address?: string
  ) {
    this.roleId = roleId;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.cellphone = cellphone;
    this.phone = phone;
    this.address = address;
  }
}
