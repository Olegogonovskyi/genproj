import { Module } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ChronologyController } from './chronology.controller';

@Module({
  controllers: [ChronologyController],
  providers: [ChronologyService],
})
export class ChronologyModule {}
