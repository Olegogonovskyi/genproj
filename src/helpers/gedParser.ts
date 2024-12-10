import fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GedParser {
  public parse(path: string) {
    const lines = fs.readFileSync(path, 'latin1').split('\n');
    const result = [];
    const stack = [];
    // Обробляємо кожен рядок
    lines.forEach((line) => {
      const match = line.match(/^(\d+) (\w+)(?: (.+))?$/); // Розпізнаємо рівень, тег і дані
      if (match) {
        const level = parseInt(match[1], 10);
        const tag = match[2];
        const value = match[3] || null;

        const node = { tag, value, children: [] };

        if (level === 0) {
          result.push(node);
          stack.length = 0; // Очищуємо стк
          stack.push(node);
        } else {
          while (stack.length > level) stack.pop(); // Повертаємося до потрібного рівня

          stack[stack.length - 1].children.push(node); // Додаємо дочірній елемент
          stack.push(node);
        }
      }
    });
    return result;
  }
}
