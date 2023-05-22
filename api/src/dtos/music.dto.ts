export class CreateMusicDto {
  constructor(
    userId: string,
    propiertyId: string,
    name: string,
    description?: string,
    link?: string,
    artist?: string,
    album?: string,
    genre?: string
  ) {}
}

export class getMusicDto {
  constructor(userId?: string, propiertyId?: string) {}
}

export class UpdateMusicDto {
  constructor(status: boolean) {}
}
