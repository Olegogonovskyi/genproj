import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenAiReqDto {
  @ApiProperty({
    example: 1756,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  yearStart?: number;

  @ApiProperty({
    example: 1830,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  yearEnd?: number;

  @ApiProperty({
    example: 'Верин',
  })
  @IsString()
  @IsOptional()
  place?: string;
}
