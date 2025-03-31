import React, { FC, useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import { useSearchParams} from 'react-router-dom';
import { articlesActions } from '../../redux/slices/articlesSlice';
import SearchComponent from '../../components/searchComponent/SearchComponent';


const SearchPage: FC = () => {
  const { page, total } = useAppSelector(state => state.articlesReducer);
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

  useEffect(() => {
    const pageFromUrl = qwerty.get('page') || '1';
    setCurrentPage(pageFromUrl);

    const offset = (parseInt(pageFromUrl) - 1) * parseInt(qwerty.get('limit') || '10');

    if (query) {
      dispatch( articlesActions.searchArticleLoad({
        query: { query },
        page: pageFromUrl,
        offset: offset,
        limit: qwerty.get('limit') || 10,
        tag: qwerty.get('tag') || 'string',
        search: qwerty.get('search') || 'string',
      }));
    }
  }, [query, qwerty, dispatch]);

  return (
    <div>
      <div><PaginationComponentSoft page={page} setQwerty={setQwerty} key={page} total_pages={total} /></div>
      <SearchComponent />
      <div><PaginationComponentSoft page={page} setQwerty={setQwerty} key={page} total_pages={total} /></div>
    </div>
  );
};

export default SearchPage;