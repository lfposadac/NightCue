export class CreatePropertyDTo {
  constructor(
    public userId: string,
    public name: string,
    public capacity: number,
    public address: string,
    public contact: string,
    public schedule: string
  ) {}
}

export class getPropierty {
  constructor(public userId: string) {}
}

export class UpdatePropiertyDto {
  constructor(
    public name: string,
    public capacity: number,
    public address: string,
    public contact: string,
    public schedule: string
  ) {}
}
