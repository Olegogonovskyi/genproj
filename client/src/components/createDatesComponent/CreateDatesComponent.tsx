import React, {FC} from 'react';
import { useForm } from 'react-hook-form';

import { IDatesToPostType } from '../../models/types/IDatesToPostType';
import { ChronologyApiService } from '../../services/chronology.api.service';
import { IDateCreateModel } from '../../models/iDateCreateModel';


const CreateDatesComponent: FC = () => {
  const {handleSubmit, register, reset } = useForm<IDatesToPostType>()
  const createDate = async ({ datesArray }: any) => {
    // const datesString = [{
    //   "year": 1806, "description": "Наполеон І Бонапарт оголосив Великій Британії Континентальну блокаду."
    // },
    //   { "year": 1811, "description": "Почала виходити польськомовна Gazeta Lwowska." },
    //   { "year": 1815, "description": "Наполеон повертається на «Сто днів». Битва при Ватерлоо: остаточна поразка Наполеона." }]
    try {
      const datesToPost: IDateCreateModel[] = JSON.parse(datesArray);
      console.log(datesArray)
      await ChronologyApiService.createDates(datesToPost);
      reset();
            } catch (error: any) {
      console.log(`error when post article ${error?.response?.data?.message || error.message}`);
            }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(createDate)}>
        <textarea  placeholder={'arrayDatesToPost '} {...register('datesArray')} style={{ width: '300px', height: '300px' }} />
        <button type="submit" > add </button>
      </form>
    </div>
  );
};

export default CreateDatesComponent;