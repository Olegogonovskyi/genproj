import React, {FC} from 'react';
import {useForm} from 'react-hook-form';
import { IArticleReqModel } from '../models/IArticleReqModel';
import { tagsHelper } from '../helpers/tagsHelper';
import { articlesApiService } from '../services/articles.api.service';


const CreateArticlePage: FC = () => {
  const {handleSubmit, register, reset } = useForm<IArticleReqModel>()
  const searchText = async (article: IArticleReqModel) => {
    try {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('description', article.description);
      formData.append('body', article.body);

      // Теги: обробляємо через tagsHelper
      const newTags = article.tags ? tagsHelper(article.tags) : [];
      newTags.forEach((tag) => formData.append('tags', tag));

      const files = article.articleImage as unknown as FileList;
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          formData.append('articleImage', file);
        });
      }

      await articlesApiService.createArticle(formData);
      reset()
            } catch (error: any) {
      console.log(`error when post article ${error?.response?.data?.message || error.message}`);
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