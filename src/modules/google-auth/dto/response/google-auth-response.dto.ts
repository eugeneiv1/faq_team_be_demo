import { EGoogLeAuthAction } from '../../enums/google-auth-action.enum';

export class GoogleAuthResponseDto {
  accessToken: string;
  authInfo: EGoogLeAuthAction;
  email?: string;
  full_name?: string;
}
