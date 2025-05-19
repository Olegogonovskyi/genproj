import { SetURLSearchParams } from 'react-router-dom';

export interface IEntityListLoaderProps {
  currentPage: string,
  limit: number,
  totalPages: number,
  calculatedOffset: number,
  setQwerty: SetURLSearchParams,
  page: number,
}