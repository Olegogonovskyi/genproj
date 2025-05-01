import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { ancestorsActions } from '../../redux/slices/ancestorsSlice';
import SearchComponent from '../../components/SearchFormComponent/SearchFormComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import AllAncestorsComponent from '../../components/allAncestorsComponent/AllAncestorsComponent';

const AllAncestorsPage: FC = () => {
  const {page, total} = useAppSelector(state => state.ancestorsReducer)
  const [qwerty, setQwerty] = useSearchParams({
    page: '1',
    offset: '0',
    limit: '10',      // Додаємо limit
    tag: '',    // Додаємо tag
    search: '',
  });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(qwerty.get('page') || '1');
  const limit = Number(qwerty.get('limit') || 10);
  const searchValue  = qwerty.get('search') || '';
  const totalPages = total/limit;
  const calculatedOffset  = Number((parseInt(currentPage) - 1) * parseInt(qwerty.get('limit') || '10'));
  useEffect(() => {

    setCurrentPage(qwerty.get('page') || '1');
    dispatch( ancestorsActions.AllAncestorsLoad({
      page: Number(currentPage),
      qwerty: {
        search: searchValue ,
        offset: calculatedOffset,
        limit: limit,
        tag: qwerty.get('tag') || ''
      }}));

  }, [calculatedOffset, limit, searchValue, qwerty]);

  return (
    <div>
      <h1>AllAncestorsPage</h1>
      <SearchComponent/>
      <hr/>
      <div><PaginationComponentSoft page={Number(currentPage)} setQwerty={setQwerty} key={page} total_pages={totalPages} /></div>
      <AllAncestorsComponent/>
      <div><PaginationComponentSoft page={Number(currentPage)} setQwerty={setQwerty} key={page} total_pages={totalPages} /></div>
      <h1>AllAncestorsPage</h1>
    </div>
  );
};

export default AllAncestorsPage;