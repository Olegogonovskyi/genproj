import React, {FC, useEffect} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import style from './CreateArticleComponent.module.css';
import { IArticleReqModel } from '../../models/IArticleReqModel';
import { tagsHelper } from '../../helpers/tagsHelper';
import { articlesApiService } from '../../services/articles.api.service';

const CreateArticleComponent: FC<{ articleToUpdateId?: string }> = ({ articleToUpdateId }) => {
  const { control, handleSubmit, register, reset, watch } = useForm<IArticleReqModel>({
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      articleImage: undefined,
      body: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'body',
  });

  useEffect(() => {
    if (!articleToUpdateId) return;

    const fetchData = async () => {
      try {
        const { title, description, body } = await articlesApiService.getArticleById(articleToUpdateId);
        reset({ title, description, body, tags: '', articleImage: undefined });
      } catch (err) {
        console.error('Failed to load Article:', err);
      }
    };

    fetchData();
  }, [articleToUpdateId, reset]);

  const onSubmit = async (article: IArticleReqModel) => {
    try {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('description', article.description);
      formData.append('body', JSON.stringify(article.body));

      const newTags = article.tags ? tagsHelper(article.tags) : [];
      newTags.forEach((tag) => formData.append('tags', tag));

      if (article.articleImage && article.articleImage.length > 0) {
        Array.from(article.articleImage).forEach((file) => {
          formData.append('articleImage', file);
        });
      }

      if (articleToUpdateId) {
        await articlesApiService.updateById(articleToUpdateId, formData);
      } else {
        await articlesApiService.createArticle(formData);
      }

      reset(); // очищення форми після сабміту
    } catch (error: any) {
      console.error(`Error: ${error?.response?.data?.message || error.message}`);
    }
  };

  const bodyWatch = watch('body');

  return (
      <form className={style.articleForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Назва статті*</label>
          <input type="text" {...register('title')} />
        </div>

        <div>
          <label>Опис*</label>
          <input type="text" {...register('description')} />
        </div>

        <div>
          <label>Теги</label>
          <input type="text" {...register('tags')} />
        </div>

        <div>
          <label>Головне зображення</label>
          <input type="file" {...register('articleImage')} multiple />
        </div>

        <div>
          <label>Контент статті</label>
          {fields.map((field, index) => (
              <div className={style.articleBlock} key={field.id}>
                <select {...register(`body.${index}.type` as const)} defaultValue={field.type}>
                  <option value="TEXT">Text</option>
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video</option>
                  <option value="AUDIO">Audio</option>
                  <option value="QUOTE">QUOTE</option>
                </select>

                <button type="button" onClick={() => remove(index)}>Remove</button>

                {['TEXT', 'QUOTE'].includes(bodyWatch?.[index]?.type || '') && (
                    <>
                      <textarea {...register(`body.${index}.content` as const)} />
                      <input type="text" {...register(`body.${index}.alt` as const)} placeholder="Alt (optional)" />
                    </>
                )}

                {['IMAGE', 'VIDEO', 'AUDIO'].includes(bodyWatch?.[index]?.type || '') && (
                    <>
                      <input type="text" {...register(`body.${index}.content` as const)} placeholder="URL" />
                      <input type="text" {...register(`body.${index}.alt` as const)} placeholder="Alt (optional)" />
                    </>
                )}
              </div>
          ))}

          <div className={style.articleButtons}>
            <button type="button" onClick={() => append({ type: 'TEXT', content: '' })}>Add Text</button>
            <button type="button" onClick={() => append({ type: 'IMAGE', content: '', alt: '' })}>Add Image</button>
            <button type="button" onClick={() => append({ type: 'VIDEO', content: '', alt: '' })}>Add Video</button>
            <button type="button" onClick={() => append({ type: 'AUDIO', content: '', alt: '' })}>Add Audio</button>
            <button type="button" onClick={() => append({ type: 'QUOTE', content: '', alt: '' })}>Add Quote</button>
          </div>
        </div>

        <button type="submit">{articleToUpdateId ? 'Оновити' : 'Створити'}</button>
      </form>
  );
};

export default CreateArticleComponent;


