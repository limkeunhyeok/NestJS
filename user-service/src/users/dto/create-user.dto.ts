import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from 'src/utils/decorators/not-in';

export class CreateUserDto {
  @Transform((params) => params.value.trim())
  @NotIn('password', {
    message: 'password는 name과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @Transform(({ value, obj }) => {
    // if (obj.password.includes(value.trim())) {
    //   throw new BadRequestException('password와 name과 같은 문자열을 포함할 수 없습니다.');
    // }
    return value.trim();
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/) // 사용자 패스워드는 영문대소문자와 숫자 또는 특수문자(!, @, #, $, %, ^, &, *, (, ))로 이루어진 8자 이상 30자 이하의 문자열이어야 한다.
  readonly password: string;
}
