import React, {FC} from 'react';
import { useForm } from 'react-hook-form';
import { getFileApiService } from '../../services/gedFile.api.service';
import { IUploadGedModel } from '../../models/IUploadGedModel';
import style from './UploadGedComponent.module.css'

const UploadGedComponent: FC = () => {
  const {handleSubmit, register } = useForm<IUploadGedModel>()

const  uploadGed = async ({ uploadField }: IUploadGedModel) => {
  const gedFile = uploadField;
  if (!gedFile) return;
try {
         await getFileApiService.uploadGedFile(gedFile)
        } catch (error: any) {
  console.error('load file failed:', error?.response?.data || error);
  throw error
        }
}
  return (
    <div className={style.mainWrap}>
      <form onSubmit={handleSubmit(uploadGed)}>
        <input type="file" placeholder={'gedFile'} {...register('uploadField')} />
        <button>Upload</button>
      </form>
        <button onClick={async () => {
            await getFileApiService.deleteAll()
        }}>
            Видалити базу
        </button>
    </div>
  );
};

export default UploadGedComponent;