import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanfromHTMLandCSS {
  public stripHtmlAndCss(input: string): string {
    // Видалення HTML-тегів
    let withoutHtml = input.replace(/<[^>]*>/g, '');

    // Видалення CSS-стилів всередині тегів
    withoutHtml = withoutHtml.replace(/([a-zA-Z-]+):\s*[^;]+;?/g, '');

    // Видалення залишків спецсимволів
    return withoutHtml.replace(/&[a-zA-Z0-9#]+;/g, '').trim();
  }
}
