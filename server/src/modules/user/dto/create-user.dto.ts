import { IsEmail, MinLength, Matches } from 'class-validator';

const PASSWORD_REGEXP = /^(?=.*\d).{6,}$/;

class CreateUserDto {
  @IsEmail(undefined, { message: 'Invalid email address' })
  email: string;

  @Matches(PASSWORD_REGEXP, {
    message:
      'Password should contain a digit and be at least 6 characters long.',
  })
  password: string;

  @MinLength(2)
  username: string;
}

export default CreateUserDto;
