import React, { FC, useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import { useSearchParams} from 'react-router-dom';
import { articlesActions } from '../../redux/slices/articlesSlice';
import SearchComponent from '../../components/searchComponent/SearchComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';


const SearchPage: FC = () => {
  const { page, total, offset,  search} = useAppSelector(state => state.articlesReducer);
  const [qwerty, setQwerty] = useSearchParams({
    page: '1',
    offset: '0',
    limit: '10',      // Додаємо limit
    tag: 'string',    // Додаємо tag
    search: 'string',
    total: ''// Додаємо search
  });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(qwerty.get('page') || '1');
  const limit = qwerty.get('limit') || 10;
  const searchValue  = qwerty.get('search') || '';
  const calculatedOffset  = (parseInt(currentPage) - 1) * parseInt(qwerty.get('limit') || '10');
  useEffect(() => {

    setCurrentPage(qwerty.get('page') || '1');
      dispatch( articlesActions.searchArticleLoad({
        page: Number(currentPage),
        qwerty: {
          search: searchValue ,
          offset: Number(calculatedOffset)
        }}));

  }, [currentPage, calculatedOffset, limit, searchValue, qwerty]);

  return (
    <div>
      <div><PaginationComponentSoft page={page} setQwerty={setQwerty} key={page} total_pages={total} /></div>
      <SearchComponent />
      <div><PaginationComponentSoft page={page} setQwerty={setQwerty} key={page} total_pages={total} /></div>
    </div>
  );
};

export default SearchPage;