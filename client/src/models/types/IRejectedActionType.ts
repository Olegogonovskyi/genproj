import { Action, SerializedError } from '@reduxjs/toolkit';

export type RejectedAction = Action & {
  error: SerializedError;
};