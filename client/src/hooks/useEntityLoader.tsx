import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { qertyConstants } from '../costants/qertyConstants';
import { IEntityListLoaderProps } from '../models/IEntityListWithLoaderProps';
import { useAppDispatch, useAppSelector } from '../redux/store';


export const useEntityLoader = (
  loadAction: Function,
  selector: (state: any) => { total: number, page: number },
  yearStart?: number,
  yearEnd?: number

): IEntityListLoaderProps => {
  const dispatch = useAppDispatch();
  const { total, page } = useAppSelector(selector);
  const [qwerty, setQwerty] = useSearchParams(qertyConstants);

  const currentPage = Number(qwerty.get('page') || '1');
  const limit = Number(qwerty.get('limit') || 10);
  const searchValue = qwerty.get('search') || '';
  const tag = qwerty.get('tag') || '';
  const calculatedOffset = (currentPage - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(loadAction({
      page: currentPage,
      qwerty: {
        search: searchValue,
        offset: calculatedOffset,
        limit,
        tag,
        yearStart,
        yearEnd
      }
    }));
  }, [qwerty.toString()]);

  return {
    currentPage: String(currentPage),
    limit,
    totalPages,
    calculatedOffset,
    setQwerty,
    page,
  };
};
