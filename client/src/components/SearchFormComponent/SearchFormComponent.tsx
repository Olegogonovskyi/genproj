import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import { searchRes } from '../../costants/Urls';
import { ISearchModel } from '../../models/ISearchModel';

const SearchFormComponent: FC = () => {
  const navigate = useNavigate()
  const {handleSubmit, register, reset} = useForm<ISearchModel>()
  const searchText = (keyword: ISearchModel) => {
    navigate(searchRes.searchResAll + `/?search=${keyword.search}`)
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