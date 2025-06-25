import React, { FC } from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { datesActions } from '../../redux/slices/datesSlice';

const AllDatesPage: FC<{ yearStart?: number | null | undefined;  yearEnd?: number | null | undefined; dashboard?: boolean }> = ({yearStart, yearEnd, dashboard}) => {
  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(datesActions.AllDatesLoad, (state) => state.datesReducer, yearStart? yearStart : null,yearEnd? yearEnd : null);


  return (
    <div>
      <PaginationComponentSoft
        page={Number(currentPage)}
        setQwerty={setQwerty}
        key={`top-${page}`}
        total_pages={totalPages}
        limit={limit}
      />
      <AllDatesComponent dashboard={dashboard}/>
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