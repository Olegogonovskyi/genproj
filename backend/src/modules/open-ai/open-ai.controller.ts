import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';
import { OpenAiReqDto } from './dto/req/openAiReq.dto';

@ApiTags(ControllerEnum.OPENAI)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller(ControllerEnum.OPENAI)
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @ApiOperation({
    summary: `ask AI *only for registered users*`,
  })
  @Post()
  getResp(@Body() askAiDto: OpenAiReqDto): Promise<string> {
    return this.openAiService.askOpenAi(askAiDto);
  }
}
