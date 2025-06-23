import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IArticleUpdateModel } from '../../models/iArticleUpdateModel';
import { articlesApiService } from '../../services/articles.api.service';
import { tagsHelper } from '../../helpers/tagsHelper';

const UpdateArticleComponent: FC<{articleToUpdateId: string}> = ({articleToUpdateId}) => {
  const {handleSubmit, register, reset } = useForm<IArticleUpdateModel>()
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const {title, description } = await articlesApiService.getArticleById(articleToUpdateId);
        reset({
          title,
          description,
          }); // повинно б форму заповнити, перевірити
      } catch (err) {
        console.error('Failed to load Article:', err);
      }
    };

    fetchDate();
  }, [articleToUpdateId, reset]);

  const updateArticleData = async (updatedArticle: IArticleUpdateModel)=> {
    try {
      const formArticleData = new FormData();
      updatedArticle.title && formArticleData.append('title', updatedArticle.title);
      updatedArticle.description && formArticleData.append('description', updatedArticle.description);
      updatedArticle.body && formArticleData.append('body', updatedArticle.body);

      const newTags = updatedArticle.tags ? tagsHelper(updatedArticle.tags) : [];
      newTags.forEach((tag) => formArticleData.append('tags', tag));
      await articlesApiService.updateById(articleToUpdateId, formArticleData)
      reset()
            } catch (error: any) {
      console.error('update article failed:', error?.response?.data || error);
      throw error
            }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(updateArticleData)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="text" placeholder={'title '} {...register('title')} style={{ width: '300px', height: '30px' }} />
        <input type="text" placeholder={'description '} {...register('description')} style={{ width: '300px', height: '30px' }} />
        <input type="text" placeholder={'body '} {...register('body')} style={{ width: '300px', height: '100px' }} />
        <input type="text" placeholder={'tags '} {...register('tags')} style={{ width: '300px', height: '30px' }} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateArticleComponent;