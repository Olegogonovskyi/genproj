import React, { FC } from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { datesActions } from '../../redux/slices/datesSlice';

const AllDatesPage: FC = () => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(datesActions.AllDatesLoad, (state) => state.datesReducer);

  return (
    <div>
      <SearchFormComponent setQwerty={setQwerty} />
      <hr />
      <PaginationComponentSoft
        page={Number(currentPage)}
        setQwerty={setQwerty}
        key={`top-${page}`}
        total_pages={totalPages}
        limit={limit}
      />
      <AllDatesComponent/>
      <PaginationComponentSoft
        page={Number(currentPage)}
        setQwerty={setQwerty}
        key={`bottom-${page}`}
        total_pages={totalPages}
        limit={limit}
      />
    </div>
  );
};

export default AllDatesPage;