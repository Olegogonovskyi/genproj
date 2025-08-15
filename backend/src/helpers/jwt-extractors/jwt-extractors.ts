// utils/jwt-extractors.ts
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

export const extractJwtFromCookie = (req: Request): string | null => {
  // Шукаємо токен у куках (хоча нафіг тре, певно від кукі відмовлюсь)
  if (req?.cookies?.access_token) {
    return req.cookies.access_token;
  }
  // Якщо токена немає в куках, шукаємо в заголовку
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};
