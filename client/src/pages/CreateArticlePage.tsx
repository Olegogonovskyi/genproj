import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import { IArticleReqModel } from '../models/IArticleReqModel';
import { tagsHelper } from '../helpers/tagsHelper';
import { articlesApiService } from '../services/articles.api.service';


const CreateArticlePage: FC = () => {
  const {handleSubmit, register } = useForm<IArticleReqModel>()
  const searchText = async (article: IArticleReqModel) => {
    try {
      if (article.tags) {
        article.tagsToPost = tagsHelper(article.tags)
        console.log(article)
      }
      await articlesApiService.createArticle(article)
            } catch (error) {
                console.log(`error when post article ${error}`)
            }
    };

  return (
    <div>
      <form onSubmit={handleSubmit(searchText)}>
        <input type="text" placeholder={'title '} {...register('title')} style={{ width: '300px', height: '30px' }} />
        <input type="text" placeholder={'description '} {...register('description')} style={{ width: '300px', height: '30px' }} />
        <input type="text" placeholder={'body '} {...register('body')} style={{ width: '300px', height: '100px' }} />
        <input type="text" placeholder={'tags '} {...register('tags')} style={{ width: '300px', height: '30px' }} />
        <input type="file" placeholder={'file '} {...register('articleImage')} style={{ width: '300px', height: '30px' }} />
        <button>Post</button>
      </form>
    </div>
  );
};

export default CreateArticlePage;