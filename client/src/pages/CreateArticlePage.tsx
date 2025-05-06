import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import { IArticleReqModel } from '../models/IArticleReqModel';


const CreateArticlePage: FC = () => {
  const {handleSubmit, register } = useForm<IArticleReqModel>()
  const searchText = (keyword: IArticleReqModel) => {
console.log(keyword)
    };

  return (
    <div>
      <form onSubmit={handleSubmit(searchText)}>
        <input type="text" placeholder={'title '} {...register('title')} />
        <input type="text" placeholder={'title '} {...register('description')} />
        <input type="text" placeholder={'title '} {...register('body')} />
        <input type="text" placeholder={'title '} {...register('tags')} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default CreateArticlePage;