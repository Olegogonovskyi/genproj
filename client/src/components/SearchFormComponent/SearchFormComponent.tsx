import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import { ISearchModel } from '../../models/ISearchModel';

const SearchFormComponent: FC<{ setQwerty?: any }> = ({setQwerty}) => {
  const {handleSubmit, register } = useForm<ISearchModel>()
  const searchText = (keyword: ISearchModel) => {
    setQwerty((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);
      if (keyword.search) {
        newParams.set('search', keyword.search);
      }
      newParams.set('page', '1');
      return newParams;
    });

  }
  return (
    <div>
        <form onSubmit={handleSubmit(searchText)}>
          <input type="text" placeholder={'шо треба?'} {...register('search')} />
          <button>Search</button>
        </form>
        </div>
  );
};

export default SearchFormComponent;