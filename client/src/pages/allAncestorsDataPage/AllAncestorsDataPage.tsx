import React, {FC} from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import SearchFormComponent from '../../components/searchFormComponent/SearchFormComponent';
import { ancestorsDateActions } from '../../redux/slices/ancestorsDateSlice';
import AllAncestorsDateComponent from '../../components/allAncestorsDateComponent/AllAncestorsDateComponent';


const AllAncestorsDataPage: FC = () => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(ancestorsDateActions.AllAncestorsDatesLoad, (state) => state.ancestorsDateReducer);

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
      <AllAncestorsDateComponent/>
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

export default AllAncestorsDataPage;
