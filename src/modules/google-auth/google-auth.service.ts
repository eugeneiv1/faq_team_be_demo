import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  constructor() {}

  public async googleLogin(req) {
    return req.user;
  }
}
