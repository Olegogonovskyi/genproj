import { ApiProperty } from '@nestjs/swagger';

export class TagsResDto {
  @ApiProperty({ description: 'Tags name' })
  name: string;
  @ApiProperty({ description: 'Count of posts with Tag' })
  articleCount: number;
}

