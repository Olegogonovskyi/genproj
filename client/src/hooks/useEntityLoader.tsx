import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSearchParams } from 'react-router-dom';
import { qertyConstants } from '../costants/qertyConstants';
import { IEntityListLoaderProps } from '../models/IEntityListWithLoaderProps';


export const useEntityLoader = (
  loadAction: Function,
  selector: (state: any) => { total: number, page: number}, ): IEntityListLoaderProps=> {
  const dispatch = useAppDispatch();
  const { total, page } = useAppSelector(selector);
  const [qwerty, setQwerty] = useSearchParams(qertyConstants);

  const [currentPage, setCurrentPage] = useState(qwerty.get('page') || '1');
  const limit = Number(qwerty.get('limit') || 10);
  const searchValue = qwerty.get('search') || '';
  const totalPages = Math.ceil(total / limit);
  const calculatedOffset = (parseInt(currentPage) - 1) * limit;

  useEffect(() => {
    setCurrentPage(qwerty.get('page') || '1');
    dispatch(loadAction({
      page: Number(currentPage),
      qwerty: {
        search: searchValue,
        offset: calculatedOffset,
        limit,
        tag: qwerty.get('tag') || ''
      }
    }));
  }, [calculatedOffset, qwerty]);

  return {
    currentPage,
    limit,
    totalPages,
    calculatedOffset,
    setQwerty,
    page,
  }
}
