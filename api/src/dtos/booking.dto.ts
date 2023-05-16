export class CreateBookingDto {
  constructor(
    public idTable: string,
    public userId: string,
    public date: Date,
    public numberOfGuests: number
  ) {}
}

export class QueryBookingDto {
  constructor(
    public _id?: string,
    public idTable?: string,
    public userId?: string,
    public date?: Date,
    public status?: string
  ) {}
}

export class UpdateBookingDto {
  constructor(public date?: Date, public status?: string) {}
}
