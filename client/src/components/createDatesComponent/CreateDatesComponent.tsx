import React, {FC} from 'react';
import { useForm } from 'react-hook-form';

import { IDatesToPostType } from '../../models/types/IDatesToPostType';
import { ChronologyApiService } from '../../services/chronology.api.service';


const CreateDatesComponent: FC = () => {
  const {handleSubmit, register, reset } = useForm<IDatesToPostType>()
  const createDate = async ({ datesArray }: IDatesToPostType) => {
    try {
      await Promise.all(
        datesArray.map((dateToCreate) =>
          ChronologyApiService.createDates(dateToCreate)
        )
      );
      reset();
            } catch (error: any) {
      console.log(`error when post article ${error?.response?.data?.message || error.message}`);
            }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(createDate)}>
        <input type="text" placeholder={'arrayDatesToPost '} {...register('datesArray')} style={{ width: '300px', height: '30px' }} />
      </form>
    </div>
  );
};

export default CreateDatesComponent;