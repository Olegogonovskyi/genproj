import React, {FC} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import style from './CreateArticleComponent.module.css';
import { IArticleReqModel } from '../../models/IArticleReqModel';
import { tagsHelper } from '../../helpers/tagsHelper';
import { articlesApiService } from '../../services/articles.api.service';

const CreateArticleComponent: FC = () => {
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

  const createArticleHandler = async (article: IArticleReqModel) => {
    try {
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('description', article.description);

      const body = JSON.stringify(article.body);
      formData.append('body', body);

      const newTags = article.tags ? tagsHelper(article.tags) : [];
      newTags.forEach((tag) => formData.append('tags', tag));

      const files = article.articleImage;
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          formData.append('articleImage', file);
        });
      }

      await articlesApiService.createArticle(formData);
      reset();
    } catch (error: any) {
      console.error(`error when post article ${error?.response?.data?.message || error.message}`);
    }
  };

  const bodyWatch = watch('body');

  return (
    <div>
      <form className={style.articleForm} onSubmit={handleSubmit(createArticleHandler)}>
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
            <div className={style.articleBlock} key={field.id} style={{ marginBottom: '16px', border: '1px solid #ccc', padding: '8px' }}>
              <select {...register(`body.${index}.type` as const)} defaultValue={field.type}>
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="AUDIO">Audio</option>
                <option value="QUOTE">QUOTE</option>
              </select>

              <button className={style.removeButton} type="button" onClick={() => remove(index)}>Remove</button>

              {['TEXT', 'QUOTE' ].includes(bodyWatch?.[index]?.type || '') && (
                <>
                  <textarea
                      rows={5}
                      placeholder="Введіть абзац тексту (HTML підтримується)"
                      {...register(`body.${index}.content` as const)}
                  />
                  <input
                      type="text"
                      placeholder="Alt (optional)"
                      {...register(`body.${index}.alt` as const)}
                  />
                </>
              )}

              {['IMAGE', 'VIDEO', 'AUDIO'].includes(bodyWatch?.[index]?.type || '') && (
                <>
                  <input
                    type="text"
                    placeholder="URL"
                    {...register(`body.${index}.content` as const)}
                  />
                  <input
                    type="text"
                    placeholder="Alt (optional)"
                    {...register(`body.${index}.alt` as const)}
                  />
                </>
              )}
            </div>
          ))}

          <div className={style.articleButtons}>
            <button type="button" onClick={() => append({ type: 'TEXT', content: '' })}>Add Text Block</button>
            <button type="button" onClick={() => append({ type: 'IMAGE', content: '', alt: '' })}>Add Image Block</button>
            <button type="button" onClick={() => append({ type: 'VIDEO', content: '', alt: '' })}>Add Video Block</button>
            <button type="button" onClick={() => append({ type: 'AUDIO', content: '', alt: '' })}>Add Audio Block</button>
            <button type="button" onClick={() => append({ type: 'QUOTE', content: '', alt: '' })}>Add QUOTE Block</button>
          </div>
        </div>

        <button className={style.submit} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateArticleComponent;
