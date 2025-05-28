import React, { FC } from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import AllDatesComponent from '../../components/allDatesComponent/AllDatesComponent';
import { datesActions } from '../../redux/slices/datesSlice';
import { useAppSelector } from '../../redux/store';

const AllDatesPage: FC = () => {
const {yearStart, yearEnd} = useAppSelector((state) => state.datesReducer)
  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(datesActions.AllDatesLoad, (state) => state.datesReducer, yearStart,yearEnd);


  return (
    <div>
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