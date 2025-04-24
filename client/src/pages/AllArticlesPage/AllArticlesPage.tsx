import React, { FC, useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import { useSearchParams} from 'react-router-dom';
import { articlesActions } from '../../redux/slices/articlesSlice';
import SearchComponent from '../../components/SearchFormComponent/SearchFormComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import AllArticlesCompnent from '../../components/allArticleaCompnent/AllArticlesCompnent';


const AllArticlesPage: FC = () => {
  const { page, total } = useAppSelector(state => state.articlesReducer);
  const [qwerty, setQwerty] = useSearchParams({
    page: '1',
    offset: '0',
    limit: '10',      // Додаємо limit
    tag: '',    // Додаємо tag
    search: '',
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
          offset: Number(calculatedOffset),
          limit: Number(limit),
          tag: qwerty.get('tag') || ''
        }}));

  }, [calculatedOffset, limit, searchValue, qwerty]);

  return (
    <div>
      <h1>AllArticlesPage</h1>
      <SearchComponent/>

      <hr/>
      <div><PaginationComponentSoft page={Number(currentPage)} setQwerty={setQwerty} key={page} total_pages={total} /></div>
      <AllArticlesCompnent />
      <div><PaginationComponentSoft page={Number(currentPage)} setQwerty={setQwerty} key={page} total_pages={total} /></div>
      <h1>AllArticlesPage end</h1>
    </div>
  );
};

export default AllArticlesPage;