import { OpenAiReqDto } from '../dto/req/openAiReq.dto';
import { RoleOpenAiEnum } from '../enums/roleOpenAiEnum';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class AskRules {
  public static makeAskRulles(
    askPrompt: OpenAiReqDto,
  ): ChatCompletionMessageParam {
    const [startYear] = this.datesMaker(askPrompt.yearStart, askPrompt.yearEnd);
    return {
      role: RoleOpenAiEnum.SYSTEM,
      content: `Ти — історичний асистент, який створює стислі й точні історичні описи у форматі JSON.

Правила:
1. Завжди повертай відповідь у вигляді валідного JSON з полями:
{
  "country": "країна, яка володіла місцем народження - ${askPrompt.place} у рік ${startYear}",
  "ruler": "ім'я і титул правителя країни у цей рік (${startYear})",
  "worldSituation": "не менше 80 і не більше 130 слів про політичну, соціальну та історичну ситуацію у світі у період життя"
}

2. Не вигадуй дані. Якщо не впевнений — пиши "невідомо".
3. Мова відповіді — українська.
4. Без додаткових коментарів чи пояснень — лише JSON.
5. Дані можна генерувати з власних знань, без обмеження зовнішніми джерелами.
6. Місце народження - зазвичай знаходиться на території сучасної України. Якщо невпевнений серед кількох можливих кандидатів - обирай той, що в Західній Україні
7. Якщо не впевнений про яке саме місто чи село народження йдеться або місто чи село не вказано - напиши "невідомо" у country та ruler`,
    };
  }

  public static makePrompt(
    askPrompt: OpenAiReqDto,
  ): ChatCompletionMessageParam {
    const [yearStart, yearEnd] = this.datesMaker(
      askPrompt.yearStart,
      askPrompt.yearEnd,
    );
    return {
      role: RoleOpenAiEnum.USER,
      content: `Період життя: ${yearStart}–${yearEnd}.
Місце народження: ${askPrompt.place}.
Опиши країну, правителя та світову ситуацію.`,
    };
  }

  private static datesMaker(start?: number, end?: number) {
    const startYear = start ?? (end ? end - 50 : undefined);
    const endYear = end ?? (start ? start + 50 : undefined);
    return [startYear, endYear];
  }
}
