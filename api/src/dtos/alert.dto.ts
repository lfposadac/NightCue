export class CreateAlertDto {
  constructor(userId: string, propiertyId: string, message: string) {}
}

export class getAlertDto {
  constructor(userId?: string, propiertyId?: string) {}
}

export class UpdateAlertDto {
  constructor(status: boolean) {}
}
