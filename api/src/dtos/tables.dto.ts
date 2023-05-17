export class CreateTableDto {
  constructor(
    public idPropierty: string,
    public type: string,
    public capacity: number,
    public description: string,
    public ubication: string,
    public typesOfSeats: string,
    public reservationCost: number,
    public minimumConsumption: number
  ) {}
}

export class QueryTableDto {
  constructor(public _id?: string, public idPropierty?: string) {}
}

export class UpdateTableDto {
  constructor(
    public type: string,
    public capacity: number,
    public description: string,
    public status: boolean,
    public ubication: string,
    public typesOfSeats: string,
    public accessibility: string,
    public reservationCost: number,
    public minimumConsumption: number
  ) {}
}
