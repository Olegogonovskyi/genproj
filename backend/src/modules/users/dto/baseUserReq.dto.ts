import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransformHelper } from '../../../helpers/transformHelper';
import { NameValidDecorators } from '../../auth/decorators/nameValid.decorators';
import { RoleEnum } from 'src/database/enums/role.enum';
import { AuthMethodEnum } from '../../../database/enums/AuthMethodEnum';
import { ArticleResDto } from 'src/modules/articlesNew/dto/res/articleRes.dto';

export class BaseUserReqDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @NameValidDecorators()
  public readonly name: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'OlegOg@gmail.com',
  })
  public readonly email: string;

  @Transform(TransformHelper.trim)
  @IsNotIn(['password', 'qwe', 'asd', 'zxc', '123'])
  @IsString()
  @ValidateIf((o) => o.authMethod === AuthMethodEnum.EMAIL) // валідує тільки тоді, коли поле не дорівнює 'Oleg'
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Incorrect password',
  })
  @ApiProperty({
    example: 'OlegOg007$',
  })
  //(?=.*[A-Za-z]) - Має містити принаймні одну літеру (великі або малі літери)
  //(?=.*\d) - Має містити принаймні одну цифру.
  //[A-Za-z\d]{8,} - Має містити від 8 символів і більше, де допустимі символи - літери (великі та малі) і цифри.
  // Цей вираз перевіряє, що пароль має довжину мінімум 8 символів і містить хоча б одну літеру та одну цифру.
  public readonly password: string;

  @ApiProperty({ enum: RoleEnum })
  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;

  @ApiProperty({ enum: AuthMethodEnum })
  @IsEnum(AuthMethodEnum)
  authMethod: AuthMethodEnum;

  @IsOptional()
  articles?: ArticleResDto[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
