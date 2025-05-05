import React, { FC, useEffect, useState} from "react";
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { qertyConstants } from '../costants/qertyConstants';
import PaginationComponentSoft from "../components/paginationComponentSoft/PaginationComponentSoft";
import SearchComponent from '../components/SearchFormComponent/SearchFormComponent';

export const withEntityLoader = (
                            ListComponent: FC<any>,
                            loadAction: Function,
                            selector: (state: any) => { total: number, page: number },
                          ) => {
  const WrappedComponent = (props: any) => {
    const location = useLocation()
    const dispatch = useAppDispatch();
    const { total, page } = useAppSelector(selector);
    const [qwerty, setQwerty] = useSearchParams(qertyConstants);

    const [currentPage, setCurrentPage] = useState(qwerty.get('page') || '1');
    const limit = Number(qwerty.get('limit') || 10);
    const searchValue = qwerty.get('search') || '';
    const totalPages = Math.ceil(total / limit);
    const calculatedOffset = (parseInt(currentPage) - 1) * limit;

    useEffect(() => {
      setCurrentPage(qwerty.get('page') || '1');
      dispatch(loadAction({
        page: Number(currentPage),
        qwerty: {
          search: searchValue,
          offset: calculatedOffset,
          limit,
          tag: qwerty.get('tag') || ''
        }
      }));
    }, [calculatedOffset, qwerty]);

    return (
      <div>
        <SearchComponent location={location}/>
        <hr />
        <PaginationComponentSoft
          page={Number(currentPage)}
          setQwerty={setQwerty}
          key={`top-${page}`}
          total_pages={totalPages}
          limit={limit}
        />
        <ListComponent  {...props}/>
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

  return WrappedComponent;
};
