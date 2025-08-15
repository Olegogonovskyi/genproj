import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiReqDto } from './dto/req/openAiReq.dto';
import { ConfigService } from '@nestjs/config';
import { Config, OpenAiConfig } from '../../config/config.types';
import { AskRules } from './services/askRules';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;
  constructor(private readonly configService: ConfigService<Config>) {
    const openAiConfig = configService.get<OpenAiConfig>('openAi');
    if (!openAiConfig?.OpenAiKey) {
      throw new Error('OPENAI_API_KEY is missing');
    }
    this.openai = new OpenAI({
      apiKey: openAiConfig.OpenAiKey,
    });
  }

  public async askOpenAi(askPrompt: OpenAiReqDto) {
    const { yearStart, yearEnd } = askPrompt;
    if (!yearStart && !yearEnd) {
      return 'There are no dates';
    }
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        AskRules.makeAskRulles(askPrompt),
        AskRules.makePrompt(askPrompt),
      ],
      temperature: 0.6,
    });

    return completion.choices[0].message?.content || '';
  }
}
