import { OpenAiReqDto } from '../dto/req/openAiReq.dto';
import { RoleOpenAiEnum } from '../enums/roleOpenAiEnum';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export class AskRules {
  public static makeAskRulles(
    askPrompt: OpenAiReqDto,
  ): ChatCompletionMessageParam {
    return {
      role: RoleOpenAiEnum.SYSTEM,
      content: `Ти — історичний асистент, який створює стислі й точні історичні описи у форматі JSON.

Правила:
1. Завжди повертай відповідь у вигляді валідного JSON з полями:
{
  "country": "країна, яка володіла місцем народження - ${askPrompt.place} у рік ${askPrompt.yearStart}",
  "ruler": "ім'я і титул правителя країни у цей рік (${askPrompt.yearStart})",
  "worldSituation": "не менше 100 і не більше 150 слів про політичну, соціальну та історичну ситуацію у світі у період життя"
}

2. Не вигадуй дані. Якщо не впевнений — пиши "невідомо".
3. Мова відповіді — українська.
4. Дата початку - ${askPrompt.yearStart}. Якщо нема дати початку то датою початку вважай - 50 років до ${askPrompt.yearEnd}
5. Дата кінця - ${askPrompt.yearEnd}. Якщо нема дати кінця то датою кінця вважай - 50 років після ${askPrompt.yearStart}
6. Без додаткових коментарів чи пояснень — лише JSON.
7. Дані можна генерувати з власних знань, без обмеження зовнішніми джерелами.
8. Місце народження - зазвичай знаходиться на території сучасної України, але можу бути і в інших країнах світу. 
 Якщо точно невпевнений серед кількох можливих місць - обирай той, що в Західній Україні.
9. Якщо місто чи село не вказано - напиши "невідомо" у country та ruler`,
    };
  }

  public static makePrompt(
    askPrompt: OpenAiReqDto,
  ): ChatCompletionMessageParam {
    return {
      role: RoleOpenAiEnum.USER,
      content: `Період життя: ${askPrompt.yearStart}–${askPrompt.yearEnd}.
Місце народження: ${askPrompt.place}.
Опиши країну, правителя та світову ситуацію.`,
    };
  }
}
