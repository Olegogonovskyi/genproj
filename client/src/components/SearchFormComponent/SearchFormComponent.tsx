import React, {FC} from 'react';
import { useNavigate, Location  } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { ISearchModel } from '../../models/ISearchModel';

const SearchFormComponent: FC<{ location: Location }> = ({location}) => {
  const navigate = useNavigate()

  const {handleSubmit, register, reset} = useForm<ISearchModel>()
  const searchText = (keyword: ISearchModel) => {
    navigate( location.pathname + location.search)
    reset()
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