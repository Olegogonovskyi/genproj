import React, { FC } from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import SearchFormComponent from '../../components/searchFormComponent/SearchFormComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import { usersActions } from '../../redux/slices/usersSlice';
import AllUsersComponent from '../../components/allUsersComponent/AllUsersComponent';

const AllUsersPage: FC = () => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(usersActions.AllUsersLoad,
    (state) => state.usersReducer);

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
      <AllUsersComponent/>
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

export default AllUsersPage;