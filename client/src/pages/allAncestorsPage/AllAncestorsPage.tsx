import React, {FC} from 'react';
import AllAncestorsComponent from '../../components/allAncestorsComponent/AllAncestorsComponent';
import { ancestorsActions } from '../../redux/slices/ancestorsSlice';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import SearchFormComponent from '../../components/SearchFormComponent/SearchFormComponent';


const AllAncestorsPage: FC = () => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(ancestorsActions.AllAncestorsLoad, (state) => state.ancestorsReducer);

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
      <AllAncestorsComponent/>
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

export default AllAncestorsPage;
