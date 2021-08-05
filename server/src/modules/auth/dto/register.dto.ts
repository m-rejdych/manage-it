import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

const PASSWORD_REGEXP = /^(?=.*\d).{6,}$/;

class RegisterDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @Matches(PASSWORD_REGEXP, {
    message:
      'Password should contain a digit and be at least 6 characters long.',
  })
  password: string;

  @IsString({ message: 'Username must be a string.' })
  @MinLength(2, { message: 'Username must be at least 2 characters long.' })
  username: string;

  repeatPassword: string;
}

export default RegisterDto;
