import React, {FC} from 'react';
import { ancestorsActions } from '../../redux/slices/ancestorsSlice';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';
import style from './AllAncestorsPage.module.css'
import SearchFormComponent from '../../components/searchFormComponent/SearchFormComponent';
import AllAncestorsMuiComponent from '../../components/allAncestorsMuiComponent/AllAncestorsMuiComponent';


const AllAncestorsPage: FC = () => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(ancestorsActions.AllAncestorsLoad, (state) => state.ancestorsReducer);

  return (
    <div className={style.wrap}>
      <SearchFormComponent setQwerty={setQwerty} />
      <PaginationComponentSoft
        page={Number(currentPage)}
        setQwerty={setQwerty}
        key={`top-${page}`}
        total_pages={totalPages}
        limit={limit}
      />
      <AllAncestorsMuiComponent/>
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
