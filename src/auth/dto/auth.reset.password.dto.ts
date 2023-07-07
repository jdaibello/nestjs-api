import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetPasswordDto {
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  @IsJWT()
  token: string;
}
