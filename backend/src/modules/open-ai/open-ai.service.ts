import { Injectable, UnauthorizedException } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiReqDto } from './dto/req/openAiReq.dto';
import { ConfigService } from '@nestjs/config';
import { Config, OpenAiConfig } from '../../config/config.types';
import { AskRules } from './services/askRules';
import { PersonRepository } from '../repository/services/person.repository';
import { OpenAiResDto } from './dto/res/openAiRes.dto';
import { ReqAfterGuardDto } from '../auth/dto/req/reqAfterGuard.dto';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly personRepository: PersonRepository,
  ) {
    const openAiConfig = configService.get<OpenAiConfig>('openAi');
    if (!openAiConfig?.OpenAiKey) {
      throw new Error('OPENAI_API_KEY is missing');
    }
    this.openai = new OpenAI({
      apiKey: openAiConfig.OpenAiKey,
    });
  }

  public async askOpenAi(
    askPrompt: OpenAiReqDto,
    userData: ReqAfterGuardDto,
  ): Promise<OpenAiResDto> {
    const { yearStart, yearEnd } = askPrompt;
    if (!userData.isVerified) {
      throw new UnauthorizedException('Користувач не верифікований');
    }
    if (!yearStart && !yearEnd) {
      return {};
    }
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        AskRules.makeAskRulles(askPrompt),
        AskRules.makePrompt(askPrompt),
      ],
      response_format: { type: 'json_object' },
      temperature: 0.6,
    });
    if (completion) {
      const ancestor = await this.personRepository.findOneBy({
        id: askPrompt.id,
      });
      this.personRepository.merge(ancestor, {
        worldSituation: completion.choices[0].message?.content,
      });
      await this.personRepository.save(ancestor);
    }
    return JSON.parse(completion.choices[0].message.content);
  }
}
