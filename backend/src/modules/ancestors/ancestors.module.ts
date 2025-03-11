import { Module } from '@nestjs/common';
import { AncestorsService } from './services/ancestors.service';
import { AncesorsController } from './ancestors.controller';

@Module({
  controllers: [AncesorsController],
  providers: [AncestorsService],
})
export class AncestorsModule {}
