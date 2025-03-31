import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import { searchRes } from '../../costants/Urls';
import { ISearchModel } from '../../models/ISearchModel';

const SearchComponent: FC = () => {
  const navigate = useNavigate()
  const {handleSubmit, register, reset} = useForm<ISearchModel>()
  const searchMovie = (keyword: ISearchModel) => {
    navigate(searchRes.searchResAll + `/?search=${keyword.query}`)
    reset()
  }
  return (
    <div>

        <form onSubmit={handleSubmit(searchMovie)}>
          <input type="text" placeholder={'шо треба?'} {...register('query')} />
          <button>Search</button>
        </form>

        </div>
  );
};

export default SearchComponent;