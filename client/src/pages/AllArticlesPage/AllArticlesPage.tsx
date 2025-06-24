import AllArticlesCompnent from '../../components/allArticleaCompnent/AllArticlesCompnent';
import { articlesActions } from '../../redux/slices/articlesSlice';
import React, { FC } from 'react';
import { useEntityLoader } from '../../hooks/useEntityLoader';
import SearchFormComponent from '../../components/searchFormComponent/SearchFormComponent';
import PaginationComponentSoft from '../../components/paginationComponentSoft/PaginationComponentSoft';



const AllArticlesPage: FC<{ dashboard?: boolean }> = ({dashboard}) => {

  const { setQwerty, currentPage, totalPages, limit, page } = useEntityLoader(articlesActions.searchArticleLoad, (state) => state.articlesReducer);

  return (
    <div>
      <SearchFormComponent setQwerty={setQwerty} />
      <PaginationComponentSoft
        page={Number(currentPage)}
        setQwerty={setQwerty}
        key={`top-${page}`}
        total_pages={totalPages}
        limit={limit}
      />
      <AllArticlesCompnent key={currentPage} dashboard={dashboard}/>
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

export default AllArticlesPage;
