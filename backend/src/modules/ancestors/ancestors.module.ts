import { Module } from '@nestjs/common';
import { AncestorsService } from './services/ancestors.service';
import { AncestorsController } from './ancestors.controller';

@Module({
  controllers: [AncestorsController],
  providers: [AncestorsService],
})
export class AncestorsModule {}
