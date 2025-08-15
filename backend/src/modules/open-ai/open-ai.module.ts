import { Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [JwtModule, AuthModule],
  controllers: [OpenAiController],
  providers: [OpenAiService],
})
export class OpenAiModule {}
